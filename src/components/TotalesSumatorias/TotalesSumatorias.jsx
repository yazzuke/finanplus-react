import React, { useState, useEffect } from "react";

function TotalesSumatorias({ userId, currentDate  }) {
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);

  useEffect(() => {
    const obtenerTotales = async () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // getMonth() es 0-indexado, agregar 1 para obtener el mes actual.

      try {
        // Ingresos
        const respuestaIngresos = await fetch(`http://localhost:8080/usuarios/${userId}/ingresos/fecha?year=${year}&month=${month}`);
        const datosIngresos = await respuestaIngresos.json();
        const totalIngresos = Array.isArray(datosIngresos) ? datosIngresos.reduce((suma, ingreso) => suma + parseFloat(ingreso.monto), 0) : 0;
        setTotalIngresos(totalIngresos);

        // Gastos CC
        const respuestaGastosCC = await fetch(
          `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/tarjetascredito/fecha?year=${year}&month=${month}`
        );
        const datosGastosCC = await respuestaGastosCC.json();
        const totalGastosCC = Array.isArray(datosGastosCC) ? datosGastosCC.reduce((suma, gasto) => suma + parseFloat(gasto.valorTotal), 0) : 0;

        // Gastos Fijos
        const respuestaGastosFijos = await fetch(
          `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/gastosfijos/fecha?year=${year}&month=${month}`
        );
        const datosGastosFijos = await respuestaGastosFijos.json();
        const totalGastosFijos = Array.isArray(datosGastosFijos) ? datosGastosFijos.reduce((suma, gasto) => suma + parseFloat(gasto.valorTotal), 0) : 0;


        // Gastos Diarios
        const respuestaGastosDiarios = await fetch(
          `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/gastosdiario/fecha?year=${year}&month=${month}`
        );
        const datosGastosDiarios = await respuestaGastosDiarios.json();
        const totalGastosDiarios = Array.isArray(datosGastosDiarios) ? datosGastosDiarios.reduce((suma, gasto) => suma + parseFloat(gasto.valorTotal), 0) : 0;

        //Gastos Variables
        const respuestaGastosVariables = await fetch(
          `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/gastosvariables/fecha?year=${year}&month=${month}`
        );
        const datosGastosVariables = await respuestaGastosVariables.json();
        const totalGastosVariables = Array.isArray(datosGastosVariables) ? datosGastosVariables.reduce((suma, gasto) => suma + parseFloat(gasto.valorTotal), 0) : 0;

        setTotalGastos(totalGastosCC + totalGastosFijos + totalGastosDiarios + totalGastosVariables);
      } catch (error) {
        console.error('Error al obtener totales:', error);
      }
    };

    if (userId && currentDate) {
      obtenerTotales();
    }
  }, [userId, currentDate]);

  useEffect(() => {
    const fetchResumenMensual = async () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      try {
        const response = await fetch(
          `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/resumenmensual/fecha?year=${year}&month=${month}`
        );
        const data = await response.json();
        if (data.length > 0) {
          setResumenMensual(data[0]);
          setTotalIngresos(data[0].totalIngresos);
          setTotalGastos(data[0].totalGastos);
        } else {
          console.log(
            "No se encontraron resúmenes mensuales para los parámetros dados."
          );
        }
      } catch (error) {
        console.error("Error al obtener el resumen mensual:", error);
      }
    };

    if (userId && currentDate) {
      fetchResumenMensual();
    }
  }, [userId, currentDate]);

console.log("Resumen mensual:", resumenMensual);

  useEffect(() => {
    // Actualización del total de gastos en el backend
    const actualizarTotalGastos = async () => {
      if (
        resumenMensual &&
        resumenMensual.resumenID &&
        totalGastos !== resumenMensual.totalGastos
      ) {
        try {
          const response = await fetch(
            `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/resumenmensual/${resumenMensual.resumenID}/updateGastos`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ totalGastos }),
            }
          );
          const updatedData = await response.json();
          console.log("Actualización exitosa de totalGastos:", updatedData);
        } catch (error) {
          console.error("Error al actualizar total de gastos:", error);
        }
      }
    };

    if (totalGastos !== 0) {
      // Esta condición podría ajustarse según lo que necesites
      actualizarTotalGastos();
    }
  }, [totalGastos, resumenMensual]);

  return (
    <div className="flex items-center mr-[340px]">
      <span className="text-2xl font-bold mr-4">Total de Tus Ingresos</span>
      <div className="w-[160px] flex justify-between items-center bg-[#302d2d] rounded-full p-1 shadow-md mt-1">
        <span className="text-white"></span>
        <span className="text-whitew">${totalIngresos.toLocaleString()}</span>
      </div>
      <span className="text-2xl font-bold mr-4 ml-4 ">Total de Tus Gastos</span>
      <div className="w-[160px] flex justify-between items-center bg-[#302d2d] rounded-full p-1 shadow-md mt-1">
        <span className="text-white"></span>
        <span className="text-white">${totalGastos.toLocaleString()}</span>
      </div>
      <span className="text-2xl font-bold mr-4 ml-4 ">Ingresos - Gastos </span>
      <div className="w-[160px] flex justify-between items-center bg-[#302d2d] rounded-full p-1 shadow-md mt-1">
        <span className="text-white"></span>
        <span className="text-white items-center">${(totalIngresos - totalGastos).toLocaleString()}</span>
      </div>  
    </div>
  );
}

export default TotalesSumatorias;
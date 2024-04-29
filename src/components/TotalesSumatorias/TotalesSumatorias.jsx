import React, { useState, useEffect } from "react";

function TotalesSumatorias({ userId, currentDate }) {
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [resumenMensual, setResumenMensual] = useState(0);

  useEffect(() => {
    const obtenerTotales = async () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // getMonth() es 0-indexado, agregar 1 para obtener el mes actual.
      try {
    
        // Gastos CC
        const respuestaGastosCC = await fetch(
          `http://localhost:8080/usuarios/${userId}/tarjetascredito/fecha?year=${year}&month=${month}`
        );
        const datosGastosCC = await respuestaGastosCC.json();
        const totalGastosCC = Array.isArray(datosGastosCC)
          ? datosGastosCC.reduce(
              (suma, gasto) => suma + parseFloat(gasto.valorTotal),
              0
            )
          : 0;

        // Gastos Fijos
        const respuestaGastosFijos = await fetch(
          `http://localhost:8080/usuarios/${userId}/gastosfijos/fecha?year=${year}&month=${month}`
        );
        const datosGastosFijos = await respuestaGastosFijos.json();
        const totalGastosFijos = Array.isArray(datosGastosFijos)
          ? datosGastosFijos.reduce(
              (suma, gasto) => suma + parseFloat(gasto.valorTotal),
              0
            )
          : 0;

        // Gastos Diarios
        const respuestaGastosDiarios = await fetch(
          `http://localhost:8080/usuarios/${userId}/gastosdiario/fecha?year=${year}&month=${month}`
        );
        const datosGastosDiarios = await respuestaGastosDiarios.json();
        const totalGastosDiarios = Array.isArray(datosGastosDiarios)
          ? datosGastosDiarios.reduce(
              (suma, gasto) => suma + parseFloat(gasto.valorTotal),
              0
            )
          : 0;

        //Gastos Variables
        const respuestaGastosVariables = await fetch(
          `http://localhost:8080/usuarios/${userId}/gastosvariables/fecha?year=${year}&month=${month}`
        );
        const datosGastosVariables = await respuestaGastosVariables.json();
        const totalGastosVariables = Array.isArray(datosGastosVariables)
          ? datosGastosVariables.reduce(
              (suma, gasto) => suma + parseFloat(gasto.valorTotal),
              0
            )
          : 0;

        setTotalGastos(
          totalGastosCC +
            totalGastosFijos +
            totalGastosDiarios +
            totalGastosVariables
        );
      } catch (error) {
        console.error("Error al obtener totales:", error);
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
          `http://localhost:8080/usuarios/${userId}/resumenmensual/fecha?year=${year}&month=${month}`
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

  
 
//console.log("Resumen mensual:", resumenMensual);

  useEffect(() => {
    // Actualización del total de gastos en el backend
    const actualizarTotalGastos = async () => {
      if (resumenMensual && resumenMensual.resumenID && totalGastos !== resumenMensual.totalGastos) {
        try {
          const response = await fetch(`http://localhost:8080/usuarios/${userId}/resumenmensual/${resumenMensual.resumenID}/updateGastos`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ totalGastos })
          });
          const updatedData = await response.json();
          console.log("Actualización exitosa de totalGastos:", updatedData);
        } catch (error) {
          console.error("Error al actualizar total de gastos:", error);
        }
      }
    };

    if (totalGastos !== 0) { // Esta condición podría ajustarse según lo que necesites
      actualizarTotalGastos();
    }
  }, [totalGastos, resumenMensual]);

 

  return (
    <div className="flex items-center mr-[340px]">
      <span className="text-2xl font-bold mr-4">Total de Tus Ingresos</span>
      <div className="w-[160px] flex justify-center items-center bg-gradient-to-r from-green-900 to-green-900 rounded-full p-1 shadow-md mt-1 transition duration-300 ease-in-out hover:from-green-800 hover:to-green-800">
        <span className="text-white"> ${totalIngresos.toLocaleString()}</span>
      </div>
      <span className="text-2xl font-bold mr-4 ml-4 ">Total de Tus Gastos</span>
      <div className="w-[160px] flex justify-center items-center bg-gradient-to-r from-red-900 to-red-900 rounded-full p-1 shadow-md mt-1 transition duration-300 ease-in-out hover:from-red-800 hover:to-red-800">
        <span className="text-white">${totalGastos.toLocaleString()}</span>
      </div>
      <span className="text-2xl font-bold mr-4 ml-4 ">Ingresos - Gastos </span>
      <div className="w-[160px] flex justify-center items-center bg-gradient-to-r from-teal-900 to-teal-900 rounded-full p-1 shadow-md mt-1 transition duration-300 ease-in-out hover:from-teal-950 hover:to-teal-950">
        <span className="text-white items-center ">
          ${(totalIngresos - totalGastos).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default TotalesSumatorias;

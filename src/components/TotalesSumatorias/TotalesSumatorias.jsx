import React, { useState, useEffect } from "react";

function TotalesSumatorias({ userId }) {
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);

  useEffect(() => {
    const obtenerTotales = async () => {
      try {
        const respuestaIngresos = await fetch(`http://localhost:8080/usuarios/${userId}/ingresos`);
        const datosIngresos = await respuestaIngresos.json();
        const totalIngresos = Array.isArray(datosIngresos) ? datosIngresos.reduce((suma, ingreso) => suma + parseFloat(ingreso.monto), 0) : 0;
        setTotalIngresos(totalIngresos);

        const respuestaGastosCC = await fetch(`http://localhost:8080/usuarios/${userId}/tarjetascredito`);
        const datosGastosCC = await respuestaGastosCC.json();
        const totalGastosCC = Array.isArray(datosGastosCC) ? datosGastosCC.reduce((suma, gasto) => suma + parseFloat(gasto.valorTotal), 0) : 0;

        const respuestaGastosFijos = await fetch(`http://localhost:8080/usuarios/${userId}/gastosfijos`);
        const datosGastosFijos = await respuestaGastosFijos.json();
        const totalGastosFijos = Array.isArray(datosGastosFijos) ? datosGastosFijos.reduce((suma, gasto) => suma + parseFloat(gasto.valorTotal), 0) : 0;

        setTotalGastos(totalGastosCC + totalGastosFijos);
      } catch (error) {
        console.error('Error al obtener totales:', error);
      }
    };

    if (userId) {
      obtenerTotales();
    }
  }, [userId]);

  return (
    <div className="flex items-center ml-[500px]">
      <span className="text-2xl font-bold mr-4">Total de Tus Ingresos</span>
      <div className="w-[160px] flex justify-between items-center bg-[#302d2d] rounded-full p-1 shadow-md mt-1">
        <span className="text-white"></span>
        <span className="text-whitew">${totalIngresos.toLocaleString()}</span>
      </div>
      <span className="text-2xl font-bold mr-4 ml-4 ">Total de Tus Gastos</span>
      <div className="w-[160px] flex justify-between items-center bg-[#302d2d] rounded-full p-1 shadow-md mt-1">
        <span className="text-white"></span>
        <span className="text-white items-center">${totalGastos.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default TotalesSumatorias;
  import React, { useState, useEffect } from "react";

  function TotalesSumatorias({ userId, totalGastos  }) {
    const [ingresos, setIngresos] = useState([]);

    useEffect(() => {
      const obtenerIngresos = async () => {
        try {
          const respuesta = await fetch(`http://localhost:8080/usuarios/${userId}/ingresos`);
          const datosIngresos = await respuesta.json();
          if (Array.isArray(datosIngresos)) { // Asegurarse de que la respuesta sea un arreglo
            setIngresos(datosIngresos);
          } else {
            console.error('La respuesta no es un arreglo:', datosIngresos);
          }
        } catch (error) {
          console.error('Error al obtener ingresos:', error);
        }
      };

      if (userId) {
        obtenerIngresos();
      }
    }, [userId]);

    const totalIngresos = Array.isArray(ingresos) ? ingresos.reduce((suma, ingreso) => suma + parseFloat(ingreso.monto), 0) : 0;

    return (
      <div className="flex items-center ml-[500px]">
        <span className="text-2xl font-bold mr-4">Total de Tus Ingresos</span>
        <div className="w-[160px] flex justify-between items-center bg-[#302d2d] rounded-full p-1 shadow-md mt-1">
          <span className="text-white"></span>
          <span className="text-white">${totalIngresos.toLocaleString()}</span>
        </div>
        <span className="text-2xl font-bold mr-4 ml-4 ">Total de Tus Gastos</span>
        <div className="w-[160px] flex justify-between items-center bg-[#302d2d] rounded-full p-1 shadow-md mt-1">
          <span className="text-white"></span>
          <span className="text-white">${totalGastos.toLocaleString()}</span>
        </div>
      </div>
    );
  }

  export default TotalesSumatorias;

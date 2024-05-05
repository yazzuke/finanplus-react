import React, { useState, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PerfectScrollbar from "perfect-scrollbar";
import { Button } from "@nextui-org/react";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { Modal } from "@nextui-org/react";

function Sumatorias({ userId, currentDate, resumenMensual }) {
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [monthWithMostExpenses, setMonthWithMostExpenses] = useState(null);
  const [monthWithLeastExpenses, setMonthWithLeastExpenses] = useState(null);

  useEffect(() => {
    if (resumenMensual) {
      const ingresosSum = resumenMensual.reduce(
        (acc, item) => acc + item.totalIngresos,
        0
      );
      const gastosSum = resumenMensual.reduce(
        (acc, item) => acc + item.totalGastos,
        0
      );

      setTotalIngresos(ingresosSum);
      setTotalGastos(gastosSum);

      const maxGastosMonth = resumenMensual.reduce((maxMonth, currentMonth) => {
        if (!maxMonth || currentMonth.totalGastos > maxMonth.totalGastos) {
          return currentMonth;
        }
        return maxMonth;
      }, null);

      const minGastosMonth = resumenMensual.reduce((minMonth, currentMonth) => {
        if (!minMonth || currentMonth.totalGastos < minMonth.totalGastos) {
          return currentMonth;
        }
        return minMonth;
      }, null);

      setMonthWithMostExpenses(maxGastosMonth);
      setMonthWithLeastExpenses(minGastosMonth);
    }
  }, [resumenMensual]);

  console.log(resumenMensual);

  const handleDownload = async () => {
    try {
      const response = await fetch(`http://localhost:8080/usuarios/${userId}/generarPDF`, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resumen.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
    }
  };


  return (
    <div className="flex mr-1 ">
      <div className="w-[250px]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl font-bold ml-3">Sumatorias</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="text-2xl font-bold  whitespace-nowrap">
            Total de Ingresos
          </span>
          <div className="flex justify-center items-center bg-[#302d2d] rounded-full p-1 shadow-md ml-4">
            <span className="max-h-[300px] w-[150px] text-center text-white">
              ${totalIngresos.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center mt-5">
          <span className="text-2xl font-bold  whitespace-nowrap">
            Total de Gastos
          </span>
          <div className="flex justify-center items-center bg-[#302d2d] rounded-full p-1 shadow-md ml-4">
            <span className="max-h-[300px] w-[150px] text-center  text-white">
              ${totalGastos.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center mt-5 mr-2">
          <span className="text-2xl font-bold  whitespace-nowrap">
            Mes con mas gastos
          </span>
          <div className="flex justify-center items-center bg-[#302d2d] rounded-full p-1 shadow-md ml-4">
            <span className="text-white">$</span>
          </div>
        </div>
        <div className="flex flex-row items-center mt-5 mr-2">
          <span className="text-2xl font-bold  whitespace-nowrap">
            Mes con mas Menos
          </span>
          <div className="flex justify-center items-center bg-[#302d2d] rounded-full p-1 shadow-md ml-4">
            <span className="text-white">$</span>
          </div>
        </div>
        <div className="grid grid-cols-1   mt-5 ml-16">
  <span className="text-2xl font-bold whitespace-nowrap">
    Descarga un Reporte
  </span>
  <div className="flex rounded-full p-1 shadow-md ml-20">
    <Button color="success" onClick={handleDownload}>Descargar</Button>
  </div>
</div>
      </div>
    </div>
  );
}

export default Sumatorias;

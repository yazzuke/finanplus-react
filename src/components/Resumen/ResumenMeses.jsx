import React from "react";
import { useTheme } from "next-themes";
import TooltipResumen from "./TooltipResumen";

const ResumenMeses = ({
  mes,
  resumen,
  marginStyle,
  centerStyle,
  gastosFijos,
  gastosVariables,
  gastosDiarios,
  tarjetasCredito,
}) => {
  const { theme } = useTheme();
  return (
    <div className={`flex flex-col ml-10 mt-4 ${marginStyle} ${centerStyle}`}>
      <div className="flex items-center">
        <span className="text-2xl font-bold ml-32">{mes}</span>
      </div>
      <div className="flex w-full justify-start">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">Ingresos</span>
          <div
            className={`bg-${theme === "light" ? "white" : "black"} text-${
              theme === "light" ? "black" : "white"
            } w-[160px] flex justify-center items-center bg-[#302d2d] rounded-full p-1 shadow-md`}
            style={{
              backgroundColor: theme === "light" ? "#EFEFEF" : "#302d2d",
            }}
          >
            <span
              className={`text-${
                theme === "light" ? "" : ""
              } "text-xl font-bold`}
            >
              ${resumen ? resumen.totalIngresos.toLocaleString() : 0}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start ml-2">
          <span className="text-2xl font-bold ml-9">Gastos</span>
          <div
            className={`bg-${theme === "light" ? "white" : "black"} text-${
              theme === "light" ? "black" : "white"
            } w-[160px] flex justify-center items-center bg-[#302d2d] rounded-full p-1 shadow-md`}
            style={{
              backgroundColor: theme === "light" ? "#EFEFEF" : "#302d2d",
            }}
          >
            <TooltipResumen
              gastosFijos={gastosFijos}
              gastosVariables={gastosVariables}
              gastosDiarios={gastosDiarios}
              tarjetasCredito={tarjetasCredito}
            >
              <span
              className={`text-${
                theme === "light" ? "" : ""
              } "text-xl font-bold`}
            >
                ${resumen ? resumen.totalGastos.toLocaleString() : 0}
              </span>
            </TooltipResumen>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenMeses;

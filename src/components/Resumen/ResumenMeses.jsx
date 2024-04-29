import React from "react";
import TooltipResumen from "./TooltipResumen";

const ResumenMeses = ({ mes, resumen, marginStyle, centerStyle, gastosFijos, gastosVariables, gastosDiarios, tarjetasCredito }) => {
  return (
    <div className={`flex flex-col ml-10 mt-4 ${marginStyle} ${centerStyle}`}>
      <div className="flex items-center">
        <span className="text-2xl font-bold ml-32">{mes}</span>
      </div>
      <div className="flex w-full justify-start">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">Ingresos</span>
          <div className="w-[160px] flex justify-center items-center bg-[#302d2d] rounded-full p-1 shadow-md">
            <span className="text-white">
              ${resumen ? resumen.totalIngresos.toLocaleString() : 0} 
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start ml-2">
          <span className="text-2xl font-bold ml-9">Gastos</span>
          <div className="w-[160px] flex justify-center items-center bg-[#302d2d] rounded-full p-1 shadow-md ">
              <TooltipResumen
                gastosFijos={gastosFijos}
                gastosVariables={gastosVariables}
                gastosDiarios={gastosDiarios}
                tarjetasCredito={tarjetasCredito}
              >
                <span className="text-white">
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

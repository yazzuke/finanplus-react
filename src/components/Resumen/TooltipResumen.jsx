import React from "react";
import { Tooltip } from "@nextui-org/react";

const TooltipResumen = ({ children, gastosFijos, gastosVariables, gastosDiarios, tarjetasCredito, mes }) => {
  const gastosFijosMes = gastosFijos.filter(gasto => gasto.mes === mes);
  const gastosVariablesMes = gastosVariables.filter(gasto => gasto.mes === mes);
  const gastosDiariosMes = gastosDiarios.filter(gasto => gasto.mes === mes);
  const tarjetasCreditoMes = tarjetasCredito.filter(gasto => gasto.mes === mes);



  return (
    <Tooltip
      content={
        <div className="px-1 py-2">
          <div className="text-small font-bold">Total De Gastos</div>
          <div className="text-tiny">
            <div className="text-small font-bold">Gastos Fijos</div>
              <ul>
                {gastosFijos.map((gasto, index) => (
                  <li key={index}>
                    <ul>
                      {gasto.gastos.map((g, idx) => (
                        <li key={idx}>{g.nombreGasto}: ${g.valorGasto}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

            <div className="text-small font-bold">Gastos Variables</div>
            <ul>
              {gastosVariables.map((gasto, index) => (
                <li key={index}>
              
                  <ul>
                    {gasto.gastos.map((g, idx) => (
                      <li key={idx}>{g.nombreGasto}: ${g.valorGasto}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <div className="text-small font-bold">Gastos Diarios</div>
            <ul>
              {gastosDiarios.map((gasto, index) => (
                <li key={index}>
                  <ul>
                    {gasto.gastos.map((g, idx) => (
                      <li key={idx}>{g.nombreGasto}: ${g.valorGasto}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <div className="text-small font-bold">Tarjetas de Crédito</div>
            <p>Tarjetas de Crédito: ${tarjetasCredito.map(gasto => gasto.valorTotal).reduce((acc, val) => acc + val, 0)}</p>
            <ul>
              {tarjetasCredito.map((gasto, index) => (
                <li key={index}>
                  {gasto.nombreGasto}: ${gasto.gastos.reduce((acc, g) => acc + g.valorGasto, 0)}
                  <ul>
                    {gasto.gastos.map((g, idx) => (
                      <li key={idx}>{g.nombreGasto}: ${g.valorGasto}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
      delay={0}
      closeDelay={0}
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            },
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            },
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default TooltipResumen;

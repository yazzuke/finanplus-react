import React from "react";
import {Tooltip} from "@nextui-org/react";


const TooltipModificarIngreso =  ({ children }) =>{
  return (
    <Tooltip 
    content={
        <div className="px-1 py-2">
          <div className="text-small font-bold">Modifica o Elimina un Ingreso</div>
          <div className="text-tiny">Haciendo Click puedes Elegir <br></br>un Ingreso para editarlo o borrarlo</div>
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
            }
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            }
          },
        },
      }}
    >
          {children}
    </Tooltip>
  );
}
export default TooltipModificarIngreso;
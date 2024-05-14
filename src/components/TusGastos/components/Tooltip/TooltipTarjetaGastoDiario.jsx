import React from "react";
import {Tooltip} from "@nextui-org/react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTheme } from "next-themes";

const TooltipGastoDiario = () =>{
  const { theme } = useTheme();

  return (
    <Tooltip 
    content={
      <div     className={`bg-${theme === "light" ? "white" : "black"} text-${
        theme === "light" ? "black" : "white"
      } px-1 py-2`}
      style={{ backgroundColor: theme === "light" ? "" : "#18181b" }}>
          <div className="text-small font-bold">Gastos Diarios</div>
          <div className="text-tiny">Si necesitas apuntar un control de que gastas en tu dia a dia<br></br> Esta card es ideal para eso.</div>
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
      <InfoOutlinedIcon className="ml-2 cursor-pointer" fontSize="small" />
    </Tooltip>
  );
}
export default TooltipGastoDiario;
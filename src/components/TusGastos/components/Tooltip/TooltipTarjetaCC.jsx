import React from "react";
import {Tooltip} from "@nextui-org/react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const TooltipCC = () =>{
  return (
    <Tooltip 
    content={
        <div className="px-1 py-2">
          <div className="text-small font-bold">Custom Content</div>
          <div className="text-tiny">This is a custom tooltip content</div>
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
export default TooltipCC;
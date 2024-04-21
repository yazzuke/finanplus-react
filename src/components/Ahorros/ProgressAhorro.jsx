import React from "react";
import { Progress } from "@nextui-org/react";

const ProgressAhorro = ({ actual, meta }) => {
  const progressValue = (actual / meta) * 100;

  return (
    <Progress
      aria-label="Progresso del Ahorro"
      size="md"
      value={progressValue}
      color="success"
      showValueLabel={true}
      className="max-w-md"
    />
  );
};

export default ProgressAhorro;

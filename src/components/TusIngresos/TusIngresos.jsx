import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

function TusIngresos() {
  const [ingresos, setIngresos] = useState([
    { concepto: 'Salario', monto: 1200000 },
    { concepto: 'Nequi', monto: 100000 },
    // Más ingresos pueden ser añadidos aquí
  ]);

  const handleAddIngreso = () => {
    // Esta función puede desencadenar un modal o un form para añadir un nuevo ingreso
    const nuevoIngreso = { concepto: 'Freelance', monto: 500000 };
    setIngresos(ingresos => [...ingresos, nuevoIngreso]);
  };

  return (
    <div className="flex justify-end  mt-[-2rem]" > 
    <div className="w-[500px] h-[350px] p-4 bg rounded-lg shadow">
      <div className="flex justify-between items-center ">
        <span className="text-lg font-semibold">Tus Ingresos</span>
        <IconButton onClick={handleAddIngreso} color="primary" aria-label="add">
          <AddIcon />
        </IconButton>
      </div>
      {ingresos.map((ingreso, index) => (
        <div key={index} className="flex justify-between py-1">
          <span>{ingreso.concepto}</span>
          <span>${ingreso.monto.toLocaleString()}</span>
        </div>
      ))}
    </div>
    </div>
  );
}

export default TusIngresos;

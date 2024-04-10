import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function DropdownIngresos({ userId }) {
  const [selectedIngreso, setSelectedIngreso] = useState(null);
  const [ingresos, setIngresos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      fetch(`http://localhost:8080/usuarios/${userId}/ingresos`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setIngresos(data);
          console.log(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error al obtener ingresos:', error);
          setIsLoading(false);
        });
    }
  }, [userId]);

  const handleSelectionChange = (key) => {
    setSelectedIngreso(key);
  };

return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="faded" className="capitalize w-[150px] h-[22px]">
          {isLoading
            ? "Cargando..."
            : selectedIngreso
            ? ingresos.find((i) => i.ingresoID === selectedIngreso)?.concepto
            : "Concepto"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Seleccione un ingreso"
        selectedKeys={selectedIngreso}
        onSelectionChange={handleSelectionChange}
        isLoading={isLoading}
        emptyContent={" No hay ingresos disponibles"}
      >
        {ingresos.map(({ concepto, IngresoID }, index) => {
          return (
            <DropdownItem
              key={index}
              textValue={concepto}
              selected={IngresoID === selectedIngreso}
            >
              {concepto}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}

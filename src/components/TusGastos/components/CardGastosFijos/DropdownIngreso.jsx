import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function DropdownIngresos({ userId }) {
  const [selectedIngreso, setSelectedIngreso] = useState('Opción');
  const [ingresos, setIngresos] = useState([]);

  useEffect(() => {
    

    if (userId) {
     
      fetch(`http://localhost:8080/usuarios/${userId}/ingresos`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Datos recibidos de la API:', data);
          setIngresos(data); // Establece los ingresos con los datos obtenidos
        })
        .catch(error => {
          console.error('Error al obtener ingresos:', error);
        });
    }
  }, [userId]);

  const handleSelectionChange = (key) => {
    console.log('Ingreso seleccionado:', key);
    setSelectedIngreso(key);
  };

  // Esta línea buscará el ingreso seleccionado cada vez que `ingresos` o `selectedIngreso` cambie.
  const selectedValue = selectedIngreso !== 'Opción'
  ? ingresos.find(ing => ing.IngresoID === Number(selectedIngreso))?.Concepto
  : selectedIngreso;
  console.log('Valor seleccionado actualmente:', selectedValue);




  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="faded" className="capitalize w-[150px] h-[22px]">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        aria-label="Seleccione un tipo de ingreso"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedIngreso}
        onSelectionChange={handleSelectionChange}
      >
      {ingresos.filter(ing => ing.IngresoID != null).map((ingreso) => (
  <DropdownItem key="{ingreso.IngresoID.toString()}" value={ingreso.IngresoID.toString()}>
    {ingreso.Concepto}
  </DropdownItem>
))}

      </DropdownMenu>
    </Dropdown>
  );
}




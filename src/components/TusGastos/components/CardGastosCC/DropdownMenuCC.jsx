import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';

function DropdownMenuCC({ userId }) {
  const [ingresos, setIngresos] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/usuarios/${userId}/ingresos`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
         // console.log('Ingresos received:', data);
          if (Array.isArray(data)) {
            setIngresos(data);
          } else {
            console.error('Data is not an array:', data);
          }
        })
        .catch((error) => {
          console.error('Error al obtener ingresos:', error);
        });
    }
  }, [userId]);

  const handleSelectionChange = (keys) => {
    const newSelectedKey = keys.values().next().value;
    setSelectedKey(newSelectedKey);
  };

  const selectedValue =
    selectedKey !== null
      ? ingresos.find((ingreso) => ingreso.IngresoID.toString() === selectedKey)?.Concepto
      : ' un ingreso';

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize h-[25px]">
          {selectedValue || 'Cargando...'}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Ingresos"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKey ? new Set([selectedKey]) : new Set()}
        onSelectionChange={handleSelectionChange}
      >
        {ingresos.length > 0 ? (
          ingresos.map((ingreso) =>
            ingreso.IngresoID != null ? (
              <DropdownItem key={ingreso.IngresoID.toString()} value={ingreso.IngresoID.toString()}>
                {ingreso.Concepto}
              </DropdownItem>
            ) : null
          )
        ) : (
          <DropdownItem key="empty" disabled>
            No hay ingresos disponibles
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropdownMenuCC;

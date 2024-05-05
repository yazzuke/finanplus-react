import React, { useState, useEffect } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

function DropdownTipo({ tipo, onTypeChange, gastoID}) {
  const [selectedKeys, setSelectedKeys] = useState(new Set([tipo]));
// Actualiza el estado local cuando cambia la prop tipo.


useEffect(() => {
setSelectedKeys(new Set([tipo]));
}, [tipo]);  

// Levanta el estado cuando se selecciona un nuevo tipo.
const handleSelectionChange = (keys) => {
  const newType = Array.from(keys)[0];
  setSelectedKeys(keys);
  if (onTypeChange) {
    onTypeChange(gastoID, newType); // Envía el ID del gasto y el nuevo tipo al componente padre.
  }
};


  
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize w-[150px] h-[22px]">
        {Array.from(selectedKeys).join(", ").replaceAll("_", " ")}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        aria-label="Seleccione un tipo de ingreso"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        <DropdownItem  key="Necesidad">Necesidad</DropdownItem>
        <DropdownItem key="Deseos">Deseos</DropdownItem>
        <DropdownItem key="Metas">Metas</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}


export default DropdownTipo;
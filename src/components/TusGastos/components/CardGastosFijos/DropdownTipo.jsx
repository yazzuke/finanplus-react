import React, { useState, useEffect } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function App() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Opción"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );


  
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
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="Necesidad">Necesidad</DropdownItem>
        <DropdownItem key="Deseos">Deseos</DropdownItem>
        <DropdownItem key="Metas">Metas</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

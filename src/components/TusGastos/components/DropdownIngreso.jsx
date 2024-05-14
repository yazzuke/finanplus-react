import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useTheme } from 'next-themes';


export default function DropdownIngresos({ userId }) {
  const [selectedIngreso, setSelectedIngreso] = useState(new Set());
  const [ingresos, setIngresos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      fetch(`https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/ingresos`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setIngresos(data);
         // console.log(data);
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

  const selectedConcepto = selectedIngreso.size > 0
    ? ingresos.find((i) => i.ingresoID === Array.from(selectedIngreso)[0])?.concepto
    : "Concepto";


return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" className="capitalize w-[150px] h-[22px]">
        {isLoading ? "Cargando..." : selectedConcepto}
        </Button>
      </DropdownTrigger>
      
      <DropdownMenu
        aria-label="Seleccione un ingreso"
        selectedKeys={selectedIngreso}
        onSelectionChange={(keys) => handleSelectionChange(Array.from(keys)[0])}
        isLoading={isLoading} 
        emptyContent={" No hay ingresos disponibles"}
      >
        {ingresos.map((ingreso) => {
          return (
            <DropdownItem
              key={ingreso.ingresoID} // Usa ingresoID para la key
              selected={selectedIngreso.has(ingreso.ingresoID)}
              className={theme === "light" ? "text-black" : "text-white"}
            >
              {ingreso.concepto}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
     
    </Dropdown>
  );
}

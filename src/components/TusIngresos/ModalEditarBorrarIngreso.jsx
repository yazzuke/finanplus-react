import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  Input,
  SelectItem,
} from "@nextui-org/react";
import { useTheme } from "next-themes";


function ModalEditarBorrarIngreso({ isOpen, onClose, userId, currentDate, ingreso }) {
  const { theme } = useTheme();
    // Estados para gestionar los valores de los campos del formulario
    const [concepto, setConcepto] = useState('');
    const [monto, setMonto] = useState('');
  
    // Actualizar el estado local del modal cuando se pasa un nuevo 'ingreso'
    useEffect(() => {
      if (ingreso) {
        setConcepto(ingreso.concepto);
        setMonto(ingreso.monto);
      }
    }, [ingreso]);
  
  // Función para actualizar el ingreso
  const handleUpdateIngreso = () => {
    const url = `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/ingresos/${ingreso.ingresoID}`;
    const updatedIngreso = { concepto, monto };

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedIngreso),
    })
    .then((response) => {
      if (!response.ok) throw new Error('Error al actualizar ingreso');
      return response.json();
    })
    .then(() => {
      onClose(); // Cerrar el modal
      window.location.reload(); 
      // Aquí deberías recargar o actualizar la lista de ingresos
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  // Función para borrar el ingreso
  const handleDeleteIngreso = () => {
    const url = `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/ingresos/${ingreso.ingresoID}`;

    fetch(url, {
      method: 'DELETE'
    })
    .then((response) => {
      if (!response.ok) throw new Error('Error al eliminar ingreso');
      onClose(); // Cerrar el modal
      window.location.reload(); 
      // Aquí deberías recargar o actualizar la lista de ingresos
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

console.log(ingreso);

  return (
    <>  
      <Modal
        onClose={onClose}
                className={`bg-${theme === "light" ? "white" : "black"} text-${
          theme === "light" ? "black" : "white"
        }`}
        style={{ backgroundColor: theme === "light" ? "" : "#18181b" }}
        width="600px"
        backdrop="opaque"
        isOpen={isOpen}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar o Borra Tu Ingreso
              </ModalHeader>
              <ModalBody>
              <Input
          autoFocus
          type="text"
          label="Nombre del Ingreso"
          name="concepto"
          variant="bordered"
          value={concepto}
          onChange={(e) => setConcepto(e.target.value)}
        />
        <Input
          type="number"
          label="Cantidad de tu Ingreso"
          name="monto"
          variant="bordered"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
              
              
              </ModalBody>
              <ModalFooter>
                <div className="flex-1">
                  <Button className="justify-" onClick={handleDeleteIngreso}  auto>
                    Borrar Ingreso
                  </Button>
                </div>
                <Button onClick={handleUpdateIngreso} auto>
                  Editar Ingreso
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export default ModalEditarBorrarIngreso;

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

function ModalCambiarInformacion({
    userId,
    isOpen,
    onClose,
    nombreUsuario // Prop para recibir el nombre del usuario
  }) {
    const [nuevoNombre, setNuevoNombre] = useState(""); // Estado para el nuevo nombre

    console.log("UserID Desde ModalInfo " + userId)
  
    const handleChangeNombre = (e) => {
      setNuevoNombre(e.target.value);
    };
  
    const handleSubmit = () => {
      // Aquí puedes enviar el nuevo nombre a tu backend para actualizarlo en la base de datos
      // Puedes utilizar fetch u otra librería para hacer la solicitud HTTP
      // Por ejemplo, utilizando fetch:
      fetch(`http://localhost:8080/usuarios/${userId}/nombre`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: nuevoNombre
        })
      }).then(response => {
        // Aquí puedes manejar la respuesta de tu API
      }).catch(error => {
        // Aquí puedes manejar errores de la solicitud
      });
  
      // Cierra el modal después de enviar la solicitud
      onClose();
    };
  
    return (
      <>
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onClose={onClose}
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
                  Cambiar nombre de usuario
                </ModalHeader>
                <ModalBody>
                  <p>Nombre actual: {nombreUsuario}</p>
                  <Input
                    autoFocus
                    type="text"
                    label="Nuevo nombre"
                    name="nuevoNombre"
                    variant="bordered"
                    value={nuevoNombre}
                    onChange={handleChangeNombre}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button onClick={handleSubmit}>Guardar</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  
  export default ModalCambiarInformacion;
  
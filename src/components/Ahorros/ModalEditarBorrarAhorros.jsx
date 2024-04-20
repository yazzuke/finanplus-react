import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem } from "@nextui-org/react";

function ModalEditarBorrarAhorros({ isOpen, onClose, userId }) {
  const [ahorros, setAhorros] = useState([]);
  const [selectedAhorro, setSelectedAhorro] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar ahorros al abrir el modal
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetch(`http://localhost:8080/usuarios/${userId}/ahorros`)
        .then((response) => response.json())
        .then((data) => {
          setAhorros(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener los ahorros:", error);
          setIsLoading(false);
        });
    }
  }, [isOpen, userId]);

  console.log("Ahorros:", ahorros);

  const handleSelectAhorro = (value) => {
    setSelectedAhorro(value);
  };

  const handleSubmit = () => {
    // Aquí agregarías la lógica para editar o borrar el ahorro seleccionado
    console.log("Ahorro seleccionado para operación:", selectedAhorro);
    onClose(); // Cerrar el modal después de la operación
  };

  return (
    <Modal open={isOpen} onClose={onClose} width="600px"  key={userId}>
      <ModalContent>
        <ModalHeader>Edita o Borra un Ahorro</ModalHeader>
        <ModalBody>
  <Select
    fullWidth
    clearable
    disabled={isLoading}
    placeholder="Seleccione un ahorro"
    value={selectedAhorro?.id}  
    onChange={(e) => handleSelectAhorro(e.target.value)}
  >
  console.log("Mapeando ahorros para SelectItems, ahorros:", ahorros);
{ahorros.map((ahorro, index) => {
  console.log("Ahorro:", ahorro);
  return (
    <SelectItem key={ahorro.ahorroID} value={ahorro.ahorroID}>
      {ahorro.concepto}
    </SelectItem>
  );
})}
  </Select>
</ModalBody>
        <ModalFooter>
          <Button auto flat color="error" onClick={() => console.log("Borrar ahorro")}>
            Borrar
          </Button>
          <Button auto onClick={handleSubmit}>
            Editar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalEditarBorrarAhorros;

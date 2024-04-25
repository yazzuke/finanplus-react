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

function ModalEditarBorrarAhorros({ isOpen, onClose, userId, currentDate }) {
  const [ahorros, setAhorros] = useState([]);
  const [ahorroSeleccionado, setAhorroSeleccionado] = useState();

  // endpoint para mostrar por meses
  useEffect(() => {
    if (userId && currentDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // getMonth() es 0-indexado
      fetch(
        `http://localhost:8080/usuarios/${userId}/ahorros/fecha?year=${year}&month=${month}`
      )
        .then((response) => response.json())
        .then((data) => {
          setAhorros(data); // Actualiza el estado con los nuevos datos
        })
        .catch((error) =>
          console.error("Error al obtener los ahorros:", error)
        );
    }
  }, [userId, currentDate]);

  useEffect(() => {
    if (ahorros.length > 0 && !ahorroSeleccionado) {
      setAhorroSeleccionado;
    }
  }, [ahorros, ahorroSeleccionado]);

  const handleSelectChange = (ahorroID) => {
    const ahorro = ahorros.find(
      (ahorro) => ahorro.ahorroID === Number(ahorroID)
    );
    setAhorroSeleccionado(ahorro);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAhorroSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const tipos = [
    { value: "", label: "Seleccionar Tipo" },
    { value: "Necesidad", label: "Necesidad" },
    { value: "Deseos", label: "Deseos" },
    { value: "Metas", label: "Metas" },
  ];

  const handleTipoChange = (value) => {
    setAhorroSeleccionado((prev) => ({
      ...prev,
      tipo: value,
    }));
  };

  const handleDeleteAhorro = () => {
    if (ahorroSeleccionado && ahorroSeleccionado.ahorroID) {
      fetch(
        `http://localhost:8080/usuarios/${userId}/ahorros/${ahorroSeleccionado.ahorroID}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar el ahorro");
          }
          // Filtrar el ahorro eliminado del estado local para actualizar la UI inmediatamente
          setAhorros((prevAhorros) =>
            prevAhorros.filter(
              (ahorro) => ahorro.ahorroID !== ahorroSeleccionado.ahorroID
            )
          );                                      
          // Limpiar el ahorro seleccionado después de eliminar
          setAhorroSeleccionado(undefined);
          onClose(); // Cerrar el modal
        })
        .catch((error) => {
          console.error("Error al eliminar el ahorro:", error);
        });
    }
  };

  // Función para enviar los datos del formulario al servidor y actualizar el ahorro
  const handleEditAhorro = () => {
    if (ahorroSeleccionado && ahorroSeleccionado.ahorroID) {
      const url = `http://localhost:8080/usuarios/${userId}/ahorros/${ahorroSeleccionado.ahorroID}`;
      const ahorroToUpdate = {
        concepto: ahorroSeleccionado.concepto,
        meta: ahorroSeleccionado.meta,
        actual: ahorroSeleccionado.actual,
        tipo: ahorroSeleccionado.tipo
      };

      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ahorroToUpdate),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al actualizar el ahorro");
          }
          return response.json();
        })
        .then((updatedAhorro) => {
          // Aquí podrías actualizar tu estado local si es necesario
          console.log("Ahorro actualizado:", updatedAhorro);
          onClose(); // Cerrar el modal después de actualizar
        })
        .catch((error) => {
          console.error("Error al actualizar el ahorro:", error);
        });
    }
  };

  console.log(ahorroSeleccionado);

  return (
    <>
      <Modal
        onClose={onClose}
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
                Editar o Borra Un Ahorro
              </ModalHeader>
              <ModalBody>
                <Select
                  label="Selecciona un Ahorro "
                  placeholder="Elige uno de tus ahorros"
                  value={ahorroSeleccionado ? ahorroSeleccionado.ahorroID : ""}
                  onChange={(e) => handleSelectChange(e.target.value)}
                >
                  {ahorros.map((ahorro) => (
                    <SelectItem key={ahorro.ahorroID} value={ahorro.concepto}>
                      {ahorro.concepto}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  autoFocus
                  type="text"
                  label="Nombre del Ahorro"
                  name="concepto"
                  variant="bordered"
                  value={ahorroSeleccionado?.concepto || ""}
                  onChange={handleInputChange}
                />
                <Input
                  type="number"
                  label="Meta de tu Ahorro"
                  name="meta"
                  variant="bordered"
                  value={ahorroSeleccionado ? ahorroSeleccionado.meta : ""}
                  onChange={handleInputChange}
                />
                <Input
                  type="number"
                  label="Valor Actual de tu Ahorro"
                  name="actual"
                  variant="bordered"
                  value={ahorroSeleccionado ? ahorroSeleccionado.actual : ""}
                  onChange={handleInputChange}
                />
                <Select
                  label="Seleccionar Tipo"
                  variant="bordered"
                  placeholder="Seleccionar Tipo"
                  value={ahorroSeleccionado ? ahorroSeleccionado.tipo : ""}
                  onChange={(e) => handleTipoChange(e.target.value)}
                >
                  {tipos.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <div className="flex-1">
                <Button
                  className="justify-"
                  auto
                  onClick={handleDeleteAhorro}
                >
                  Borrar Ahorro
                </Button>
                </div>
                <Button
                  className="flex items-center"
                  auto
                  onPress={handleEditAhorro}
                >
                  Editar Ahorro
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export default ModalEditarBorrarAhorros;

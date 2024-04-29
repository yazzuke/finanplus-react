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

  function ModalEditarBorrarGastos({
    isOpen,
    onClose,
    userId,
    currentDate,
    gastoDiarioId,
  }) {
    const [gastos, setGastos] = useState([]);
    const [gastoSeleccionado, setGastoSeleccionado] = useState();

    console.log(userId, currentDate, gastoDiarioId);

    useEffect(() => {
      if (isOpen && userId && gastoDiarioId) {
        const fetchUrl = `http://localhost:8080/usuarios/${userId}/gastosdiario/${gastoDiarioId}/gastos`;
        fetch(fetchUrl)
          .then((response) => response.json())
          .then((data) => {
            setGastos(data); // Actualiza el estado con los nuevos datos
          })
          .catch((error) =>
            console.error("Error al obtener los ahorros:", error)
          );
      }
    }, [userId, gastoDiarioId, isOpen]);

    console.log(gastos, gastoSeleccionado);

    useEffect(() => {
      if (gastos.length > 0 && !gastoSeleccionado) {
        setGastoSeleccionado;
      }
    }, [gastos, gastoSeleccionado]);

    const handleSelectChange = (gastoID) => {
      const gasto = gastos.find((gasto) => gasto.gastoID === Number(gastoID));
      setGastoSeleccionado(gasto);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setGastoSeleccionado((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleDeleteGasto = () => {
      if (gastoSeleccionado && gastoSeleccionado.gastoID) {
        const url = `http://localhost:8080/usuarios/${userId}/gastosdiario/${gastoDiarioId}/gastos/${gastoSeleccionado.gastoID}`;
        fetch(url, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al eliminar el gasto");
            }
            // Actualiza el estado para reflejar la eliminación en la interfaz
            setGastos(
              gastos.filter(
                (gasto) => gasto.gastoID !== gastoSeleccionado.gastoID
              )
            );
            setGastoSeleccionado(undefined); // Limpiar selección
            onClose(); // Opcionalmente cerrar el modal
            window.location.reload(); 
          })
          .catch((error) => console.error("Error al eliminar el gasto:", error));
      }
    };

    const handleEditGasto = () => {
      if (gastoSeleccionado && gastoSeleccionado.gastoID) {
        const url = `http://localhost:8080/usuarios/${userId}/gastosdiario/${gastoDiarioId}/gastos/${gastoSeleccionado.gastoID}`;
        const updatedGasto = {
          nombreGasto: gastoSeleccionado.nombreGasto,
          valorGasto: gastoSeleccionado.valorGasto,
          fecha: gastoSeleccionado.fecha,
        };

        fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedGasto),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al actualizar el gasto");
            }
            return response.json();
          })
          .then((updatedGasto) => {
            // Aquí puedes actualizar el estado local para reflejar los cambios
            const updatedGastos = gastos.map((gasto) =>
              gasto.gastoID === updatedGasto.gastoID ? updatedGasto : gasto
            );
            setGastos(updatedGastos);
            onClose(); // Cerrar el modal después de actualizar
            window.location.reload(); 
          })
          .catch((error) =>
            console.error("Error al actualizar el gasto:", error)
          );
      }
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
            backdrop: "bg-[#0e294b]/50 backdrop-opacity-40",
            base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#faefef] ",
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
                  <Select
                    clearable
                    label="Selecciona un Gasto"
                    placeholder="Elige un gasto"
                    value={
                      gastoSeleccionado
                        ? gastoSeleccionado.gastoID.toString()
                        : ""
                    }
                    onChange={(e) => handleSelectChange(e.target.value)}
                  >
                    {gastos.map((gasto) => (
                      <SelectItem
                        key={gasto.gastoID}
                        value={gasto.gastoID.toString()}
                        textValue={gasto.nombreGasto}
                      >
                        {gasto.nombreGasto}{" "}
                        {/* Este es el texto que se debería mostrar */}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input
                    autoFocus
                    type="text"
                    label="Nombre del Gasto"
                    name="nombreGasto"
                    variant="bordered"
                    value={gastoSeleccionado?.nombreGasto || ""}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="date"
                    name="fecha"
                    label="Fecha del Gasto"
                    variant="bordered"
                    value={gastoSeleccionado ? gastoSeleccionado.fecha : ""}
                    onChange={handleInputChange}
                  />
                  <Input
                    autoFocus
                    type="number"
                    label="Valor del Gasto"
                    variant="bordered"
                    name="valorGasto"
                    value={gastoSeleccionado ? gastoSeleccionado.valorGasto : ""}
                    onChange={handleInputChange}
                  />
                </ModalBody>
                <ModalFooter>
                  <div className="flex-1">
                    <Button className="justify-" onClick={handleDeleteGasto} auto>
                      Borrar Gasto
                    </Button>
                  </div>
                  <Button auto onClick={handleEditGasto}>
                    Editar Gasto
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  export default ModalEditarBorrarGastos;

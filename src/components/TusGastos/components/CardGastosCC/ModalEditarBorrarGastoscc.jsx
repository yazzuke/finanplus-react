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

  function ModalEditarBorrarGastoscc({
    isOpen,
    onClose,
    userId,
    currentDate,
    tarjetaCreditoID,
  }) {
    const [gastos, setGastos] = useState([]);
    const [gastoSeleccionado, setGastoSeleccionado] = useState();
    const { theme } = useTheme();

    console.log(userId, currentDate, tarjetaCreditoID);

    useEffect(() => {
      if (isOpen && userId && tarjetaCreditoID) {
        const fetchUrl = `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/tarjetascredito/${tarjetaCreditoID}/gastos`;
        fetch(fetchUrl)
          .then((response) => response.json())
          .then((data) => {
            setGastos(data); // Actualiza el estado con los nuevos datos
          })
          .catch((error) =>
            console.error("Error al obtener los ahorros:", error)
          );
      }
    }, [userId, tarjetaCreditoID, isOpen]);

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
        const url = `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/tarjetascredito/${tarjetaCreditoID}/gastos/${gastoSeleccionado.gastoID}`;
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
          })
          .catch((error) => console.error("Error al eliminar el gasto:", error));
      }
    };

    const handleEditGasto = () => {
      if (gastoSeleccionado && gastoSeleccionado.gastoID) {
        const url = `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/tarjetascredito/${tarjetaCreditoID}/gastos/${gastoSeleccionado.gastoID}`;
        const updatedGasto = {
          nombreGasto: gastoSeleccionado.nombreGasto,
          cuotaTotal: parseInt(gastoSeleccionado.cuotaTotal),
          valorTotalGasto: parseFloat(gastoSeleccionado.valorTotalGasto),
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
          className={`bg-${theme === "light" ? "white" : "black"} text-${
            theme === "light" ? "black" : "white"
          }`}
          style={{ backgroundColor: theme === "light" ? "" : "#18181b" }}
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
                        className={theme === "light" ? "text-black" : "text-white"}
                      >
                        {gasto.nombreGasto}{" "}
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
                    type="number"
                    name="cuotaTotal"
                    value={gastoSeleccionado?.cuotaTotal || ""}
                    onChange={handleInputChange}
                    label="Cuotas del gasto"
                    variant="bordered"
                  />
                  <Input
                    type="number"
                    name="valorTotalGasto"
                    value={gastoSeleccionado?.valorTotalGasto || ""}
                    onChange={handleInputChange}
                    label="Valor Total del Gasto"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <div className="flex-1">
                    <Button className="justify-" onClick={handleDeleteGasto} auto>
                      Borrar Gasto
                    </Button>
                  </div>
                  <Button auto onClick={handleEditGasto}>Editar Gasto</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  export default ModalEditarBorrarGastoscc;

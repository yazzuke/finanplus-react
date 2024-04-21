import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Select,
  SelectItem,
} from "@nextui-org/react";

// este modal sirve para abrir el form y enviar los gastos indivuales a segun el gasto que se halla elegido
function ModalAgregarGastos({
  isOpen,
  onClose,
  newTransaction,
  handleInputChange,
  handleSubmit,
}) {
  const tipos = [
    { value: "", label: "Seleccionar Tipo" },
    { value: "Necesidad", label: "Necesidad" },
    { value: "Deseos", label: "Deseos" },
    { value: "Metas", label: "Metas" },
  ];

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onClose}
        open={isOpen}
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
                Ingresa un gasto
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  type="text"
                  label="Nombre del Gasto"
                  name="nombreGasto"
                  variant="bordered"
                  value={newTransaction.nombreGasto}
                  onChange={handleInputChange}
                />
                <Input
                  type="date"
                  name="fecha"
                  label="Fecha del Gasto"
                  variant="bordered"
                  value={newTransaction.fecha}
                  onChange={handleInputChange}
                />
                <Input
                  autoFocus
                  type="number"
                  label="Valor del Gasto"
                  variant="bordered"
                  name="valorGasto"
                  value={newTransaction.valorGasto}
                  onChange={handleInputChange}
                />
                <Select
                  autoFocus
                  label="Seleccionar Tipo"
                  placeholder="Seleccionar Tipo"
                  variant="bordered"
                  name="tipo"
                  value={newTransaction.tipo}
                  onChange={handleInputChange}
                >
                  {tipos.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button
                  auto
                  onPress={() => {
                    handleSubmit();
                    onClose();
                  }}
                >
                  Agregar Gasto
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export default ModalAgregarGastos;

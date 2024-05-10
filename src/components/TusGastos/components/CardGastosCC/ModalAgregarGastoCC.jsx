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
import { useTheme } from "next-themes";

function ModalNuevoGasto({
  userId,
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

  const { theme } = useTheme();
  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        className={`bg-${theme === "light" ? "white" : "black"} text-${
          theme === "light" ? "black" : "white"
        }`}
        style={{ backgroundColor: theme === "light" ? "" : "#18181b" }}
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
                Agrega una Tarjeta para tus Gastos
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  type="text"
                  label="Nombre del Gasto"
                  name="name"
                  value={newTransaction.name}
                  onChange={handleInputChange}
                  variant="bordered"
                />
                <Input
                  type="number"
                  name="installments"
                  value={newTransaction.installments}
                  onChange={handleInputChange}
                  label="Cuotas del gasto"
                  variant="bordered"
                />
                <Input
                  type="number"
                  label="Valor Total"
                  variant="bordered"
                  name="totalValue"
                  value={newTransaction.totalValue}
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
                    <SelectItem key={tipo.value} value={tipo.value}             className={theme === "light" ? "text-black" : "text-white"}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleSubmit}>Agregar Gasto</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalNuevoGasto;

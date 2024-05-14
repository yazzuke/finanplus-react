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
import { useTheme } from "next-themes";

function ModalAgregarAhorro({
  isOpen,
  onClose,
  newTransaction,
  handleInputChange,
  handleSubmit,
}) {
  const { theme } = useTheme();
  const tipos = [
    { value: "", label: "Seleccionar Tipo" },
    { value: "Necesidad", label: "Necesidad" },
    { value: "Deseos", label: "Deseos" },
    { value: "Metas", label: "Metas" },
  ];

  return (
    <>
      <Modal
        open={isOpen}
        className={`bg-${theme === "light" ? "white" : "black"} text-${
          theme === "light" ? "black" : "white"
        }`}
        style={{ backgroundColor: theme === "light" ? "" : "#18181b" }}
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
                Ingresa un Ahorro
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  type="text"
                  label="Nombre del Ahorro"
                  name="concepto"
                  variant="bordered"
                  value={newTransaction.concepto}
                  onChange={handleInputChange}
                />
                <Input
                  autoFocus
                  type="number"
                  label="Meta del Ahorro"
                  variant="bordered"
                  name="meta"
                  value={newTransaction.meta}
                  onChange={handleInputChange}
                />
                <Input
                  autoFocus
                  type="number"
                  label="Valor Actual del Ahorro"
                  variant="bordered"
                  name="actual"
                  value={newTransaction.actual}
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
                <Button
                  variant="solid"
                  radius="md"
                  className=" text-white font-bold "
                  onClick={handleSubmit}
                >
                  Agregar Ahorro
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export default ModalAgregarAhorro;

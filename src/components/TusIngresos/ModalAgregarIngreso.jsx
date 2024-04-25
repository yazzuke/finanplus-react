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

function ModalAgregarIngreso({
  isOpen,
  onClose,
  nuevoIngreso,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <>
      <Modal
        open={isOpen}
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
                  label="Concepto"
                  name="concepto"
                  variant="bordered"
                  value={nuevoIngreso.concepto}
                  onChange={handleInputChange}
                />
                <Input
                  clearable
                  type="number"
                  label="Monto"
                  name="monto"
                  value={nuevoIngreso.monto}
                  onChange={handleInputChange}
                />
              </ModalBody>
              <ModalFooter>
              <Button 
              variant="solid"
              radius="md"
                  className=" text-white font-bold "
                  onClick={handleSubmit}
                >
                  Agregar Ingreso
                  </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export default ModalAgregarIngreso;

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

function ModalNuevoGasto({ isOpen, onClose, newTransaction, handleInputChange, handleSubmit }) {
 


  return (
    <>
   
   <Modal open={isOpen} onClose={onClose} width="600px"
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
              <ModalHeader className="flex flex-col gap-1">Ingresa un gasto</ModalHeader>
              <ModalBody>
               
                




              </ModalBody>
              <ModalFooter>
              <Button className="flex items-center" auto onPress={() => { handleSubmit(); onClose(); }}>Agregar Gasto</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export default ModalNuevoGasto;
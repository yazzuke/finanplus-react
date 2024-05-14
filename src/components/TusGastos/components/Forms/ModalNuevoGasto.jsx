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
} from "@nextui-org/react";

import { useTheme } from "next-themes";
import TooltipCC from "../Tooltip/TooltipTarjetaCC.jsx";
import TooltipGastoFijo from "../Tooltip/TooltipTarjetaGastoFijo.jsx";
import TooltipGastoVariable from "../Tooltip/TooltipTarjetaGastoVariable.jsx";
import TooltipGastoDiario from "../Tooltip/TooltipTarjetaGastoDiario.jsx";

function ModalNuevoGasto({
  userId,
  setShowForm,
  setNuevaTarjeta,
  isOpen,
  onClose,
}) {
  const { theme } = useTheme();
  const [selectedValue, setSelectedValue] = useState("");
  const [tipoTarjeta, setTipoTarjeta] = useState("");
  const [formData, setFormData] = useState({
    nombreTarjeta: "",
    fechaPago: "",
    nombreGastoFijo: "",
    // ... cualquier otro estado que necesites para los formularios
  });

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    let url;
    let data;
  
    switch (selectedValue) {
      case "gastosCC":
        url = `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/tarjetascredito`;
        data = {
          nombreTarjeta: formData.nombreTarjeta,
          fechaPago: formData.fechaPago,
        };
        break;
      case "gastosFijos":
        url = `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/gastosfijos`;
        data = {
          nombreGasto: formData.nombreGastoFijo,
        };
        break;
      case "gastosDiarios":
        url = `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/gastosdiario`;
        data = {
          nombreGasto: "Gasto diario predeterminado",
          valorGasto: 0,
          fecha: new Date().toISOString().slice(0, 10),
        };
        break;
      case "gastosVariables":
        url = `https://finanplus-423300.nn.r.appspot.com/usuarios/${userId}/gastosvariables`;
        data = {
          nombreGasto: "Gasto variable predeterminado",
          valorGasto: 0,
          fecha: new Date().toISOString().slice(0, 10),
        };
        break;
      default:
        console.error("Tipo de gasto no reconocido");
        return;
    }
  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((nuevoGasto) => {
        console.log("Gasto agregado con éxito:", nuevoGasto);
        // Llamar a onGastoAdded pasando el nuevo gasto y el tipo
        props.onGastoAdded(nuevoGasto, selectedValue);
  
        // Resetear el formulario
        setFormData({
          nombreTarjeta: "",
          fechaPago: "",
          nombreGastoFijo: "",
        });
  
        // Cerrar el modal
        props.onClose();
      
      })
      .catch((error) => {
        console.error("Error al crear el gasto:", error);
      });
  };
  

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
              Agregar un nuevo Tipo de Gasto
              </ModalHeader>
              <ModalBody>
                
                <RadioGroup
                  label="Selecciona una opcion"
                  value={selectedValue}
                  onChange={handleRadioChange}
                  orientation="vertical"
                > 
                  <div className="flex items-center">
                    <Radio value="gastosCC">Tarjeta de Crédito</Radio>
                    <TooltipCC />
                  </div>
                  <div className="flex items-center">
                    <Radio value="gastosFijos">Gastos Fijos</Radio>
                    <TooltipGastoFijo />
                  </div>
                  <div className="gastosDiarios">
                    <Radio value="gastosVariables">Gastos Variables</Radio>
                    <TooltipGastoVariable />
                  </div>
                  <div className="flex items-center">
                    <Radio value="gastosDiarios">Gastos Diario</Radio>
                    <TooltipGastoDiario />
                  </div>
                  
                </RadioGroup>
                
                {selectedValue === "gastosCC" && (
                  <>
                    <Input
                      autoFocus
                      type="text"
                      label="Nombre de la tarjeta"
                      name="nombreTarjeta"
                      value={formData.nombreTarjeta}
                      onChange={handleChange}
                      variant="bordered"
                    />
                    <Input
                      type="date"
                      name="fechaPago"
                      label="Fecha de pago de la tarjeta"
                      value={formData.fechaPago}
                      onChange={handleChange}
                      variant="bordered"
                    />
                  </>
                )}
                {selectedValue === "gastosFijos" && (
                  <>
                    <Input
                      autoFocus
                      type="text"
                      label="Nombre de la tarjeta"
                      placeholder="Puedes poner un nombre a cada gasto"
                      name="nombreGastoFijo"
                      value={formData.nombreGastoFijo}
                      onChange={handleChange}
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                
                  onPress={() => {
                    handleSubmit();
                    onClose();
                  }}
                >
                  Crear
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalNuevoGasto;

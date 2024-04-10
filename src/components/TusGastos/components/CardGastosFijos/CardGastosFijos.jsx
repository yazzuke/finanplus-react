import React, { useState } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import DropdownTipo from "./DropdownTipo.jsx";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DropdownIngreso from "./DropdownIngreso.jsx";
import FormGastosFijos from "./FormGastosFijos.jsx";

function CardGastosFijos({ userId }) {
  const [transactions, setTransactions] = useState([
    // ... tus transacciones existentes
  ]);

  const [isFormVisible, setFormVisible] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    installments: "",
    installmentValue: "",
    totalValue: "",
    interest: "",
    paid: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTransactions([
      ...transactions,
      { ...newTransaction, id: transactions.length + 1 },
    ]);
    setFormVisible(false);
    setNewTransaction({
      name: "",
      installments: "",
      installmentValue: "",
      totalValue: "",
      interest: "",
      paid: "",
    });
  };

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  return (
   
    <Card className="dark max-w-[720px] h-[320px] mt-2 ">
      
      <CardHeader className="flex justify-between items-center">
        {/* Contenedor para el título y la fecha de pago */}
        <div className="flex flex-col">
          <div>
            <span className="text-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
              Gastos Fijos
            </span>
          </div>
          <span className="text-sm font-bold mr-24 ">Valor Total:</span>
        </div>

        <div className="flex items-center">
          <div className="flex items-center mt-7"></div>

          {/* Contenedor actual para los iconos */}
          <div>
            <IconButton color="primary" aria-label="edit" className="ml-2">
              <EditIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="add"
              className="ml-2"
              onClick={toggleFormVisibility}
            >
              <AddIcon />
            </IconButton>

            {/* Formulario para añadir un nuevo gasto */}
            
            {isFormVisible && (
              <FormGastosFijos
                newTransaction={newTransaction}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </CardHeader>

      <Divider className="mt-[-0.5rem]" />
      <CardBody>
        <div className="grid grid-cols-6 gap-9">
          <span
            className="text-base font-medium col-span-1 text-left"
            style={{ transform: "translateY(-35%)" }}
          >
            Nombre
          </span>

          <span
            className="text-base font-medium col-span-1 text-center"
            style={{ transform: "translateY(-35%)" }}
          >
            Fecha
          </span>
          <span
            className="text-base font-medium col-span-1 text-center"
            style={{ transform: "translateY(-35%)" }}
          >
            Valor
          </span>
          <span
            className="text-base font-medium col-span-1 text-center"
            style={{ transform: "translateY(-35%)" }}
          >
            Tipo
          </span>
          <span
            className="text-base font-medium col-span-1 text-center"
            style={{ transform: "translateY(-35%)" }}
          >
            Categoria
          </span>
          <span
            className="text-base font-medium col-span-1 text-center"
            style={{ transform: "translateY(-35%)" }}
          >
            Ingreso
          </span>
        </div>

        <Divider className="mt-[-0.5rem]" />
        {transactions.map((trans, index) => (
          <React.Fragment key={index}>
            <div className="grid grid-cols-6 gap-7 mt-1">
              <div className="flex items-center justify-left col-span-1">
                <span className="text-base">{trans.name}</span>
              </div>
              <div className="flex items-center justify-center col-span-1 mr-1">
                <span className="text-base">{trans.installments}</span>
              </div>
              <div className="flex items-center justify-center col-span-1 ">
                <span className="text-base">{trans.installmentValue}</span>
              </div>
              <div className="flex items-center justify-center col-span-1 ">
                  <DropdownTipo />
              </div>
              <div className="flex items-center justify-center col-span-1 ">
              <DropdownTipo />
              </div>
              <div className="flex items-center justify-right col-span-">
              <DropdownIngreso userId={userId} />
              </div>
            </div>
            {index < transactions.length - 1 && <Divider className="my-1" />}
          </React.Fragment>
        ))}
        {transactions.length === 0 && (
          <div className="text-center col-span-6">No hay transacciones aún</div>
        )}
      </CardBody>
    </Card>
  );
}
export default CardGastosFijos;

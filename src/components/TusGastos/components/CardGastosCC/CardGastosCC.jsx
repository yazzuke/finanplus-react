import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import DropdownMenu from "./DropdownMenuCC.jsx";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FormNuevoGastoCC from "./FormAddGastoCC.jsx";
import { fetchGastos, addGasto } from "./services/ApiService.jsx";

function CardGastosCC({ userId, className, tarjeta, actualizarTotalGastos  }) {
  const [transactions, setTransactions] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const { nombreTarjeta, fechaPago, tarjetaCreditoID,valorTotal   } = tarjeta;
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    installments: "",
    installmentValue: "",
    totalValue: "",
    interest: "",
    paid: "",
  });

  console.log("Tarjeta:", tarjeta); 

  const obtenerFechaSinAno = (fecha) => {
    if (!fecha) return "";
    const [year, month, day] = fecha.split("-");
    return `${day}-${month}`;
  };
  const fechaSinAno = obtenerFechaSinAno(fechaPago);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  useEffect(() => {
    fetchGastos(userId, tarjeta.tarjetaCreditoID)
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error("Error al obtener los gastos:", error);
      });
  }, [userId, tarjeta.tarjetaCreditoID]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    addGasto(userId, tarjeta.tarjetaCreditoID, {
      nombreGasto: newTransaction.name,
      cuotaGasto: parseInt(newTransaction.installments, 10),
      valorCuotaGasto: parseFloat(newTransaction.installmentValue),
      valorTotalGasto: parseFloat(newTransaction.totalValue),
      interes: parseFloat(newTransaction.interest),
    })
      .then((data) => {
        setTransactions([...transactions, data]);
        setFormVisible(false);
        setNewTransaction({
          name: "",
          installments: "",
          installmentValue: "",
          totalValue: "",
          interest: "",
          paid: "",
        });
      })
      .catch((error) => {
        console.error("Error al agregar el gasto:", error);
      });
  };

  return (
    <Card className="${className} dark w-[650px] h-[320px] mt-2 bg-sky-950">
      <CardHeader className="flex justify-between items-center">
        {/* Contenedor para el título y la fecha de pago */}
        <div className="flex flex-col">
          <div>
            <span className="text-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
              {nombreTarjeta}
            </span>
          </div>
          <span className="text-sm font-bold">
            Fecha de pago: {fechaSinAno}
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-sm font-bold mr-24 mt-7">
            Valor Total:{" "}
            {valorTotal.toLocaleString("es-ES", { maximumFractionDigits: 0 })}
          </span>

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
              <FormNuevoGastoCC
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
        <div className="grid grid-cols-5 gap-4 mb-1">
          <span
            className="text-base font-medium col-span-1"
            style={{ transform: "translateY(-35%)" }}
          >
            Nombre
          </span>

          <span
            className="text-base font-medium col-span-1 text-center"
            style={{ transform: "translateY(-35%)" }}
          >
            Cuotas
          </span>
          <span
            className="text-base font-medium col-span-1 text-right"
            style={{ transform: "translateY(-35%)" }}
          >
            Valor Cuota
          </span>
          <span
            className="text-base font-medium col-span-1 text-right"
            style={{ transform: "translateY(-35%)" }}
          >
            Valor Total
          </span>
          <span
            className="text-base font-medium col-span-1 text-right"
            style={{ transform: "translateY(-35%)" }}
          >
            Interés
          </span>
        </div>
        <Divider className="mt-[-0.5rem]" />
        {transactions.map((trans, index) => (
          <React.Fragment key={index}>
            <div className="grid grid-cols-5 gap-4 items-center">
              <div className="flex items-center justify-center col-span-1 mr-8">
                <span className="text-base">{trans.nombreGasto}</span>
              </div>
              <div className="flex items-center justify-center col-span-1 ">
                <span className="text-base">{trans.cuotaGasto}</span>
              </div>
              <div className="flex items-center justify-center col-span-1 ml-6 ">
                <span className="text-base">{trans.valorCuotaGasto}</span>
              </div>
              <div className="flex items-center justify-center col-span-1 ml-9 ">
                <span className="text-base">{trans.valorTotalGasto}</span>
              </div>
              <div className="flex items-center justify-center col-span-1 ml-12 ">
                <span className="text-base">{trans.interes}</span>{" "}
                {/* Mantenido como interes */}
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
export default CardGastosCC;

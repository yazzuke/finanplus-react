import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DropdownIngresos from "../DropdownIngreso.jsx";
import DropdownTipo from "../../../DropdownTipo.jsx";
import FormNuevoGastoCC from "./FormAddGastoCC.jsx";
import { fetchGastos, addGasto } from "./services/ApiService.jsx";

function CardGastosCC({
  userId,
  className,
  tarjeta,
  actualizarTotalGastos,
  currentDate,
}) {
  const [transactions, setTransactions] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const { nombreTarjeta, fechaPago, tarjetaCreditoID, valorTotal } = tarjeta;
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    installments: "",
    installmentValue: "",
    totalValue: "",
    tipo: "",
  });

  //console.log("Tarjeta:", tarjeta);

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
      tipo: newTransaction.tipo,
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
          tipo: "",
        });
      })
      .catch((error) => {
        console.error("Error al agregar el gasto:", error);
      });
  };

  useEffect(() => {
    if (!userId || !currentDate) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // JavaScript cuenta los meses desde 0
    const tarjetaCreditoID = tarjeta.tarjetaCreditoID;

    // Limpiar el estado antes de cargar nuevos datos
    setTransactions([]);

    fetchGastos(userId, tarjetaCreditoID, year, month)
      .then((data) => {
        // Asegurarse de que la respuesta sea un array
        if (Array.isArray(data)) {
          setTransactions(data);
          console.log("Gastos cargados:", data);
        } else {
          // Manejo de una respuesta inesperada o un error
          console.error("La respuesta de la API no es un array: ", data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los gastos:", error);
      });
  }, [userId, tarjeta.tarjetaCreditoID, currentDate]);

  // Función para ajustar el tamaño de la fuente del texto
  function adjustFontSize(text) {
    const baseSize = 16;
    const scalingFactor = 0.5;
    const maxLengthBeforeScale = 10;

    if (text.length > maxLengthBeforeScale) {
      const scaleFactor = Math.max(
        baseSize - (text.length - maxLengthBeforeScale) * scalingFactor,
        10
      ); // No reducir la fuente a menos de 10px
      return `${scaleFactor}px`;
    }
    return `${baseSize}px`;
  }

  /// actualizar gasto
  const updateTipoGasto = (gastoID, nuevoTipo, actualizarEstado) => {
    const url = `http://localhost:8080/usuarios/${userId}/tarjetascredito/${tarjetaCreditoID}/gastos/${gastoID}/tipo`;
    console.log(`Actualizando gasto ${gastoID} a tipo ${nuevoTipo}`); // Utiliza esto para depurar

    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Aquí deberías agregar cualquier header adicional que necesites, como tokens de autenticación.
      },
      body: JSON.stringify({ tipo: nuevoTipo }), // Asegúrate de que el cuerpo de la solicitud corresponda con lo que espera tu API.
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Si tu API responde con datos, asegúrate de manejar la respuesta aquí.
      })
      .then((data) => {
        console.log("Tipo actualizado con éxito:", data);
        actualizarEstado(data); // Llama a una función para actualizar el estado local
      })
      .catch((error) => {
        console.error("Error al actualizar el tipo de gasto:", error);
      });
  };

  // Suponiendo que tienes una función para actualizar el estado en tu componente:
  const actualizarEstado = (gastoActualizado) => {
    setTransactions(
      transactions.map((gasto) => {
        if (gasto.gastoID === gastoActualizado.gastoID) {
          return gastoActualizado;
        }
        return gasto;
      })
    );
  };

  return (
    <Card className="${className} dark w-[680px] h-[320px] mt-2  ">
      <CardHeader className="flex justify-between items-center">
        <div>
          <span className="text-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
            {nombreTarjeta}
          </span>
          <div className="flex">
            <span className="text-sm font-bold mr-7">
              Fecha de pago: {fechaSinAno}
            </span>
            <span className="text-sm font-bold mr-4">
              Valor Total:{" "}
              {valorTotal.toLocaleString("es-ES", { maximumFractionDigits: 0 })}
            </span>
            <div className="flex items-center justify-center col-span-1 ml-16">
              <DropdownIngresos userId={userId} />
            </div>
          </div>
        </div>

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
            className="text-base font-medium col-span-1 text-center ml-12"
            style={{ transform: "translateY(-35%)" }}
          >
            Tipo
          </span>
        </div>
        <Divider className="mt-[-0.5rem]" />
        {transactions.map((trans, index) => (
          <React.Fragment key={index}>
            <div className="grid grid-cols-5 gap-4 items-center">
              <div className="flex items-center justify-center col-span-1 mr-3 whitespace-nowrap overflow-hidden overflow-ellipsis ">
                <span
                  className="text-base"
                  style={{ fontSize: adjustFontSize(trans.nombreGasto) }}
                >
                  {trans.nombreGasto}
                </span>
              </div>
              <div className="flex items-center justify-center col-span-1 ">
                <span className="text-base">{trans.cuotaGasto}</span>
              </div>
              <div className="flex items-center justify-center col-span-1 ml-6 ">
                <span className="text-base">
                  {trans.valorCuotaGasto.toLocaleString("es-ES")}
                </span>
              </div>
              <div className="flex items-center justify-center col-span-1 ml-9 ">
                <span className="text-base">
                  {trans.valorTotalGasto.toLocaleString("es-ES")}
                </span>
              </div>
              <div className="flex items-center justify-center col-span-1 ml-12 ">
                <DropdownTipo
                  tipo={trans.tipo}
                  gastoID={trans.gastoID} // Asegúrate de que trans tenga una propiedad gastoID con el ID correcto.
                  onTypeChange={(gastoID, newType) =>
                    updateTipoGasto(gastoID, newType)
                  }
                />
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

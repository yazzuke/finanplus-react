import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import DropdownTipo from "../../../DropdownTipo.jsx";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DropdownIngreso from "../DropdownIngreso.jsx";
import ModalEditarBorrarGastos from "../Forms/ModalEditarBorrarGastos.jsx";
import ModalAgregarGastos from "../Forms/ModalAgregarGastos.jsx";
import TooltipModificarGasto from "../Tooltip/TooltipModificarGasto.jsx";
import { useTheme } from "next-themes";
import TooltipAgregarGasto from "../Tooltip/TooltipAgregarGasto.jsx";

function CardGastoDiario({ userId, gastoDiario, CurrentDate }) {
  const [transactions, setTransactions] = useState([]);
  const { theme } = useTheme();
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const [newTransaction, setNewTransaction] = useState({
    nombreGasto: "",
    valorGasto: 0,
    fecha: new Date().toISOString().split("T")[0], // Asegúrate de que el formato de fecha coincida con el esperado por tu API
    tipo: "Necesidad",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleSubmit = async () => {
    if (!gastoDiario || !gastoDiario.gastoDiarioID) {
      console.error("ID del gasto diario no disponible");
      alert("No se puede añadir el gasto: ID del gasto diario no disponible.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/usuarios/${userId}/gastosdiario/${gastoDiario.gastoDiarioID}/gastos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombreGasto: newTransaction.nombreGasto,
            valorGasto: newTransaction.valorGasto,
            fecha: newTransaction.fecha,
            tipo: newTransaction.tipo,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(
          `Error en la respuesta del servidor: ${response.statusText}`
        );
      }
      const data = await response.json();
      setTransactions([...transactions, data]);
      setNewTransaction({
        nombreGasto: "",
        valorGasto: 0,
        fecha: new Date().toISOString().split("T")[0],
        tipo: "Necesidad",
      });
    } catch (error) {
      console.error("Error al agregar el gasto diario:", error);
      alert("Error al agregar el gasto: " + error.message);
    }
  };

  // muestra los gastos diarios segun el gasto.
  useEffect(() => {
    // Se cambia de gastoDiario.id a gastoDiario.gastoDiarioID
    if (gastoDiario && gastoDiario.gastoDiarioID) {
      const fetchGastosDiario = async () => {
        const apiUrl = `http://localhost:8080/usuarios/${userId}/gastosdiario/${gastoDiario.gastoDiarioID}/gastos`;
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(
              "No se pudo obtener la información de los gastos diarios"
            );
          }
          const data = await response.json();
          if (data.length === 0) {
            console.log(
              "No hay gastos registrados para este gasto diario aún."
            );
          } else {
            setTransactions(data);
          }
        } catch (error) {
          console.error("Error al obtener los gastos diarios:", error);
        }
      };
      fetchGastosDiario();
    } else {
      console.log(
        "gastoDiario no definido o falta gastoDiarioID:",
        gastoDiario
      );
    }
  }, [userId, gastoDiario]); // Dependencias del useEffect

  // console.log(gastoDiario);

  // endpoint para cambiar el tipo de gasto
  const updateTipoGasto = async (gastoID, nuevoTipo) => {
    try {
      const response = await fetch(
        `http://localhost:8080/usuarios/${userId}/gastosdiario/${gastoDiario.gastoDiarioID}/gastos/${gastoID}/tipo`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tipo: nuevoTipo }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update expense type");
      }
      const updatedTransaction = await response.json();
      setTransactions(
        transactions.map((transaction) =>
          transaction.gastoID === updatedTransaction.gastoID
            ? updatedTransaction
            : transaction
        )
      );
    } catch (error) {
      console.error("Error updating expense type:", error);
    }
  };

  const openEditModal = () => {
    setEditModalVisible(true);
  };

  return (
    <Card
      className={`bg-${theme === "light" ? "white" : "black"} text-${
        theme === "light" ? "black" : "white"
      } w-[660px] h-[316px] mt-2 shadow-none drop-shadow-xl`}
      style={{ backgroundColor: theme === 'light' ? '#FEFBF6' : '#23272F' }} >
      <CardHeader className="flex justify-between items-center">
        {/* Contenedor para el título y la fecha de pago */}
        <div className="flex flex-col">
          <div>
            <span className="flextext-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis mt-5">
              Gastos Diarios
            </span>
          </div>
          <span className="text-sm font-bold mr-24 ">
            Valor Total:{" "}
            {gastoDiario.valorTotal.toLocaleString("es-ES", {
              maximumFractionDigits: 0,
            })}{" "}
          </span>
        </div>

        <div className="flex items-center">
          <div className="flex items-center mt-7"></div>

          {/* Contenedor actual para los iconos */}

          <div>
            <TooltipModificarGasto>
              <IconButton
                color="primary"
                aria-label="edit"
                onClick={openEditModal}
                style={{
                  background: "white",
                  padding: "0.2rem",
                  right: "12px",
                }}
              >
                <EditIcon />
              </IconButton>
            </TooltipModificarGasto>
            <TooltipAgregarGasto>
              <IconButton
                color="primary"
                aria-label="add"
                className="ml-2"
                onClick={toggleFormVisibility}
                style={{
                  background: "white",
                  padding: "0.2rem",
                }}
              >
                <AddIcon />
              </IconButton>
            </TooltipAgregarGasto>

            {isEditModalVisible && (
              <ModalEditarBorrarGastos
                isOpen={isEditModalVisible}
                onClose={() => setEditModalVisible(false)}
                userId={userId}
                gastoDiarioId={gastoDiario.gastoDiarioID}
                currentDate={CurrentDate}
                // Aquí puedes añadir otras props que necesite el modal
              />
            )}

            {/* Formulario para añadir un nuevo gasto */}

            {isFormVisible && (
              <ModalAgregarGastos
                isOpen={isFormVisible}
                onClose={() => setFormVisible(false)}
                newTransaction={newTransaction}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </CardHeader>

      <Divider
        className={`${
          theme === "light" ? "bg-black" : "bg-gray-600"
        } mt-[-0.5rem]`}
      />

      <CardBody>
        <div className="grid grid-cols-4">
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
        </div>

        <Divider
          className={`${
            theme === "light" ? "bg-black" : "bg-gray-600"
          } mt-[-0.5rem]`}
        />

        {transactions.map((trans, index) => (
          <React.Fragment key={index}>
            <div className="grid grid-cols-4 gap-7 mt-1">
              {/* Actualiza estos campos para que coincidan con la estructura de tus datos de gastos */}
              <div className="flex items-center justify-left col-span-1">
                <span className="text-base">{trans.nombreGasto}</span>
              </div>
              <div className="flex items-center justify-center col-span-1 ml-3">
                {new Date(trans.fecha).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </div>
              <div className="flex items-center justify-center col-span-1 ">
                <span className="text-base">
                  {trans.valorGasto.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-center col-span-1 ">
                <DropdownTipo
                  tipo={trans.tipo}
                  gastoID={trans.gastoID}
                  onTypeChange={(gastoID, newType) =>
                    updateTipoGasto(gastoID, newType)
                  }
                />
              </div>
            </div>

            {index < transactions.length - 1 && (
              <Divider
                className={`${
                  theme === "light" ? "bg-black" : "bg-gray-600"
                } mt-[3px]`}
              />
            )}
          </React.Fragment>
        ))}
        {transactions.length === 0 && (
          <div className="text-center col-span-6">No hay transacciones aún</div>
        )}
      </CardBody>
    </Card>
  );
}
export default CardGastoDiario;

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import DropdownTipo from "../../../DropdownTipo.jsx";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DropdownIngreso from "../DropdownIngreso.jsx";
import ModalAgregarGastos from "../Forms/ModalAgregarGastos.jsx";
import ModalEditarBorrarGastosVariables from "./ModalEditarBorrarGastosVariables.jsx";

function CardGastoVariable({ userId, gastoVariable, CurrentDate }) {
  const [transactions, setTransactions] = useState([]);
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
    if (!gastoVariable || !gastoVariable.gastoVariableID) {
      console.error("ID del gasto variable no disponible");
      alert(
        "No se puede añadir el gasto: ID del gasto variable no disponible."
      );
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/usuarios/${userId}/gastosvariables/${gastoVariable.gastoVariableID}/gastos`,
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
      console.error("Error al agregar el gasto variable:", error);
      alert("Error al agregar el gasto: " + error.message);
    }
  };

  useEffect(() => {
    if (gastoVariable && gastoVariable.gastoVariableID) {
      const apiUrl = `http://localhost:8080/usuarios/${userId}/gastosvariables/${gastoVariable.gastoVariableID}/gastos`;
      const fetchGastosVariable = async () => {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(
              "No se pudo obtener la información de los gastos variables"
            );
          }
          const data = await response.json();
          setTransactions(data);
        } catch (error) {
          console.error("Error al obtener los gastos variables:", error);
        }
      };
      fetchGastosVariable();
    } else {
      console.log(
        "gastoVariable no definido o falta gastoVariableID:",
        gastoVariable
      );
    }
  }, [userId, gastoVariable]);

  // endpoint para cambiar el tipo de gasto
  const updateTipoGasto = async (gastoID, nuevoTipo) => {
    try {
      const response = await fetch(
        `http://localhost:8080/usuarios/${userId}/gastosvariables/${gastoVariable.gastoVariableID}/gastos/${gastoID}/tipo`,
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
    <Card className="dark w-[600px] h-[320px] mt-2">
      <CardHeader className="flex justify-between items-center">
        {/* Contenedor para el título y la fecha de pago */}
        <div className="flex flex-col">
          <div>
            <span className="flextext-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis mt-5">
              Gastos Variables
            </span>
          </div>
          <span className="text-sm font-bold mr-24 ">
            {" "}
            {gastoVariable.valorTotal.toLocaleString("es-ES", {
              maximumFractionDigits: 0,
            })}{" "}
          </span>
        </div>

        <div className="flex items-center">
          <div className="flex items-center mt-7"></div>

          {/* Contenedor actual para los iconos */}
          <div>
            <IconButton
              color="primary"
              aria-label="edit"
              className="ml-2"
              onClick={openEditModal}
            >
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

            {/* Modal para editar o borrar un gasto */}
            {isEditModalVisible && (
              <ModalEditarBorrarGastosVariables
                isOpen={isEditModalVisible}
                onClose={() => setEditModalVisible(false)}
                userId={userId}
                gastoVariableId={gastoVariable.gastoVariableID}
                currentDate={CurrentDate}
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

      <Divider className="mt-[-0.5rem]" />
      <CardBody>
        <div className="grid grid-cols-5 gap-1">
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
            Ingreso
          </span>
        </div>

        <Divider className="mt-[-0.5rem]" />
        {transactions.map((trans, index) => (
          <React.Fragment key={index}>
            <div className="grid grid-cols-6 gap-7 mt-1">
              {/* Actualiza estos campos para que coincidan con la estructura de tus datos de gastos */}
              <div className="flex items-center justify-left col-span-1">
                <span className="text-base">{trans.nombreGasto}</span>
              </div>
              <div className="flex items-center justify-center col-span-1 mr-1">
                {new Date(trans.fecha).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </div>
              <div className="flex items-center justify-center col-span-1 ">
                <span className="text-base">
                  {trans.valorGasto.toLocaleString("es-ES")}
                </span>
              </div>
              <div className="flex items-center justify-center col-span-1 ">
                <DropdownTipo
                  tipo={trans.tipo}
                  gastoID={trans.gastoID} // Asegúrate de que trans tenga una propiedad gastoID con el ID correcto.
                  onTypeChange={(gastoID, newType) =>
                    updateTipoGasto(gastoID, newType)
                  }
                />
              </div>
              <div className="flex items-center justify-center col-span-1 ">
                <DropdownIngreso userId={userId} />
              </div>
              {/* Asegúrate de que los campos de transacción aquí coincidan con los nombres de tus datos de gastos */}
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
export default CardGastoVariable;

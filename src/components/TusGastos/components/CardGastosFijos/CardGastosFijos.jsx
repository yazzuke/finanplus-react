  import React, { useState, useEffect } from "react";
  import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
  import DropdownTipo from "./DropdownTipo.jsx";
  import IconButton from "@mui/material/IconButton";
  import AddIcon from "@mui/icons-material/Add";
  import EditIcon from "@mui/icons-material/Edit";
  import DropdownIngreso from "./DropdownIngreso.jsx";
  import FormGastosFijos from "./FormGastosFijos.jsx";

  function CardGastosFijos({ userId, gastoFijo }) {
    const [transactions, setTransactions] = useState([]);
    const [totalGastosFijos, setTotalGastosFijos] = useState(0);
    const [isFormVisible, setFormVisible] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Asegúrate de que estás usando gastoFijo.gastoFijoID y no gastoFijoID
      const response = await fetch(
        `http://localhost:8080/usuarios/${userId}/gastosfijos/${gastoFijo.gastoFijoID}/gastos`,
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
        throw new Error("Respuesta de red no fue ok");
      }
      const data = await response.json();
      setTransactions([...transactions, data]);
      setNewTransaction({ nombreGasto: "", valorGasto: 0, fecha: new Date().toISOString().split("T")[0], tipo: "Necesidad" });
    } catch (error) {
      console.error("Hubo un problema con la solicitud fetch:", error);
    }
  };



  useEffect(() => {
    // Verifica si gastoFijo y gastoFijo.gastoFijoID están definidos para evitar errores de solicitud no deseada
    if (gastoFijo && gastoFijo.gastoFijoID) { // Cambia aquí gastoFijo.id por gastoFijo.gastoFijoID
      const fetchGastosInvFijo = async () => {
        const apiUrl = `http://localhost:8080/usuarios/${userId}/gastosfijos/${gastoFijo.gastoFijoID}/gastos`;
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            
            throw new Error("No se pudo obtener la información de los gastos inv fijo");
          }
          const data = await response.json();
          setTransactions(data); // Actualiza el estado con los gastos obtenidos
          console.log("Gastos inv fijo:", data);
        } catch (error) {
          console.error("Error al obtener los gastos inv fijo:", error);
        }
      };

      fetchGastosInvFijo();
    }
  }, [userId, gastoFijo]); 


    const toggleFormVisibility = () => {
      setFormVisible(!isFormVisible);
    };


    useEffect(() => {
      // Calcula la suma total de los gastos fijos
      const sumaTotalGastos = transactions.reduce((acc, trans) => acc + trans.valorGasto, 0);
      // Actualiza el estado con el total de gastos fijos
      setTotalGastosFijos(sumaTotalGastos);
    }, [transactions]);
    

    return (
      
      <Card className="dark w-[720px] h-[320px] mt-2  bg-indigo-950">
        <CardHeader className="flex justify-between items-center">
          {/* Contenedor para el título y la fecha de pago */}
          <div className="flex flex-col">
            <div>
              <span className="flextext-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis mt-5">
                Gasto Fijo - {gastoFijo.nombreGasto}
              </span>
            </div>
            <span className="text-sm font-bold mr-24 ">   Valor Total: ${totalGastosFijos.toLocaleString()}</span>
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
                {/* Actualiza estos campos para que coincidan con la estructura de tus datos de gastos */}
                <div className="flex items-center justify-left col-span-1">
                  <span className="text-base">{trans.nombreGasto}</span>
                </div>
                <div className="flex items-center justify-center col-span-1 mr-1">
                  <span className="text-base">{trans.fecha}</span>
                </div>
                <div className="flex items-center justify-center col-span-1 ">
                  <span className="text-base">{trans.valorGasto}</span>
                </div>
                <div className="flex items-center justify-center col-span-1 ">
                  <DropdownTipo selectedValue={trans.tipo} />
                </div>
                <div className="flex items-center justify-center col-span-1 ">
                  <DropdownTipo selectedValue={trans.tipo} />
                </div>
                <div className="flex items-center justify-center col-span-1 ">
                  <DropdownIngreso userId={userId}  />
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
  export default CardGastosFijos;
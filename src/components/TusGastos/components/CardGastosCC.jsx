import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import DropdownMenu from "./DropdownMenuCC.jsx";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

function CardGastosCC({ userId, className, tarjeta  }) {
  const [transactions, setTransactions] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const { nombreTarjeta, fechaPago, tarjetaCreditoID  } = tarjeta;
  
  const obtenerFechaSinAno = (fecha) => {
    if (!fecha) return ""; 
    const [year, month, day] = fecha.split("-");
    return `${day}-${month}`; 
  };
  const fechaSinAno = obtenerFechaSinAno(fechaPago);
    
    console.log("Tarjeta recibida:", tarjeta);

  useEffect(() => {
    // Construye la URL de la API para la solicitud GET
    const apiUrl = `http://localhost:8080/usuarios/${userId}/tarjetascredito/${tarjetaCreditoID}/gastos`;

    // Realiza la solicitud GET al backend
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('La respuesta del servidor no fue OK al obtener los gastos');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Gastos obtenidos:', data);
        const sumaTotal = data.reduce((total, gastoActual) => {
          return total + gastoActual.valorTotalGasto;
        }, 0);
        setValorTotal(sumaTotal);
        setTransactions(data);
      })
      .catch((error) => {
        console.error('Error al obtener los gastos:', error);
      })
      .catch((error) => {
        console.error('Error al obtener los gastos:', error);
        // Aquí podrías manejar el error mostrando un mensaje al usuario, por ejemplo
      });
  }, [userId, tarjetaCreditoID]); // Dependencias del efecto: se vuelve a ejecutar si cambian



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
    
    // Construye la URL de la API para la solicitud POST
    const apiUrl = `http://localhost:8080/usuarios/${userId}/tarjetascredito/${tarjeta.tarjetaCreditoID}/gastos`;
  

    const gastoData = {
      nombreGasto: newTransaction.name,
      cuotaGasto: parseInt(newTransaction.installments, 10), 
      valorCuotaGasto: parseFloat(newTransaction.installmentValue), 
      valorTotalGasto: parseFloat(newTransaction.totalValue), 
      interes: parseFloat(newTransaction.interest)
    };
  
    // Realiza la solicitud POST al backend
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gastoData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('La respuesta del servidor no fue OK');
      }
      return response.json();
    })
    .then(data => {
      console.log('Gasto agregado:', data);
      // Agrega el nuevo gasto a la lista de transacciones y reinicia el formulario
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
    .catch(error => {
      console.error('Error al agregar el gasto:', error);
      // Aquí podrías manejar el error mostrando un mensaje al usuario, por ejemplo
    });
  };

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <Card className="${className} dark max-w-[720px] h-[320px] mt-2">
      <CardHeader className="flex justify-between items-center">
        {/* Contenedor para el título y la fecha de pago */}
        <div className="flex flex-col">
          <div >
        <span className="text-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">{nombreTarjeta}</span>
        </div>
         <span className="text-sm font-bold">Fecha de pago: {fechaSinAno}</span>
        </div>


        <div className="flex items-center">

              <span className="text-sm font-bold mr-24 mt-7">
              Valor Total: {valorTotal.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
      </span>


          <div className="flex items-center mt-7">
            <DropdownMenu userId={userId} />
          </div>

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
              <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  {/* Campos del formulario */}
                  <input
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    value={newTransaction.name}
                    onChange={handleInputChange}
                    className="border p-2 rounded mb-2 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Cuotas"
                    name="installments"
                    value={newTransaction.installments}
                    onChange={handleInputChange}
                    className="border p-2 rounded mb-2 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Valor Cuota"
                    name="installmentValue"
                    value={newTransaction.installmentValue}
                    onChange={handleInputChange}
                    className="border p-2 rounded mb-2 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Valor Total"
                    name="totalValue"
                    value={newTransaction.totalValue}
                    onChange={handleInputChange}
                    className="border p-2 rounded mb-2 w-full"
                  />
                  
                  <input
                    type="text"
                    placeholder="Interés"
                    name="interest"
                    value={newTransaction.interest}
                    onChange={handleInputChange}
                    className="border p-2 rounded mb-2 w-full"
                  />
            
                  {/* Botón para enviar el formulario */}
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSubmit}
                  >
                    Agregar Gasto
                  </button>
                </div>
              </div>
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
        <span className="text-base">{trans.interes}</span> {/* Mantenido como interes */}
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

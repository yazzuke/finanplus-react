import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ModalEditarBorrarAhorros from "./ModalEditarBorrarAhorros.jsx";
import ModalAgregarAhorro from "./ModalAgregarAhorro.jsx";
import EditIcon from "@mui/icons-material/Edit";

function Ahorros({ userId, currentDate }) {
  const [ahorros, setAhorros] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedAhorro, setSelectedAhorro] = useState({});

   // Verifica que `openEditModal` realmente esté cambiando el estado.
   const openEditModal = () => {
    console.log("Intentando abrir modal de edición");
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    console.log("Cerrando modal de edición");
    setEditModalVisible(false);
  };    
  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  // endpoint para mostrar por meses
  useEffect(() => {
    if (userId && currentDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // getMonth() es 0-indexado
      fetch(
        `http://localhost:8080/usuarios/${userId}/ahorros/fecha?year=${year}&month=${month}`
      )
        .then((response) => response.json())
        .then((data) => {
          setAhorros(data); // Actualiza el estado con los nuevos datos
        })
        .catch((error) =>
          console.error("Error al obtener los ahorros:", error)
        );
    }
  }, [userId, currentDate]);

  // Referencia al contenedor para usar con PerfectScrollbar
  const containerRef = useRef(null);

  // Efecto para inicializar PerfectScrollbar y limpiarlo
  useEffect(() => {
    if (containerRef.current) {
      const ps = new PerfectScrollbar(containerRef.current);
      containerRef.current.style.position = "relative";
      return () => ps.destroy();
    }
  }, []);

  // Función para manejar el cambio en los campos del formulario
  const handleInputChange = (event) => {
    setNuevoAhorro({
      ...nuevoAhorro,
      [event.target.name]: event.target.value,
    });
  };

  const [nuevoAhorro, setNuevoAhorro] = useState({
    concepto: "",
    meta: "",
    actual: "",
    tipo: "",
  });

  const agregarAhorro = () => {
    if (
      nuevoAhorro.concepto &&
      nuevoAhorro.meta &&
      nuevoAhorro.actual &&
      nuevoAhorro.tipo &&
      userId
    ) {
      fetch(`http://localhost:8080/usuarios/${userId}/ahorros`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          concepto: nuevoAhorro.concepto,
          meta: parseFloat(nuevoAhorro.meta),
          actual: parseFloat(nuevoAhorro.actual),
          tipo: nuevoAhorro.tipo,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setAhorros(ahorros.concat(data)); // Agregar el nuevo ahorro a la lista
          setNuevoAhorro({ concepto: "", meta: "", actual: "", tipo: "" }); // Resetea el formulario
          setFormVisible(false); // Oculta el formulario
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const actualizarAhorro = (ahorro) => {
    fetch(`http://localhost:8080/usuarios/${userId}/ahorros/${ahorro.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        concepto: ahorro.concepto,
        meta: parseFloat(ahorro.meta),
        actual: parseFloat(ahorro.actual),
        tipo: ahorro.tipo,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAhorros((prev) =>
          prev.map((item) => (item.id === data.id ? data : item))
        );
        // Cerrar modal y limpiar seleccionado después de actualizar
        setFormVisible(false);
        setSelectedAhorro({});
      })
      .catch((error) => {
        console.error("Error al actualizar el ahorro:", error);
        alert("Hubo un error al actualizar el ahorro");
      });
  };

  const eliminarAhorro = (id) => {
    fetch(`http://localhost:8080/usuarios/${userId}/ahorros/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setAhorros((prev) => prev.filter((item) => item.id !== id));
        // Cerrar modal después de eliminar
        setFormVisible(false);
        setSelectedAhorro({});
      })
      .catch((error) => {
        console.error("Error al eliminar el ahorro:", error);
        alert("Hubo un error al eliminar el ahorro");
      });
  };

  return (
    <Card className="dark w-[250px] h-[320px] mt-2  ml-2">
      <CardHeader className="flex justify-between items-center">
        {/* Contenedor para el título y la fecha de pago */}
        <div className="flex flex-col">
          <div>
            <span className="flextext-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis mt-5">
              Tus Ahorros
            </span>
          </div>
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
              {isEditModalVisible && (
                <ModalEditarBorrarAhorros
                  isOpen={isEditModalVisible}
                  onClose={closeEditModal}
                  userId={userId}  // Asegúrate de pasar el userId
                  handleInputChange={handleInputChange} // Asegúrate de tener esta función definida o modifícala según tus necesidades
                />
              )}
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
              <ModalAgregarAhorro
                isOpen={isFormVisible}
                onClose={toggleFormVisibility}
                newTransaction={nuevoAhorro}
                handleInputChange={handleInputChange}
                handleSubmit={agregarAhorro}
              />
            )}
          </div>
        </div>
      </CardHeader>

      <Divider className="mt-[-0.5rem]" />
      <CardBody className="flex flex-col mt-[-10px]" ref={containerRef}>
        {ahorros.map((ahorro, index) => (
          <div key={index} className="flex flex-col ">
            <div className="flex justify-right ">
              <span className="font-medium">Nombre:</span>
              <span>{ahorro.concepto}</span>
            </div>
            <div className="flex justify-right">
              <span className="font-medium">Meta:</span>
              <span>{ahorro.meta}</span>
            </div>
            <div className="flex justify-right">
              <span className="font-medium">Valor:</span>
              <span>{ahorro.actual}</span>
            </div>
            <div className="flex justify-right">
              <span className="font-medium">Tipo:</span>
              <span>{ahorro.tipo}</span>
            </div>
            <Divider className="mt-[0.3rem]" />
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
export default Ahorros;

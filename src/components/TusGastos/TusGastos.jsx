import React, { useState, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import CardGastosFijos from "./components/CardGastosFijos/CardGastosFijos.jsx";
import CardGastosCC from "./components/CardGastosCC/CardGastosCC.jsx";
import CardGastoDiario from "./components/CardGastoDiario/CardGastosDiario.jsx";
import CardGastoVariable from "./components/CardGastoVariable/CardGastosVariable.jsx";
import ModalNuevoGasto from "./components/Forms/ModalNuevoGasto.jsx";


function TusGastos({ userId, currentDate }) {
  const [cards, setCards] = useState([]);
  const carouselRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [totalGastos, setTotalGastos] = useState(0);
  const [isOpen, setIsOpen] = useState(false);


  const [nuevaTarjeta, setNuevaTarjeta] = useState({
    nombreTarjeta: "",
    fechaPago: "",
    nombreGastoFijo: "",
  });

  const [tarjetas, setTarjetas] = useState([]);
  const [gastosFijos, setGastosFijos] = useState([]);
  const [tipoTarjeta, setTipoTarjeta] = useState("");
  const [gastosDiarios, setGastosDiarios] = useState([]);
  const [gastosVariables, setGastosVariables] = useState([]);

  const actualizarTotalGastos = (nuevoGasto) => {
    setTotalGastos((prevTotalGastos) => prevTotalGastos + nuevoGasto);
  };
  // esto es una función que se ejecuta cuando se hace click en el botón de agregar gasto
  const handleAgregarGasto = () => {
    const cardStyle = cards.length === 0 ? "" : "ml-14";
    setShowForm(true);
    const newCard = (
      <div key={cards.length} className={cardStyle}>
        <CardGastosCC userId={userId} />
      </div>
    );
    setCards([...cards, newCard]);
  };

  const scroll = (scrollOffset) => {
    carouselRef.current.scrollLeft += scrollOffset;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarjeta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    let url;
    let data;

    switch (tipoTarjeta) {
      case "gastosCC":
        url = `http://localhost:8080/usuarios/${userId}/tarjetascredito`;
        data = {
          nombreTarjeta: nuevaTarjeta.nombreTarjeta,
          fechaPago: nuevaTarjeta.fechaPago,
        };
        break;
      case "gastosFijos":
        url = `http://localhost:8080/usuarios/${userId}/gastosfijos`;
        data = {
          nombreGasto: nuevaTarjeta.nombreGastoFijo,
        };
        break;
      case "gastosDiarios":
        url = `http://localhost:8080/usuarios/${userId}/gastosdiario`;
        data = {
          nombreGasto: "Gasto diario predeterminado",
          valorGasto: 0,
          fecha: new Date().toISOString().slice(0, 10),
          tipo: "Necesidad",
        };
        break;
      case "gastosVariables": // Añadir manejo de gastos variables
        url = `http://localhost:8080/usuarios/${userId}/gastosvariables`;
        data = {
          nombreGasto: "Gasto variable predeterminado",
          valorGasto: 0,
          fecha: new Date().toISOString().slice(0, 10),
          tipo: "Necesidad",
        };
        break;
      default:
        console.error("Tipo de tarjeta no reconocido");
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
      .then((data) => {
        console.log("Gasto agregado con éxito:", data);
        setShowForm(false);
        setNuevaTarjeta({
          nombreTarjeta: "",
          fechaPago: "",
          nombreGastoFijo: "",
        });
      })
      .catch((error) => {
        console.error("Error al crear el gasto:", error);
      });
  };

  useEffect(() => {
    // Carga de datos según la fecha actual
    const fetchDataForCurrentDate = async () => {
      if (!userId || !currentDate) return;

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      const tarjetasUrl = `http://localhost:8080/usuarios/${userId}/tarjetascredito/fecha?year=${year}&month=${month}`;
      const gastosFijosUrl = `http://localhost:8080/usuarios/${userId}/gastosfijos/fecha?year=${year}&month=${month}`;
      const gastosDiariosUrl = `http://localhost:8080/usuarios/${userId}/gastosdiario/fecha?year=${year}&month=${month}`;
      const gastosVariablesUrl = `http://localhost:8080/usuarios/${userId}/gastosvariables/fecha?year=${year}&month=${month}`; // URL para gastos variables

      const fetchData = async (url) => {
        try {
          const response = await fetch(url);
          if (!response.ok)
            throw new Error("Respuesta no satisfactoria del servidor");
          return await response.json();
        } catch (error) {
          console.error("Error al obtener datos:", error);
          return [];
        }
      };

      Promise.all([
        fetchData(tarjetasUrl),
        fetchData(gastosFijosUrl),
        fetchData(gastosDiariosUrl),
        fetchData(gastosVariablesUrl), // Añadir gastos variables a la carga de datos
      ]).then(
        ([
          tarjetasData,
          gastosFijosData,
          gastosDiariosData,
          gastosVariablesData,
        ]) => {
          setTarjetas(tarjetasData);
          setGastosFijos(gastosFijosData);
          setGastosDiarios(gastosDiariosData);
          setGastosVariables(gastosVariablesData); // Establecer estado de gastos variables
        }
      );
    };

    fetchDataForCurrentDate();
  }, [userId, currentDate]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsOpen(false);
  };


  return (
    <div className="mt-[110px] ml-1 bg">
      <div className="flex items-center">
        <span className="text-3xl font-bold">Tus Gastos</span>
        <IconButton
        onClick={handleOpenModal}
          color="primary"
          aria-label="add"
          style={{
            borderRadius: "50%",
            background: "white",
            padding: "0.2rem",
            left: "8px",
            top: "3px",
          }}
        >
          <AddIcon />
        </IconButton>
        <ModalNuevoGasto
        userId={userId}
        currentDate={currentDate}
        isOpen={isOpen}
        onClose={handleCloseModal}
      />
      
        <IconButton
          onClick={() => scroll(-200)}
          aria-label="previous"
          style={{
            borderRadius: "50%",
            background: "white",
            padding: "0.2rem",
            left: "18px",
            top: "3px",
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton
          onClick={() => scroll(200)}
          aria-label="next"
          style={{
            borderRadius: "50%",
            background: "white",
            padding: "0.2rem",
            left: "27px",
            top: "3px",
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </div>
      <div
        ref={carouselRef}
        className="flex flex-nowrap overflow-x-hidden"
        style={{ scrollBehavior: "smooth" }}
      >
        {tarjetas.map((tarjeta, index) => (
          <div key={`tarjeta-${index}`} className={index > 0 ? "ml-7" : ""}>
            <CardGastosCC
              tarjeta={tarjeta}
              userId={userId}
              actualizarTotalGastos={setTotalGastos}
              currentDate={currentDate}
            />
          </div>
        ))}

        {gastosFijos.map((gastoFijo, index) => (
          <div
            key={`gastoFijo-${index}`}
            className={index > 0 || tarjetas.length > 0 ? "ml-7" : ""}
          >
            <CardGastosFijos
              gastoFijo={gastoFijo}
              userId={userId}
              actualizarTotalGastos={setTotalGastos}
              currentDate={currentDate}
            />
          </div>
        ))}

        {gastosDiarios.map((gastoDiario, index) => (
          <div
            key={`gastoDiario-${index}`}
            className={
              index > 0 || tarjetas.length > 0 || gastosFijos.length > 0
                ? "ml-7"
                : ""
            }
          >
            <CardGastoDiario
              gastoDiario={gastoDiario}
              userId={userId}
              actualizarTotalGastos={setTotalGastos}
              currentDate={currentDate}
            />
          </div>
        ))}

        {gastosVariables.map(
          (
            gastoVariable,
            index // Añadir visualización de gastos variables
          ) => (
            <div
              key={`gastoVariable-${index}`}
              className={
                index > 0 ||
                tarjetas.length > 0 ||
                gastosFijos.length > 0 ||
                gastosDiarios.length > 0
                  ? "ml-7"
                  : ""
              }
            >
              <CardGastoVariable
                gastoVariable={gastoVariable}
                userId={userId}
                actualizarTotalGastos={setTotalGastos}
                currentDate={currentDate}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default TusGastos;

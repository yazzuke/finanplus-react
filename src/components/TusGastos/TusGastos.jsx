import React, { useState, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import CardGastosFijos from "./components/CardGastosFijos/CardGastosFijos.jsx";
import CardGastosCC from "./components/CardGastosCC/CardGastosCC.jsx";

function TusGastos({ userId, setTotalGastos }) {
  const [gastos, setGastos] = useState([]);
  const [nuevoGasto, setNuevoGasto] = useState({ categoria: "", monto: "" });
  const [cards, setCards] = useState([]);
  const carouselRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [nuevaTarjeta, setNuevaTarjeta] = useState({
    nombreTarjeta: "",
    fechaPago: "",
    nombreGastoFijo: "",
  });

  const [tarjetas, setTarjetas] = useState([]);
  const [gastosFijos, setGastosFijos] = useState([]);
  const [tipoTarjeta, setTipoTarjeta] = useState("");

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
    // Asegúrate de validar que los campos requeridos estén llenos
    let url;
    let data;

    if (tipoTarjeta === "gastosCC") {
      url = `http://localhost:8080/usuarios/${userId}/tarjetascredito`;
      data = {
        nombreTarjeta: nuevaTarjeta.nombreTarjeta,
        fechaPago: nuevaTarjeta.fechaPago,
      };
    } else if (tipoTarjeta === "gastosFijos") {
      url = `http://localhost:8080/usuarios/${userId}/gastosfijos`; 
      data = {
        nombreGasto: nuevaTarjeta.nombreGastoFijo,
       
      };
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
        console.log("Tarjeta/Gasto fijo agregado con éxito:", data);
        // Actualiza el estado según sea necesario
        setShowForm(false);
        setNuevaTarjeta({ nombreTarjeta: "", fechaPago: "" }); // Resetear el estado según sea necesario
      })
      .catch((error) => {
        console.error("Error al enviar la tarjeta/gasto fijo:", error);
      });
  };

  // Función para obtener las tarjetas de crédito del usuario
  const obtenerTarjetas = () => {
    const url = `http://localhost:8080/usuarios/${userId}/tarjetascredito`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => {
        setTarjetas(data); // Actualiza el estado con las tarjetas obtenidas
      })
      .catch((error) => {
        console.error("Error al obtener tarjetas:", error);
      });
  };

  // Función para obtener los gastos fijos del usuario
  const obtenerGastosFijos = () => {
    const url = `http://localhost:8080/usuarios/${userId}/gastosfijos`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los gastos fijos");
        }
        return response.json();
      })
      .then((data) => {
        setGastosFijos(data);
      })
      .catch((error) => {
        console.error("Error al obtener gastos fijos:", error);
      });
  };

  

  useEffect(() => {
    obtenerTarjetas();
    obtenerGastosFijos();
  }, [userId]); // Asegúrate de que la función se llame nuevamente si el userId cambia

  return (
    <div className="mt-[110px] ml-1 bg">
      <div className="flex items-center">
        <span className="text-3xl font-bold">Tus Gastos</span>
        <IconButton
          onClick={handleAgregarGasto}
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
        {showForm && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <select
                value={tipoTarjeta}
                onChange={(e) => setTipoTarjeta(e.target.value)}
                className="border p-2 rounded mb-2 w-full"
              >
                <option value="">Selecciona un tipo de tarjeta...</option>
                <option value="gastosCC">Tarjeta de Crédito</option>
                <option value="gastosFijos">Gastos Fijos</option>
              </select>

              {tipoTarjeta === "gastosCC" && (
                <>
                  <input
                    type="text"
                    placeholder="Nombre de la Tarjeta"
                    name="nombreTarjeta"
                    value={nuevaTarjeta.nombreTarjeta}
                    onChange={handleChange}
                    className="border p-2 rounded mb-2 w-full"
                  />
                  <input
                    type="date"
                    placeholder="Fecha de Pago"
                    name="fechaPago"
                    value={nuevaTarjeta.fechaPago}
                    onChange={handleChange}
                    className="border p-2 rounded mb-2 w-full"
                  />
                </>
              )}

              {tipoTarjeta === "gastosFijos" && (
                <>
                  {/* Aquí puedes agregar los campos específicos para Gastos Fijos */}
                  {/* Por ejemplo: */}
                  <input
                    type="text"
                    placeholder="Nombre del Gasto Fijo"
                    name="nombreGastoFijo"
                    value={nuevaTarjeta.nombreGasto} // Asegúrate de manejar este estado adecuadamente
                    onChange={handleChange}
                    className="border p-2 rounded mb-2 w-full"
                  />
                  {/* Agrega más campos según sea necesario */}
                </>
              )}

              <div className="flex justify-end mt-4">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSubmit}
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        )}

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
          <div key={`tarjeta-${index}`} className={index > 0 ? "ml-8" : ""}>
            <CardGastosCC tarjeta={tarjeta} userId={userId} actualizarTotalGastos={setTotalGastos} />
          </div>
        ))}

        {/* Renderiza gastos fijos */}
        {gastosFijos.map((gastoFijo, index) => (
          <div
            key={`gastoFijo-${index}`}
            className={(index > 0 || tarjetas.length > 0) ? "ml-8" : ""}>

            <CardGastosFijos gastoFijo={gastoFijo} userId={userId} actualizarTotalGastos={setTotalGastos} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TusGastos;

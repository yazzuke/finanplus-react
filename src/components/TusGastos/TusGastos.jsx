import React, { useState, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CardGastosCC from "./components/CardGastosCC";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { Card } from "@mui/material";
import CardGastosFijos from "./components/CardGastosFijos";

function TusGastos({ userId }) {
  const [gastos, setGastos] = useState([]);
  const [nuevoGasto, setNuevoGasto] = useState({ categoria: "", monto: "" });
  const [cards, setCards] = useState([]);
  const carouselRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [nuevaTarjeta, setNuevaTarjeta] = useState({
    nombreTarjeta: "",
    fechaPago: "",
    valorTotal: 0,
  });

  const [tarjetas, setTarjetas] = useState([]);

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


  // handleSubmit es la función que se ejecuta cuando se envía el formulario
  const handleSubmit = () => {
    console.log("Tarjeta enviada:", nuevaTarjeta);
    const url = `http://localhost:8080/usuarios/${userId}/tarjetascredito`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
     
      },
      body: JSON.stringify({
        nombreTarjeta: nuevaTarjeta.nombreTarjeta,
        fechaPago: nuevaTarjeta.fechaPago,
        valorTotal: parseFloat(nuevaTarjeta.valorTotal),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Tarjeta agregada con éxito:", data);
        setTarjetas([...tarjetas, data]);
        setShowForm(false); 
        setNuevaTarjeta({ nombreTarjeta: "", fechaPago: "", valorTotal: 0 }); 
      })
      .catch((error) => {
        console.error("Error al enviar la tarjeta:", error);
      });
  };

  const obtenerTarjetas = () => {
    const url = `http://localhost:8080/usuarios/${userId}/tarjetascredito`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(data => {
        setTarjetas(data); // Actualiza el estado con las tarjetas obtenidas
      })
      .catch(error => {
        console.error('Error al obtener tarjetas:', error);
      });
  };
  
useEffect(() => {
  obtenerTarjetas();
}, [userId]); // Asegúrate de que la función se llame nuevamente si el userId cambia



  return (
    <div className="mt-[110px] ml-4">
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
              <input
                type="text"
                placeholder="Valor Total"
                name="valorTotal"
                value={nuevaTarjeta.valorTotal}
                onChange={handleChange}
                className="border p-2 rounded mb-2 w-full"
              />
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
          <div key={index}  className={`flex-none ${index !== 0 ? "ml-8" : ""}`} >
            <CardGastosCC key={index} tarjeta={tarjeta} userId={userId} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TusGastos;

import React, { useState, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PerfectScrollbar from "perfect-scrollbar";

import "perfect-scrollbar/css/perfect-scrollbar.css";

function TusIngresos({ userId }) {
  const [ingresos, setIngresos] = useState([]);

  const obtenerIngresos = () => {
    if (userId) {
      fetch(`http://localhost:8080/usuarios/${userId}/ingresos`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setIngresos(data); // Establece los ingresos con los datos obtenidos
        })
        .catch(error => {
          console.error('Error al obtener ingresos:', error);
        });
    }
  };

  useEffect(() => {
    obtenerIngresos(); // Obtener ingresos cuando el componente se monta
  }, [userId]);

  console.log("userId", userId);

  const [showForm, setShowForm] = useState(false);
  const [nuevoIngreso, setNuevoIngreso] = useState({ concepto: "", monto: "" });

  const agregarIngreso = () => {
    if (nuevoIngreso.concepto && nuevoIngreso.monto && userId) {
      // Asegúrate de validar que userId no sea nulo
      fetch(`http://localhost:8080/usuarios/${userId}/ingresos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Aquí añadirías headers adicionales si necesitas enviar un token de autenticación, etc.
        },
        body: JSON.stringify({
          concepto: nuevoIngreso.concepto,
          monto: parseFloat(nuevoIngreso.monto),
        }),
      })
      .then(response => response.json())
      .then(data => {
        setIngresos(ingresos.concat(data)); // Agregar el nuevo ingreso a la lista
        setNuevoIngreso({ concepto: "", monto: "" }); // Resetea el formulario
        setShowForm(false); // Oculta el formulario
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  };


  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const ps = new PerfectScrollbar(containerRef.current);
      containerRef.current.style.position = "relative";
      return () => ps.destroy();
    }
  }, []);

  return (
    <div className="flex justify-end mt-[-3rem] mr-2">
      <div className="w-[250px]">
        <div className="flex justify-between items-center mb-4">
          <IconButton
            onClick={() => setShowForm(!showForm)}
            color="primary"
            aria-label="add"
            style={{
              borderRadius: "50%",
              background: "white",
              padding: "0.2rem",
              left: "35px",
              top: "2px",
            }}
          >
            <AddIcon />
          </IconButton>
          <span className="text-3xl font-bold">Tus Ingresos</span>
        </div>
        {showForm && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <input
                type="text"
                placeholder="Concepto"
                className="border p-2 rounded mb-2 w-full"
                value={nuevoIngreso.concepto}
                onChange={(e) =>
                  setNuevoIngreso({ ...nuevoIngreso, concepto: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Monto"
                className="border p-2 rounded mb-2 w-full"
                value={nuevoIngreso.monto}
                onChange={(e) =>
                  setNuevoIngreso({ ...nuevoIngreso, monto: e.target.value })
                }
              />
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                onClick={agregarIngreso}
              >
                Agregar
              </button>
            </div>
          </div>
        )}

        <div
          className="max-h-[300px] w-[190px] overflow-hidden rounded-lg shadow pr-3  bg-slate-800"
          style={{
            left: "59px",
          }}

          ref={containerRef}
        >
          {ingresos.map((ingreso, index) => (
            <div
              key={index}
              className="flex justify-end items-center py-[-2rem]"
            >
              <div className="flex flex-col items-end">
                <span className="text-xl font-bold">{ingreso.concepto}</span>
                <div className="w-[160px] flex justify-between bg-[#302d2d] rounded-full p-1 shadow-md mt-1 ">
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    style={{
                      borderRadius: "50%",
                      background: "white",
                      padding: "0.1rem",
                      left: "5px",
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <span className="text-xl mr-1">
                  ${ingreso.monto ? ingreso.monto.toLocaleString() : '0'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TusIngresos;

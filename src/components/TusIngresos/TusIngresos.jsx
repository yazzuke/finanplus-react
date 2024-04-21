import React, { useState, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PerfectScrollbar from "perfect-scrollbar";
import ModalEditarBorrarIngreso from "./ModalEditarBorrarIngreso";
import ModalAgregarIngreso from "./ModalAgregarIngreso";

import "perfect-scrollbar/css/perfect-scrollbar.css";
import { Modal } from "@nextui-org/react";

function TusIngresos({ userId, currentDate }) {
  const [ingresos, setIngresos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoIngreso, setNuevoIngreso] = useState({ concepto: "", monto: "" });
  const containerRef = useRef(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [ingresoParaEditar, setIngresoParaEditar] = useState(null); // Agrega este estado

  const obtenerIngresos = () => {
    if (userId) {
      fetch(`http://localhost:8080/usuarios/${userId}/ingresos`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setIngresos(data); // Establece los ingresos con los datos obtenidos
        })
        .catch((error) => {
          console.error("Error al obtener ingresos:", error);
        });
    }
  };

  useEffect(() => {
    obtenerIngresos(); // Obtener ingresos cuando el componente se monta
  }, [userId]);

  useEffect(() => {
    if (userId && currentDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // JavaScript cuenta los meses desde 0

      // Actualiza la URL con los parámetros correctos para filtrar por año y mes
      const url = `http://localhost:8080/usuarios/${userId}/ingresos/fecha?year=${year}&month=${month}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setIngresos(data); // Actualiza el estado con los ingresos del mes seleccionado
        })
        .catch((error) => {
          console.error("Error al obtener ingresos:", error);
        });
    }
  }, [userId, currentDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoIngreso((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!nuevoIngreso.concepto || !nuevoIngreso.monto) {
      console.error("El concepto y el monto son obligatorios");
      return;
    }

    const url = `http://localhost:8080/usuarios/${userId}/ingresos`;
    const body = {
      concepto: nuevoIngreso.concepto,
      monto: parseFloat(nuevoIngreso.monto),
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setIngresos((prev) => [...prev, data]);
        setNuevoIngreso({ concepto: "", monto: "" }); // Resetea el formulario
        setShowModal(false); // Cierra el modal
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEditClick = (ingreso) => {
    setIngresoParaEditar(ingreso); // Establecer el ingreso seleccionado para editar
    setShowEditModal(true); // Mostrar el modal de edición
  };

  useEffect(() => {
    if (containerRef.current) {
      const ps = new PerfectScrollbar(containerRef.current);
      containerRef.current.style.position = "relative";
      return () => ps.destroy();
    }
  }, []);

  return (
    <div className="flex justify-end mt-[-2.4rem] mr-2">
      <div className="w-[250px]">
        <div className="flex justify-between items-center mb-4">
          <IconButton
            onClick={() => setShowModal(true)}
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
        {showModal && (
          <ModalAgregarIngreso
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            nuevoIngreso={nuevoIngreso}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        )}
        {showEditModal && (
          <ModalEditarBorrarIngreso
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setIngresoParaEditar(null); 
            }}
            ingreso={ingresoParaEditar} 
          />
        )}
        <div
          className="max-h-[300px] w-[190px] overflow-hidden rounded-lg shadow pr-3  "
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
                    onClick={() => handleEditClick(ingreso)}
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
                    ${ingreso.monto ? ingreso.monto.toLocaleString() : "0"}
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

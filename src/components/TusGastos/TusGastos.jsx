import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CardGastos from "./components/CardGastos";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { Card } from "@mui/material";

function TusGastos({ userId }) {
  const [showForm, setShowForm] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [nuevoGasto, setNuevoGasto] = useState({ categoria: "", monto: "" });

  const handleAgregarGasto = () => {
    // Aquí normalmente enviarías la información al backend
    // Pero para este ejemplo, simplemente vamos a añadir el gasto al estado local
    setGastos([...gastos, nuevoGasto]);
    setNuevoGasto({ categoria: "", monto: "" }); // Resetea el formulario
    setShowForm(false); // Oculta el formulario
  };

  return (
    <div className="mt-28 ml-4">
      <div className="flex items-center">
        <span className="text-3xl font-bold">Tus Gastos</span>
        <IconButton
          onClick={() => setShowForm(!showForm)}
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
      </div>
       <CardGastos />
      </div>
    
  );
}

export default TusGastos;

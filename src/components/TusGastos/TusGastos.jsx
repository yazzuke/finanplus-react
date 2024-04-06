import React, { useState,useRef  } from "react";
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
  const [showForm, setShowForm] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [nuevoGasto, setNuevoGasto] = useState({ categoria: "", monto: "" });
  const [cards, setCards] = useState([]);
  const carouselRef = useRef(null);

  const handleAgregarGasto = () => {
    const cardStyle = cards.length === 0 ? "" : "ml-8"; 
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
      style={{ scrollBehavior: 'smooth' }}
    >
       {cards.map((card, index) => (
        <div key={index} className="flex-none"> 
          {card}
        </div>
      ))}
    </div>
    </div>
  );
}

export default TusGastos;

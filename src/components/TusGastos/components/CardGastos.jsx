import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PerfectScrollbar from "perfect-scrollbar";

export default function App() {
  return (
    <Card className="dark max-w-[460px] h-[326px] mt-2">
      <CardHeader className="flex gap-3">
        <span className="text-lg font-bold">Tarjeta de Credito </span>
        {/* Este es un botón para editar la card */}
        <IconButton
          color="primary"
          aria-label="edit"
          style={{
            borderRadius: "50%",
            background: "white",
            padding: "0.1rem",
            left: "90px",
          }}
        >
          <EditIcon />
        </IconButton>
        {/* Este es un botón para sumar mas gastos. */}
        <IconButton
          color="primary"
          aria-label="edit"
          style={{
            borderRadius: "50%",
            background: "white",
            padding: "0.1rem",
            left: "90px",
          }}
        >
          <AddIcon />
        </IconButton>
      </CardHeader>
      <Divider />
      <p className="text-base ml-2 font-medium">Nombre</p> 
      <Divider />
      {/* Este es un botón para editar */}
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
     
 
    </Card>
  );
}

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Avatar,
  Button,
  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu
} from "@nextui-org/react";
import { useUser } from "../../context/FinalContex";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// cuando una persona s elogea y esta en x componente, lo unico que necesita es lo que esta en la 23 y 24

export default function NavBar({ usuario }) {
  // Hook de navegación
  const navigate = useNavigate();
  const { logoutUser, user } = useUser();


  const Cache = localStorage.getItem("user"); // va ser el email
  const Datos = JSON.parse(Cache);
  // console.log("Datos", Datos);


  // Función para cerrar sesión
  const handleLogout = async () => {
    localStorage.removeItem("user"); // Elimina el usuario del localStorage
    logoutUser(); // Llama a la función de logoutuser del contexto
    console.log("Usuario cerró sesión");
    navigate("/login"); // Redirige al usuario a la página de inicio
  };

  //console.log(Datos.id)
  //console.log(Datos)



  return (
    <Navbar>
      <NavbarBrand style={{ position: "relative", right: "452px" }}>
        <Avatar
          isBordered
          className="transition-transform"
          color="primary"
          size="lg"
          style={{ width: "50px", height: "50px" }}
          src={Datos ? Datos.photo_url : "https://i.pravatar.cc/300"}
        />
        <NavbarBrand style={{ position: "relative", left: "15px" }}>
          <Link color="foreground" href="#">
            Bienvenido de nuevo, {Datos ? Datos.nombre : "Features"}
          </Link>
        </NavbarBrand>
      </NavbarBrand>
      <NavbarBrand style={{ position: "relative", left: "0px" }}>
        <NavbarItem isActive>
          <Link href="/home" color="foreground">
            Finanzas
          </Link>
        </NavbarItem>
        <NavbarItem style={{ marginLeft: "20px" }}>
          <Link href="/resumen" color="foreground">
            Resumen
          </Link>

        </NavbarItem>
      </NavbarBrand>
      <NavbarContent justify="">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            onClick={handleLogout}
          >
            Cerrar Sesion
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}



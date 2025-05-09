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
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemeSwitcher from '../../components/ThemeToggle/ThemeToggle';
import ModalCambiarInformacion from "./ModalCambiarInformacion";



// cuando una persona s elogea y esta en x componente, lo unico que necesita es lo que esta en la 23 y 24

export default function NavBar({ usuario }) {
  // Hook de navegación
  const navigate = useNavigate();
  const { logoutUser, user } = useUser();
  const { theme } = useTheme();
  const [isOpenModal, setIsOpenModal] = useState(false); 

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

    // Función para abrir el modal
    const openModal = () => {
      setIsOpenModal(true);
    };
  
    // Función para cerrar el modal
    const closeModal = () => {
      setIsOpenModal(false);
    };
  


  return (
    <Navbar className={`bg-${theme === 'light' ? 'white' : 'black'} text-${theme === 'light' ? 'black' : 'white'} `} style={{ backgroundColor: theme === 'light' ? '#DFDFDE' : '#232323'   }}>
      <NavbarBrand style={{ position: "relative", right: "452px" }}>
      <Dropdown placement="bottom-end">
          <DropdownTrigger>
        <Avatar
          isBordered
          className="transition-transform"
          color="primary"
          size="lg"
          style={{ width: "50px", height: "50px" }}
          src={Datos ? Datos.photo_url : "https://i.pravatar.cc/300"}
        />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" className={`bg-${theme === 'light' ? 'white' : 'black'} text-${theme === 'light' ? 'black' : 'white'} `} style={{ backgroundColor: theme === 'light' ? '' : ''   }}>
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Iniciaste sesion</p>
              <p className="font-semibold">{Datos.email}</p>
            </DropdownItem>
            <DropdownItem key="settings"  onClick={openModal}>Cambiar Informacion</DropdownItem>
            <DropdownItem key="team_settings">Como usar Finanplus</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarBrand className={`text-${theme === 'light' ? '#0000' : 'black'} `} style={{  position: "relative", left: "15px"    }}>
          <Link className={`text-${theme === 'light' ? '#black' : 'white'} `} >
            Bienvenido de nuevo, {Datos ? Datos.nombre : "Features"}
          </Link>
        </NavbarBrand>
      </NavbarBrand>
      <NavbarBrand style={{ position: "relative", left: "0px" }}>
        <NavbarItem isActive>
          <Link href="/home"  className={`text-${theme === 'light' ? '#black' : 'white'} `} >
            Finanzas
          </Link>
        </NavbarItem>
        <NavbarItem  isActive   style={{ marginLeft: "20px" }}>
          <Link href="/resumen" className={`text-${theme === 'light' ? '#black' : 'white'} `} >
            Resumen
          </Link>

        </NavbarItem>
      </NavbarBrand>
      <NavbarContent justify="">
      <NavbarItem  style={{ position: "relative", left: "400px" }}>
          <ThemeSwitcher /> {/* Aquí agregamos el ThemeSwitcher */}
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            onClick={handleLogout}
            style={{ position: "relative", left: "450px" }}
          >
            Cerrar Sesion
          </Button>
        </NavbarItem>
      </NavbarContent>
      <ModalCambiarInformacion isOpen={isOpenModal} onClose={closeModal} nombreUsuario={Datos ? Datos.nombre : ""} userId={Datos ? Datos.id: ""} />
    </Navbar>
    
  );
}



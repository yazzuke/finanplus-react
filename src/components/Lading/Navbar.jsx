import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import ThemeSwitcher from '../../components/ThemeToggle/ThemeToggle';
import { useTheme } from "next-themes";
import Logo from '../../assets/FinanplusLogo.png';

export default function App() {
  const { theme } = useTheme();

  return (
    <Navbar shouldHideOnScroll className={`bg-${theme === 'light' ? 'white' : 'black'} text-${theme === 'light' ? 'black' : 'white'} `} style={{ backgroundColor: theme === 'light' ? '#DFDFDE' : '#232323'   }}>
      <NavbarBrand style={{ position: "relative", right: "452px" }}>
      <img src={Logo} alt="Finanplus Logo" className="h-14 w-auto mr-3 " />
        <p className="font-bold text-inherit text-2xl">Finanplus</p>
      </NavbarBrand>
  
      <NavbarContent >
      <NavbarItem  style={{ position: "relative", left: "550px" }}>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/login" variant="flat"  style={{ position: "relative", left: "570px" }}>
            Inicia sesion o Crea una cuenta
          </Button>
        </NavbarItem>
 
      </NavbarContent>
    </Navbar>
  );
}

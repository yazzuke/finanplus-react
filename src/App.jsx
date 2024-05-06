import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Resumen from './pages/Resumen/Resumen';
import Password from './pages//Login/Password'
import { AuthProvider } from './context/AuthContext';
import ContextProvider from './context/FinalContex';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';


function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const navigate = useNavigate();
  // Estado de autenticación
  const [si, setNo] = useState(false);

  // useEffect que verfica si el usuario está autenticado
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setNo(true);
    } else {
      // Si no hay usuario autenticado, redirigir a la página de inicio de sesión
      navigate('/login');
    }
  }, [navigate]);


  return (
    <NextUIProvider navigate={navigate}>
        <NextThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <ContextProvider>
          <ToastContainer />
          <Routes>
            <Route index path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<Password />} />

            {/* rutas protegidas */}
            {/* si hay usario en cache ir a home de lo contrario devolver a login */}
            {si ? <Route path="/home" element={<Home />} /> : <Route path="/" element={<Login />} />}
            {si ? <Route path="/resumen" element={<Resumen />} /> : <Route path="/" element={<Login />} />}


            {/* Si no existe la ruta  */}
            <Route path="*" element={<Login />} />




          </Routes>
        </ContextProvider>
      </AuthProvider>
      </NextThemeProvider>
    </NextUIProvider>
  );
}

export default AppWrapper;
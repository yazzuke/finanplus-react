// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Resumen from './pages/Resumen/Resumen';
import { AuthProvider } from './context/AuthContext';
import ContextProvider from './context/FinalContex';
import { ToastContainer } from 'react-toastify';

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <AuthProvider>
        <ContextProvider>
          <ToastContainer />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/resumen" element={<Resumen />} />
          </Routes>
        </ContextProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}

export default AppWrapper;

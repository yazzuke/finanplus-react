import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useAuth } from "../../context/AuthContext.jsx"; // Importa el hook useAuth
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redireccionar

function Password() {
  const { resetPassword } = useAuth(); // Obtén la función resetPassword del contexto de autenticación
  const navigate = useNavigate(); // Instancia useNavigate

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      await resetPassword(email);
      toast.success("Se ha enviado un correo para restablecer tu contraseña", {
        onClose: () => navigate("/login") // Redirecciona al usuario a la página de login cuando el toast se cierre
      });
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error.message);
      toast.error("Error al restablecer la contraseña. Por favor, intenta nuevamente.");
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[980px] h-[460px] dark px-20 py-6 shadow-xl ring-1 ring-gray-900/5 rounded-3xl sm:px-24 bg-[#1C1C1C]">
        <ToastContainer />
        <div className="text-center" style={{ position: "relative", left: "-240px", top: "135px" }}>
          <h1 className="text-3xl font-semibold text-white whitespace-nowrap">Recupera tu contraseña</h1>
          <p className="mt-2 text-sm text-white">Ingresa tu Correo <br></br> Enviaremos un correo para que recuperes tu contraseña</p>
        </div>
        <div className="flex w-6/12 flex-wrap md:flex-nowrap gap-4 mx-6" style={{ position: "relative", top: "60px", left: "420px" }}>
          <Input type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mt-20" style={{ position: "relative", top: "40px", left: "555px" }}>
          <Button color="primary" variant="flat" type="button" onClick={handleResetPassword} disabled={isLoading}>
            {isLoading ? "Enviando..." : "Recuperar contraseña"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Password;

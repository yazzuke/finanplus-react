import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../Login//EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Login/EyeSlashFilledIcon";
import { useAuth } from "../../context/AuthContext.jsx"; // Importa el hook useAuth
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPeople() {
  const { register,registerUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRegisterEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRegisterPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const notifyErrorRegistro = () => toast("El correo del usuario ya se encuentra registrado");
  const notifyRegistroComplete = () => toast("Usuario registrado correctamente");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await register(email, password);    
      console.log("Usuario registrado correctamente");
      console.log(email, password);
      if (userCredential && userCredential.user) {
        registerUser(userCredential.user.uid, userCredential.user.email, name, password); // Usa registerUser del contexto
        notifyRegistroComplete();
        setTimeout(() => {
          window.location.href = "/login";
        }
        , 3000);
      } else {
        console.error('userCredential is undefined or does not have a user property');
      }
    } catch (error) {
      notifyErrorRegistro();
      console.error("Error al registrar el usuario");
    }
  };


  


  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[990px] h-[400px] dark items-center bg-stone-950 px-20 py-6 shadow-xl ring-1 ring-gray-900/5 rounded-3xl sm:px-24">
      <ToastContainer />
        <form onSubmit={handleRegister}>
          <div
            className="text-center "
            style={{ position: "relative", left: "-240px", top: "135px" }}
          >
            <h1 className="text-3xl font-semibold  text-white whitespace-nowrap">
              Registrate
            </h1>
            <p className="mt-2 text-gray-500">P</p>
          </div>
          <div
            className="flex w-6/12 flex-wrap md:flex-nowrap gap-4 mx-6 "
            style={{ position: "relative", top: "-50px", left: "420px" }}
          >
            <Input type="Nombre" label="Nombre"  value={name} onChange={handleNameChange} />
          </div>
          <div
            className="flex w-6/12 flex-wrap md:flex-nowrap gap-4 mx-6 "
            style={{ position: "relative", top: "-30px", left: "420px" }}
          >
            <Input
              type="Email"
              label="Email"
              isRequired
              value={email}
              onChange={handleRegisterEmailChange}
              isInvalid={!email.includes("@") && email.length > 0}
            />
          </div>
          <div //inicio de la contraseña
            className="flex w-6/12 flex-wrap md:flex-nowrap gap-4 mx-6 "
            style={{ position: "relative", top: "-10px", left: "420px" }}
          >
            <Input
              label="Contraseña"
              value={password}
              minLength={6}
              isInvalid={password.length < 6}
              isRequired
              onChange={handleRegisterPasswordChange}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
          </div>
          <div //inicio de la contraseña
            className="flex w-6/12 flex-wrap md:flex-nowrap gap-4 mx-6 "
            style={{ position: "relative", top: "10px", left: "420px" }}
          >
            <Input
              label="Confirma tu contraseña"
              isRequired
              value={rePassword}
              minLength={6}
              isInvalid={password !== rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
          </div>
          <div
            className="mt-20"
            style={{ position: "relative", top: "-50px", left: "595px" }} //boton de registro
            data-testid="register-button"
          >
            <Button color="primary" variant="faded" type="submit">
              {" "}
              Crear cuenta{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPeople;

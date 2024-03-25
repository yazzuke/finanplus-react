import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { useAuth } from "../../context/AuthContext.jsx"; // Importa el hook useAuth
import { GoogleIcon } from "../../assets/GoogleIcon.jsx"; // Importa el componente GoogleIcon
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { Image } from "@nextui-org/react";

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { Login } = useAuth();

  const auth = useAuth();
  const [displayName, setDisplayName] = useState("auth.user.displayName");
  const [email, setEmail] = useState("auth.user.email");
  // datos del login
  const [LoginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerUser } = useAuth();

  useEffect(() => {
    if (auth.user) {
      setDisplayName(auth.user.displayName);
      setEmail(auth.user.email);
    }
  }, [auth.user]);

  const handleLoginEmail = (e) => {
    setLoginEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await Login(LoginEmail, password);
      console.log("Usuario logueado correctamente");
    } catch (error) {
      console.error("Error al iniciar sesion", error);
    }
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Usuario logueado con Google", result.user);
      if (result.user) {
        await registerUser(result.user.uid, result.user.email, result.user.displayName, null);
      } else {
        console.error('signInWithPopup se resolvió sin un usuario');
      }
    } catch (error) {
      console.error("Error al iniciar sesion con Google", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[980px] h-[460px] dark items-center bg-stone-950 px-20 py-6 shadow-xl ring-1 ring-gray-900/5 rounded-3xl sm:px-24">
        <form onSubmit={handleLogin}>
          <div
            className="text-center "
            style={{ position: "relative", left: "-240px", top: "135px" }}
          >
            <h1 className="text-3xl font-semibold  text-white whitespace-nowrap">
              Inicia Sesion
            </h1>
            <p className="mt-2 text-gray-500">Analiza tus finanzas</p>
          </div>
          <div
            className="flex w-6/12 flex-wrap md:flex-nowrap gap-4 mx-6 "
            style={{ position: "relative", top: "0px", left: "420px" }}
          >
            <Input
              type="email"
              label="Email"
              value={LoginEmail}
              onChange={handleLoginEmail}
            />
          </div>
          <div //inicio de la contraseña
            className="flex w-6/12 flex-wrap md:flex-nowrap gap-4 mx-6 "
            style={{ position: "relative", top: "50px", left: "420px" }}
          >
            <Input
              value={password}
              onChange={handlePassword}
              label="Contraseña"
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
            className="m-1"
            style={{ position: "relative", top: "50px", left: "440px" }}
          >
            <a href="#" className="text-white">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div
            className="m-1"
            style={{ position: "relative", top: "95px", left: "500px" }}
          >
            <a href="/register" className="text-white  ">
              Crea una Cuenta
            </a>
          </div>
          <div
            className="mt-20"
            style={{ position: "relative", top: "-15px", left: "670px" }}
          >
            <Button color="primary" variant="faded" type="submit">
              {" "}
              Iniciar Sesion{" "}
            </Button>

            <Button
              className="text-white border-2 border-white"
              style={{
                position: "relative",
                top: "70px",
                right: "250px",
                borderColor: "white",
              }}
              color="danger"
              variant="bordered"
              startContent={<GoogleIcon />}
              onClick={handleGoogleLogin}
            >
              Inicia sesion con Google
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

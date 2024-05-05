import React, { useState, useEffect } from "react";
import { Input, user } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { useAuth } from "../../context/AuthContext.jsx"; // Importa el hook useAuth
import { GoogleIcon } from "../../assets/GoogleIcon.jsx"; // Importa el componente GoogleIcon
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { json, useNavigate } from "react-router-dom";
import { useUser } from "../../context/FinalContex.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Image } from "@nextui-org/react";

function Login() {
  // contexto de usuario
  const { loginUser } = useUser();
  // Hook de autenticación
  const [isVisible, setIsVisible] = useState(false);
  // Función para mostrar u ocultar la contraseña
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { Login } = useAuth();
  const navigate = useNavigate();
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

  const handleLoginSuccess = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await Login(LoginEmail, password);

      //console.log("Usuario logueado correctamente");
      // navigate('/home'); // Redirige al usuario a la página de inicio
      // Busca por el email en la base de datos todos los datos de usuario
      //mediante un Endpoint y lo guarda en el contexto
      const response = await fetch(
        `http://localhost:8080/usuarios/email/${LoginEmail}`
      );
      const data = await response.json();
      loginUser(data);
      if (response.ok) {
        handleLoginSuccess(data);
        // console.log("Usuario logueado correctamente", loginUser(data));
        toast.success("Usuario logueado correctamente", {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/home"); // Redirige al usuario a la página de inicio
      } else {
        console.error("handleLogin se resolvió sin datos");
        toast.success("Error al iniciar sesion", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesion", error);
    }
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Revisa si el usuario ya está en tu base de datos
      let response = await fetch(`http://localhost:8080/usuarios/email/${result.user.email}`);
      if (response.ok) {
        // Si el usuario existe, obtiene sus datos y procede con el login
        const data = await response.json();
        loginUser(data); // loginUser debería ser una función de tu contexto de usuario
        handleLoginSuccess(data);
        toast.success("Usuario logueado correctamente", {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/home");
      } else if (response.status === 404) {
        // Si el usuario no existe, entonces llamas a registerUser
        const newUser = {
          id: result.user.uid,
          nombre: result.user.displayName,
          email: result.user.email,
          photo_url: result.user.photoURL,
        };
        // Registra al usuario usando la función de tu contexto
        await registerUser(newUser.id, newUser.email, newUser.nombre, null, newUser.photo_url);
        // Luego de registrar, debes loguear al usuario en tu app
        loginUser(newUser); // loginUser debería ser una función de tu contexto de usuario
        handleLoginSuccess(newUser);
        toast.success("Usuario registrado y logueado correctamente", {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/home");
      } else {
        // Otro tipo de error
        throw new Error('No se pudo obtener información del usuario.');
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google", error);
      toast.error(`Error al iniciar sesión con Google: ${error.message}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  

  // para navegar con persistencia
  useEffect(() => {
    const StorageUserData = localStorage.getItem("user");

    if (StorageUserData) {
      loginUser(JSON.parse(StorageUserData));
      console.log("Usuario logeado anteriormente", user);
      console.log("Navego a home");
      navigate("/home");
    }
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[980px] h-[460px] dark px-20 py-6 shadow-xl ring-1 ring-gray-900/5 rounded-3xl sm:px-24 bg-[#1C1C1C]">
        <ToastContainer />
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
            <a href="/forgotpassword" className="text-white">
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
            className="mt-20 text-white"
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

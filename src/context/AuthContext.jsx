import { auth } from "../firebase/Firebase.config";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

// importamos la funcion de firebase auth
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";

// Reestablecer password
const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

// context
export const AuthContext = createContext();
// console.log("AuthContext", AuthContext);

// hook para acceder al contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

// componente que provee el contexto de autenticacion

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const Register = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("Usuario no autenticado");
      } else {
        setUser(user);
      }
    });

    return () => Register();
  }, []);

  // funcion para registrar un usuario manual
  const register = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Usuario registrado", response.user);
    }



  // funcion para iniciar sesion
  const Login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuario autenticado", response.user);
  };

  // funcion para iniciar sesion con google
  const LoginGoogle = async () => {
    const responseGoogle = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, responseGoogle);
    console.log(
      "Usuario autenticado con google",
      response.user.displayName,
      response.user.email
    );
    // registerUser(response.user.displayName,response.user.email);
    return response;
  };

  // obtener usuario y lo envia a la base de datos
  const registerUser = async (displayName, email) => {
    console.log("Usuario registrado", displayName, email);
  };

  // funcion para cerrar sesion
  const Logout = async () => {
    await signOut(auth);
    console.log("Usuario cerrado");
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        Login,
        LoginGoogle,
        Logout,
        resetPassword,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

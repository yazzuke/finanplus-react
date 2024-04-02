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
   setPersistence, 
   browserSessionPersistence,
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
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const Register = onAuthStateChanged(auth, (user) => {
          if (!user) {
            console.log("Usuario no autenticado");
          } else {
            setUser(user);
          }
        });

        return () => Register();
      })
      .catch((error) => {
        console.error("Error al configurar la persistencia de la sesión", error);
      });
  }, []);



// funcion para registrar un usuario manual
const register = async (email, password) => {
  const response = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  console.log("Usuario registrado", response.user);
  return response; // Devuelve el objeto userCredential
};



  // funcion para iniciar sesion
  const Login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
   // console.log("Usuario autenticado", response.user);
  };

// funcion para iniciar sesion con google

const LoginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      console.log(
        "Usuario autenticado con google",
        result.user.displayName,
        result.user.email
      );
      await registerUser(result.user.uid, result.user.email, result.user.displayName, result.user.photoURL);
    } else {
      console.error('signInWithPopup se resolvió sin un usuario');
    }
  } catch (error) {
    console.error(error);
  }
};

// obtener usuario y lo envia a la base de datos
const registerUser = async (firebaseUid, firebaseEmail, name, password,photoURL) => {
  console.log("Usuario registrado", name, firebaseEmail);
  // Aquí envías el UID y el correo de Firebase al back-end
  const response = await fetch("http://localhost:8080/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: firebaseUid,
      nombre: name,
      email: firebaseEmail,
      password: password, // Solo incluye password si no es null
      photo_url: photoURL,

    }),
  });
  const data = await response.json();
  if (data) {
    console.log(data);
  } else {
    console.error('registerUser se resolvió sin datos');
  }
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
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );



}

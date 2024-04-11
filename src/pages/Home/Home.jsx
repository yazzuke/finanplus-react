import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar/Navbar";
import SelectorMeses from "../../components/SelectorMeses/SelectorMeses";
import TusIngresos from "../../components/TusIngresos/TusIngresos";
import TusGastos from "../../components/TusGastos/TusGastos";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import  TotalesSumatorias from "../../components/TotalesSumatorias/TotalesSumatorias"; 

const getUserData = async (userId) => {
  const response = await fetch(`http://localhost:8080/usuarios/${userId}`);
  const data = await response.json();
  return data;
};

function Home () {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const auth = getAuth();
  const [totalGastos, setTotalGastos] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserId(firebaseUser.uid);
        getUserData(firebaseUser.uid).then(setUser);
      } else {
        setUserId(null);
        setUser(null);
      }
    });

      // Función para actualizar los ingresos desde TusIngresos
    //  const actualizarIngresos = (nuevosIngresos) => {
       // setIngresos(nuevosIngresos);
    //  };


    return () => unsubscribe();
  }, []);


  return (
    <div className="flex flex-col min-h-screen"> {/* Asegura un mínimo de altura de la pantalla */}
      <NavBar user={user} />
      <div className="flex-grow"> {/* Asegura que este div tome el espacio restante */}
        <div className="mt-4 ml-3 ">
          <SelectorMeses />
          <div className="flex flex-col"> {/* Contenedor para tus ingresos y sumatorias */}
          <TotalesSumatorias userId={userId} totalGastos={totalGastos} />
            <TusIngresos userId={userId} />
          </div>
          <TusGastos userId={userId}  setTotalGastos={setTotalGastos} />
      
        </div>
      </div>
    </div>
  );
}

export default Home;

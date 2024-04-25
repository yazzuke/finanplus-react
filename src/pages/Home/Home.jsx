import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar/Navbar";
import SelectorMeses from "../../components/SelectorMeses/SelectorMeses";
import TusIngresos from "../../components/TusIngresos/TusIngresos";
import TusGastos from "../../components/TusGastos/TusGastos";
import Ahorros from "../../components/Ahorros/Ahorros";
import BolaDeNieve from "../../components/BolaDeNieve/BolaDeNieve";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TotalesSumatorias from "../../components/TotalesSumatorias/TotalesSumatorias";
import Graficos from "../../components/Graficos/Graficos";


const getUserData = async ({ userId }) => {
  const response = await fetch(`http://localhost:8080/usuarios/${userId}`);
  const data = await response.json();
  return data;
};

function Home() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const auth = getAuth();
  const [sumaTotalGastos, setTotalGastos] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserId(firebaseUser.uid);
        getUserData(firebaseUser.uid).then(setUser);
      } else {
        setUserId(null);
        setUser(null);
        console.log(getUserData);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col ">
      <NavBar user={user} />
      <div className="flex-grow overflow-auto">
        <div className="flex justify-between mt-4 ml-3">
          <SelectorMeses currentDate={currentDate} setCurrentDate={setCurrentDate} />
          <TotalesSumatorias userId={userId} totalGastos={sumaTotalGastos} currentDate={currentDate} />
        </div>
        <div className=" absolute min-h-[300px]">
          <Ahorros userId={userId}   currentDate={currentDate} />
          </div>
        <div className="absolute min-h-[300px] ml-[700px]">
          <Graficos userId={userId} />
          
        </div>
        <div className="min-h-[345px]">
          <TusIngresos userId={userId}  currentDate={currentDate} />
        </div>
        <div></div>
        <div className="min-h-[300px] ml-2">
          <div className=" absolute left-[300px] mt-[-25px] ">
            <BolaDeNieve userId={userId} />
          </div>
          <TusGastos userId={userId} setTotalGastos={setTotalGastos} currentDate={currentDate}/>
        </div>
      </div>
    </div>
  );
}

export default Home;

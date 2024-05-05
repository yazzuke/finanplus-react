import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar/Navbar";
import SelectorMeses from "../../components/SelectorMeses/SelectorMeses";
import TusIngresos from "../../components/TusIngresos/TusIngresos";
import TusGastos from "../../components/TusGastos/TusGastos";
import Ahorros from "../../components/Ahorros/Ahorros";
import BolaDeNieve from "../../components/BolaDeNieve/BolaDeNieve";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TotalesSumatorias from "../../components/TotalesSumatorias/TotalesSumatorias";
import Graficos from "../../components/Graficos/Graficos";
import { useAuth } from "../../context/AuthContext";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const auth = getAuth();
  const [sumaTotalGastos, setTotalGastos] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserId(firebaseUser.uid);
      } else {
        setUserId();

      }
    });
    return () => unsubscribe();
  }, []);

 // useEffect(() => {
   // if (!user) {
     // navigate('/login');
  //  }
 //}, [user, navigate]);

  const driverObj = driver({
    showProgress: true,
    steps: [
      { element: '#selector-meses', popover: { title: 'Selector de Meses', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "left", align: 'start' }},
      { element: '#ahorros', popover: { title: 'Sus Ahorros', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "top", align: 'center' }},
      { element: '#graficas', popover: { title: 'Graficas ', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "bottom", align: 'center' }},
      { element: '#gastos', popover: { title: 'Ingresos ', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "left", align: 'start' }},
      { element: '#boladenieve', popover: { title: 'Ingresos ', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "top", align: 'end' }},
    ]
  });

  driverObj.drive();

  return (
    <div className="flex flex-col ">
      <NavBar user={user} />
      <div className="flex-grow overflow-auto">
        <div id="selector-meses" className="flex justify-between mt-4 ml-3">
          <SelectorMeses
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
          <TotalesSumatorias
            userId={userId}
            totalGastos={sumaTotalGastos}
            currentDate={currentDate}
          />
        </div>
        <div id="ahorros" className=" absolute min-h-[300px] mt-2">
          <Ahorros userId={userId} currentDate={currentDate} />
        </div>
        <div id="graficas" className="absolute min-h-[300px] ml-[700px]">
          <Graficos userId={userId} currentDate={currentDate} />
        </div>
        <div id="ingresos" className="min-h-[345px]">
          <TusIngresos userId={userId} currentDate={currentDate} />
        </div>
        <div id="gastos" className="min-h-[300px] ml-2">
          <div id="boladenieve" className=" absolute left-[300px] mt-[-25px] ">
            <BolaDeNieve userId={userId} />
          </div>
          <TusGastos
            userId={userId}
            setTotalGastos={setTotalGastos}
            currentDate={currentDate}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
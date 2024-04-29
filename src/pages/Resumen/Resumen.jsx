import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from "../../components/Navbar/Navbar";
import Graficos from "../../components/Resumen/GraficosMeses";
import Sumatorias from "../../components/Resumen/Sumatorias";
import ResumenMeses from "../../components/Resumen/ResumenMeses";

function Resumen() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const auth = getAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [resumenMensual, setResumenMensual] = useState([]);
  const [gastosFijos, setGastosFijos] = useState([]);
  const [gastosVariables, setGastosVariables] = useState([]);
  const [gastosDiarios, setGastosDiarios] = useState([]);
  const [tarjetasCredito, setTarjetasCredito] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserId(firebaseUser.uid);
        setUser(firebaseUser);
      } else {
        setUserId(null);
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId && currentDate) {
      const year = currentDate.getFullYear();

      // Actualiza la URL con los parámetros correctos para filtrar por año
      const url = `http://localhost:8080/usuarios/${userId}/resumenmensual/totales?year=${year}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setResumenMensual(data); // Actualiza el estado con los datos del año seleccionado
          console.log(data);
        })
        .catch((error) => {
          console.error("Error al obtener resumen mensual:", error);
        });
    }
  }, [userId, currentDate]);

  useEffect(() => {
    if (userId && currentDate) {
      const year = currentDate.getFullYear();

      // Obtener gastos fijos por mes y año
      fetch(
        `http://localhost:8080/usuarios/${userId}/gastosfijos/fecha?year=${year}`
      )
        .then((response) => response.json())
        .then((data) => {
          setGastosFijos(data);
        })
        .catch((error) => {
          console.error("Error al obtener gastos fijos:", error);
        });

      // Obtener gastos variables por mes y año
      fetch(
        `http://localhost:8080/usuarios/${userId}/gastosvariables/fecha?year=${year}`
      )
        .then((response) => response.json())
        .then((data) => {
          setGastosVariables(data);
        })
        .catch((error) => {
          console.error("Error al obtener gastos variables:", error);
        });

      // Obtener gastos diarios por mes y año
      fetch(
        `http://localhost:8080/usuarios/${userId}/gastosdiario/fecha?year=${year}`
      )
        .then((response) => response.json())
        .then((data) => {
          setGastosDiarios(data);
        })
        .catch((error) => {
          console.error("Error al obtener gastos diarios:", error);
        });

      // Obtener tarjetas de crédito por mes y año
      fetch(
        `http://localhost:8080/usuarios/${userId}/tarjetascredito/fecha?year=${year}`
      )
        .then((response) => response.json())
        .then((data) => {
          setTarjetasCredito(data);
        })
        .catch((error) => {
          console.error("Error al obtener tarjetas de crédito:", error);
        });
    }
  }, [userId, currentDate]);

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const gruposDeMeses = meses.reduce((acc, mes, index) => {
    const grupoIndex = Math.floor(index / 5);
    if (!acc[grupoIndex]) {
      acc[grupoIndex] = [];
    }
    acc[grupoIndex].push(mes);
    return acc;
  }, []);

  return (
    <div className="flex flex-col items-start">
      <NavBar />
      {gruposDeMeses.map((grupo, index) => (
        <div key={index} className="flex">
          {grupo.map((mes, mesIndex) => {
            const resumen = resumenMensual.find(
              (item) => item.month === meses.indexOf(mes) + 1
            );
            const marginStyle = index === 1 ? "mt-8" : "";
            const lastGroup = index === gruposDeMeses.length - 1;
            const centerStyle =
              lastGroup &&
              (mesIndex === grupo.length - 1 || mesIndex === grupo.length - 2)
                ? "mt-8"
                : "";

            return (
              <ResumenMeses
                key={`${mes}-${mesIndex}`}
                mes={mes}
                resumen={resumen}
                marginStyle={marginStyle}
                centerStyle={centerStyle}
                gastosFijos={gastosFijos}
                gastosVariables={gastosVariables}
                gastosDiarios={gastosDiarios}
                tarjetasCredito={tarjetasCredito}
              />
            );
          })}
        </div>
      ))}
      <div className="flex mt-12">
        <Graficos userId={userId} />
        <div className="flex">
          <Sumatorias userId={userId} currentDate={currentDate} 
           resumenMensual={resumenMensual} 
           />
        </div>
      </div>
    </div>
  );
}
export default Resumen;

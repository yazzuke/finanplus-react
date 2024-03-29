import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar/Navbar";
import SelectorMeses from "../../components/SelectorMeses/SelectorMeses";
import TusIngresos from "../../components/TusIngresos/TusIngresos";
import { getAuth } from "firebase/auth";

const getUserData = async (userId) => {
  const response = await fetch(`http://localhost:8080/usuarios/${userId}`);
  const data = await response.json();
  return data;
};

function Home () {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const userData = await getUserData(userId);
        setUser(userData);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <NavBar user={user} />
  <div className="mt-4 ml-5"  > {/* Utiliza la clase de margen de Tailwind que prefieras */}
        <SelectorMeses />
  </div>
  <div> 
        <TusIngresos />
  </div>
    </div>
  );
}

export default Home;
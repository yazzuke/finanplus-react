import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar/Navbar";
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
      {/* El resto de tu código */}
    </div>
  );
}

export default Home;
import React, { useState, createContext, useContext } from "react";

export const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export default function ContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    // Aquí puedes guardar la información del usuario, por ejemplo:
    setUser(userData);
  
  };

  const logoutUser = () => {
    setUser(null);
  };




  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}
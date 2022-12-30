import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChangedCheck } from "../services/auth";

export const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChangedCheck(setUser);
  }, []);

  const loggedUser = (user) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, loggedUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;

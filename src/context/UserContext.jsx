import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
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

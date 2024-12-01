import { createContext, useContext, useState } from "react";

const authContext = createContext();

export const useAuthContext = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  function login() {
    setIsAuth(true);
  }

  function logout() {
    setIsAuth(false);
  }

  return (
    <authContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

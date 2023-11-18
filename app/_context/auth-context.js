"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(
    /* () => {
    let storedLoggedInUser;
    if (typeof window !== "undefined") {
      storedLoggedInUser = localStorage.getItem("loggedInUser");
    }
    return storedLoggedInUser ? JSON.parse(storedLoggedInUser) : false;
  } */ true
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }
  }, [loggedInUser]);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

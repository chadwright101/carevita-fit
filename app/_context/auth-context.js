"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const checkLoginStatus = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const expirationTime = localStorage.getItem("expirationTime");
  if (isLoggedIn && expirationTime && Date.now() < parseInt(expirationTime)) {
    return true;
  } else {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("expirationTime");
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(false);

  useEffect(() => {
    const isLocalStorageAvailable =
      typeof window !== "undefined" && window.localStorage;

    if (isLocalStorageAvailable) {
      const isLoggedIn = checkLoginStatus();
      setLoggedInUser(isLoggedIn);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

"use client";

import { createContext, useState, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../_firebase/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userUid }}>{children}</AuthContext.Provider>
  );
};

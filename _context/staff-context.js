"use client";

import { createContext, useState, useEffect } from "react";
import { getDocs, orderBy, query } from "firebase/firestore";
import { staffCollectionRef } from "@/_firebase/firebase";

export const StaffContext = createContext();

export const StaffProvider = ({ children }) => {
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const q = query(staffCollectionRef, orderBy("timestamp", "desc"));
        const staffData = await getDocs(q);

        const staffList = staffData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setStaff(staffList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching staff:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return (
    <StaffContext.Provider value={{ staff, isLoading, error }}>
      {children}
    </StaffContext.Provider>
  );
};

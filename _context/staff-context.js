"use client";

import { createContext, useState, useEffect } from "react";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { staffCollectionRef } from "@/_firebase/firebase";
import {
  addStaffMember,
  deleteStaffMember,
  updateStaffMember,
  moveStaffToTop,
} from "@/_components/user/dashboard/staff/utils/staff-service";

export const StaffContext = createContext();

export const StaffProvider = ({ children }) => {
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const q = query(staffCollectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        try {
          const staffList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setStaff(staffList);
          setError(null);
        } catch (error) {
          console.error("Error processing staff:", error);
          setError(error);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Error listening to staff:", error);
        setError(error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <StaffContext.Provider
      value={{
        staff,
        isLoading,
        error,
        addStaffMember,
        deleteStaffMember,
        updateStaffMember,
        moveStaffToTop,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};

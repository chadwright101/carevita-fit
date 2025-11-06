"use client";

import { createContext, useState, useEffect } from "react";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { testimonialsCollectionRef } from "@/_firebase/firebase";
import {
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  updateTestimonialTimestamp,
} from "@/_components/user/dashboard/testimonials/utils/testimonials-service";

export const TestimonialsContext = createContext();

export const TestimonialsProvider = ({ children }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const q = query(testimonialsCollectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        try {
          const updatedTestimonials = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setTestimonials(updatedTestimonials);
          setError(null);
        } catch (error) {
          console.error("Error processing testimonials:", error);
          setError(error);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Error listening to testimonials:", error);
        setError(error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <TestimonialsContext.Provider
      value={{
        testimonials,
        isLoading,
        error,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateTestimonialTimestamp,
      }}
    >
      {children}
    </TestimonialsContext.Provider>
  );
};

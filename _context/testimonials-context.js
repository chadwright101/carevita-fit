"use client";

import { createContext, useState, useEffect } from "react";
import { getDocs, orderBy, query } from "firebase/firestore";
import { testimonialsCollectionRef } from "@/_firebase/firebase";

export const TestimonialsContext = createContext();

export const TestimonialsProvider = ({ children }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(testimonialsCollectionRef, orderBy("timestamp", "desc"));
        const testimonialsData = await getDocs(q);

        const sortedTestimonials = testimonialsData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setTestimonials(sortedTestimonials);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <TestimonialsContext.Provider value={{ testimonials, isLoading, error }}>
      {children}
    </TestimonialsContext.Provider>
  );
};

"use client";

import { createContext, useState } from "react";

import { doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/_firebase/firebase";

import { testimonialsCollectionRef } from "../_components/pages/admin/testimonials-section";

// Create the Context
export const AdminContext = createContext();

// Create a Provider component
export const AdminProvider = ({ children }) => {
  const [testimonialsArray, setTestimonialsArray] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedParagraph, setEditedParagraph] = useState("");
  const [newTestimonialName, setNewTestimonialName] = useState("");
  const [newTestimonialParagraph, setNewTestimonialParagraph] = useState("");

  const handleTestimonialEdit = (testimonialIndex) => {
    setEditIndex(testimonialIndex);
    const testimonial = testimonialsArray[testimonialIndex];
    setEditedName(testimonial.name);
    setEditedParagraph(testimonial.paragraph);
  };

  const handleTestimonialSave = async (testimonialId) => {
    try {
      await updateDoc(doc(db, "testimonials", testimonialId), {
        name: editedName,
        paragraph: editedParagraph,
      });
      setEditIndex(null);
    } catch (error) {
      alert(
        "Failed to update testimonial, please try again. If the problem persists, please contact the developer."
      );
    }
  };

  const handleTestimonialCancel = () => {
    if (
      editedName !== testimonialsArray[editIndex].name ||
      editedParagraph !== testimonialsArray[editIndex].paragraph
    ) {
      const confirmed = window.confirm(
        "All progress will be lost. Are you sure you want to cancel?"
      );
      if (confirmed) {
        setEditedName(testimonialsArray[editIndex].name);
        setEditedParagraph(testimonialsArray[editIndex].paragraph);
        setEditIndex(null);
      }
    } else {
      setEditIndex(null);
    }
  };

  const handleTestimonialDelete = async (testimonialId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (confirmed) {
      try {
        await deleteDoc(doc(db, "testimonials", testimonialId));
        setTestimonialsArray(
          testimonialsArray.filter((t) => t.id !== testimonialId)
        );
      } catch (error) {
        alert(
          "Failed to delete testimonial, please try again. If the problem persists, please contact the developer."
        );
      }
    }
  };

  const handleTestimonialAdd = async (e) => {
    e.preventDefault();

    if (testimonialsArray.length >= 10) {
      alert("You have reached the maximum limit of testimonials.");
      return;
    }

    try {
      const newTestimonial = {
        name: newTestimonialName,
        paragraph: newTestimonialParagraph,
      };
      const docRef = await addDoc(testimonialsCollectionRef, newTestimonial);
      setTestimonialsArray([
        ...testimonialsArray,
        { ...newTestimonial, id: docRef.id },
      ]);
      setNewTestimonialName("");
      setNewTestimonialParagraph("");
    } catch (error) {
      alert(
        "Failed to add testimonial, please try again. If the problem persists, please contact the developer."
      );
    }
  };

  const moveTestimonialUp = (testimonialIndex) => {
    if (testimonialIndex > 0) {
      const updatedArray = [...testimonialsArray];
      const [testimonialToMove] = updatedArray.splice(testimonialIndex, 1);
      updatedArray.splice(testimonialIndex - 1, 0, testimonialToMove);
      setTestimonialsArray(updatedArray);
    }
  };

  const moveTestimonialDown = (testimonialIndex) => {
    if (testimonialIndex < testimonialsArray.length - 1) {
      const updatedArray = [...testimonialsArray];
      const [testimonialToMove] = updatedArray.splice(testimonialIndex, 1);
      updatedArray.splice(testimonialIndex + 1, 0, testimonialToMove);
      setTestimonialsArray(updatedArray);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        testimonialsArray,
        setTestimonialsArray,
        editIndex,
        editedName,
        setEditedName,
        editedParagraph,
        setEditedParagraph,
        newTestimonialName,
        setNewTestimonialName,
        newTestimonialParagraph,
        setNewTestimonialParagraph,
        handleTestimonialEdit,
        handleTestimonialSave,
        handleTestimonialDelete,
        handleTestimonialCancel,
        handleTestimonialAdd,
        testimonialsCollectionRef,
        moveTestimonialUp,
        moveTestimonialDown,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

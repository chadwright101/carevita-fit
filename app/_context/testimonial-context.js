"use client";

import { createContext, useState } from "react";
import { useRouter } from "next/navigation";

import { doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/_firebase/firebase";
import { ToastContainer, toast } from "react-toastify";

import { testimonialsCollectionRef } from "../_components/pages/admin/testimonials-section";

import "react-toastify/dist/ReactToastify.css";

export const TestimonialContext = createContext();

export const toastProps = {
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const TestimonialProvider = ({ children }) => {
  const [testimonialsArray, setTestimonialsArray] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedParagraph, setEditedParagraph] = useState("");
  const [newTestimonialName, setNewTestimonialName] = useState("");
  const [newTestimonialParagraph, setNewTestimonialParagraph] = useState("");
  const [getTestimonialIsLoading, setGetTestimonialIsLoading] = useState(false);
  const router = useRouter();

  const handleTestimonialEdit = (testimonialIndex) => {
    setEditIndex(testimonialIndex);
    const testimonial = testimonialsArray[testimonialIndex];
    setEditedName(testimonial.name);
    setEditedParagraph(testimonial.paragraph);
    document.getElementById(`/admin/dashboard#testimonial-${testimonialIndex}`);
  };

  const handleTestimonialSave = async (testimonialId) => {
    try {
      await updateDoc(doc(db, "testimonials", testimonialId), {
        name: editedName,
        paragraph: editedParagraph,
      });
      setEditIndex(null);
      toast.success("Success! Testimonial saved.", toastProps);
    } catch (error) {
      toast.error(
        "Error! Testimonial could not be saved. Please try again and contact the developer if the problem persists.",
        toastProps
      );
      console.log(error);
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
        toast.success("Success! Testimonial deleted.", toastProps);
      } catch (error) {
        toast.error(
          "Error! Testimonial could not be deleted. Please try again and contact the developer if the problem persists.",
          toastProps
        );
        console.log(error);
      }
    }
  };

  const handleTestimonialAdd = async (e) => {
    e.preventDefault();

    try {
      const newTestimonial = {
        name: newTestimonialName,
        paragraph: newTestimonialParagraph,
        timestamp: new Date().getTime(),
      };

      const docRef = await addDoc(testimonialsCollectionRef, newTestimonial);

      setNewTestimonialName("");
      setNewTestimonialParagraph("");
      setTimeout(() => {
        const element = document.getElementById("testimonial-0");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      toast.success("Success! Testimonial added.", toastProps);
    } catch (error) {
      toast.error(
        "Error! Testimonial could not be added. Please try again and contact the developer if the problem persists."
      );
      console.log(error);
    }
  };

  const updateTestimonialTimeStamp = async (testimonialId) => {
    try {
      const updatedTimestamp = new Date().getTime();
      await updateDoc(doc(db, "testimonials", testimonialId), {
        timestamp: updatedTimestamp,
      });
      setTimeout(() => {
        document.getElementById("testimonial-0");
      }, 100);
      toast.success(
        "Success! Testimonial moved to the top of the list.",
        toastProps
      );
    } catch (error) {
      toast.error(
        "Error! Testimonial could not be saved. Please try again and contact the developer if the problem persists.",
        toastProps
      );
      console.log(error);
    }
  };

  return (
    <TestimonialContext.Provider
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
        updateTestimonialTimeStamp,
        getTestimonialIsLoading,
        setGetTestimonialIsLoading,
      }}
    >
      {children}
      <ToastContainer />
    </TestimonialContext.Provider>
  );
};

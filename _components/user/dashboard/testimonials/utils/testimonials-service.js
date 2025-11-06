import { toast } from "react-toastify";
import { toastProps } from "@/_lib/ToastProps";
import {
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, testimonialsCollectionRef } from "@/_firebase/firebase";

export const addTestimonial = async (testimonialData) => {
  try {
    const newTestimonial = {
      ...testimonialData,
      timestamp: new Date().getTime(),
    };

    await addDoc(testimonialsCollectionRef, newTestimonial);
    toast.success("Success! Testimonial added.", toastProps);
    return true;
  } catch (error) {
    toast.error(
      "Error! Testimonial could not be added. Please try again and contact the developer if the problem persists.",
      toastProps
    );
    console.log(error);
    return false;
  }
};

export const updateTestimonial = async (testimonialId, updates) => {
  try {
    await updateDoc(doc(db, "testimonials", testimonialId), updates);
    toast.success("Success! Testimonial saved.", toastProps);
    return true;
  } catch (error) {
    toast.error(
      "Error! Testimonial could not be saved. Please try again and contact the developer if the problem persists.",
      toastProps
    );
    console.log(error);
    return false;
  }
};

export const deleteTestimonial = async (testimonialId) => {
  try {
    await deleteDoc(doc(db, "testimonials", testimonialId));
    toast.success("Success! Testimonial deleted.", toastProps);
    return true;
  } catch (error) {
    toast.error(
      "Error! Testimonial could not be deleted. Please try again and contact the developer if the problem persists.",
      toastProps
    );
    console.log(error);
    return false;
  }
};

export const updateTestimonialTimestamp = async (testimonialId) => {
  try {
    const updatedTimestamp = new Date().getTime();
    await updateDoc(doc(db, "testimonials", testimonialId), {
      timestamp: updatedTimestamp,
    });
    toast.success(
      "Success! Testimonial moved to the top of the list.",
      toastProps
    );
    return true;
  } catch (error) {
    toast.error(
      "Error! Testimonial could not be saved. Please try again and contact the developer if the problem persists.",
      toastProps
    );
    console.log(error);
    return false;
  }
};

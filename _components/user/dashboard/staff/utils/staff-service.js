"use client";

import { doc, deleteDoc, updateDoc, addDoc } from "firebase/firestore";
import { db, staffCollectionRef, staffStorageRef } from "@/_firebase/firebase";
import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-toastify";
import { toastProps } from "@/_lib/ToastProps";

export const addStaffMember = async (staffData) => {
  try {
    // Create basic staff document
    const docRef = await addDoc(staffCollectionRef, {
      name: staffData.name,
      bio: staffData.bio,
      image: "",
      timestamp: new Date().getTime(),
    });

    // Handle image upload if provided
    if (staffData.image) {
      const imageRef = ref(staffStorageRef, `images/${staffData.image.name}`);
      await uploadBytes(imageRef, staffData.image);
      const imageUrl = await getDownloadURL(imageRef);

      // Update the document with the image URL
      await updateDoc(doc(db, "staff", docRef.id), {
        image: imageUrl,
      });
    }

    toast.success("Staff member added successfully!", toastProps);
    return true;
  } catch (error) {
    console.error("Error adding staff member:", error);
    toast.error("Failed to add staff member. Please try again.", toastProps);
    return false;
  }
};

export const deleteStaffMember = async (staffId, imageUrl) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this staff member?"
  );

  if (!confirmDelete) return false;

  try {
    await deleteDoc(doc(db, "staff", staffId));

    if (imageUrl) {
      try {
        await deleteImageFromStorage(imageUrl);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    toast.success("Staff member deleted successfully!", toastProps);
    return true;
  } catch (error) {
    console.error("Error deleting staff member:", error);
    toast.error("Failed to delete staff member. Please try again.", toastProps);
    return false;
  }
};

export const updateStaffMember = async (staffId, staffData, oldImageUrl) => {
  try {
    // Update basic staff data
    await updateDoc(doc(db, "staff", staffId), {
      name: staffData.name,
      bio: staffData.bio,
    });

    // Handle image updates
    if (staffData.newImage) {
      // Delete old image if it exists
      if (oldImageUrl) {
        await deleteImageFromStorage(oldImageUrl);
      }

      // Upload new image
      const imageRef = ref(
        staffStorageRef,
        `images/${staffData.newImage.name}`
      );
      await uploadBytes(imageRef, staffData.newImage);
      const imageUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "staff", staffId), {
        image: imageUrl,
      });
    } else if (staffData.imageUrl === "") {
      // Delete image without replacement
      if (oldImageUrl) {
        await deleteImageFromStorage(oldImageUrl);
        await updateDoc(doc(db, "staff", staffId), {
          image: "",
        });
      }
    }

    toast.success("Staff member updated successfully!", toastProps);
    return true;
  } catch (error) {
    console.error("Error updating staff member:", error);
    toast.error("Failed to update staff member. Please try again.", toastProps);
    return false;
  }
};

export const moveStaffToTop = async (staffId) => {
  try {
    await updateDoc(doc(db, "staff", staffId), {
      timestamp: new Date().getTime(),
    });
    toast.success("Staff member moved to the top!", toastProps);
    return true;
  } catch (error) {
    console.error("Error updating staff order:", error);
    toast.error("Failed to reorder staff. Please try again.", toastProps);
    return false;
  }
};

// Helper function to delete image from storage
const deleteImageFromStorage = async (imageUrl) => {
  try {
    const fullPath = imageUrl.split(
      "firebasestorage.googleapis.com/v0/b/carevita-fit.appspot.com/o/"
    )[1];
    if (fullPath) {
      const decodedPath = decodeURIComponent(fullPath.split("?")[0]);
      const imageRef = ref(staffStorageRef, decodedPath);
      await deleteObject(imageRef);
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

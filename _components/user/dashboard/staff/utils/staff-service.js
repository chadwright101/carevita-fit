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
      try {
        // Generate a unique filename to avoid conflicts
        const timestamp = new Date().getTime();
        const filename = `${timestamp}_${staffData.image.name}`;

        const imageRef = ref(staffStorageRef, `images/${filename}`);
        await uploadBytes(imageRef, staffData.image);
        const imageUrl = await getDownloadURL(imageRef);

        // Update the document with the image URL
        await updateDoc(doc(db, "staff", docRef.id), {
          image: imageUrl,
        });
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        // Continue with staff creation even if image upload fails
        toast.warning(
          "Staff member added but image upload failed. You can edit later to add an image.",
          toastProps
        );
        return true;
      }
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
    // First delete the document
    await deleteDoc(doc(db, "staff", staffId));

    // Then try to delete the image if it exists
    if (imageUrl) {
      try {
        await deleteImageFromStorage(imageUrl);
      } catch (error) {
        // Log but don't fail the operation if image deletion fails
        console.error("Error deleting image:", error);
        // The document is already deleted, so we consider this a success
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
      timestamp: new Date().getTime(),
    });

    // Handle image updates
    if (staffData.newImage) {
      try {
        // Delete old image if it exists
        if (oldImageUrl) {
          await deleteImageFromStorage(oldImageUrl);
        }
      } catch (deleteError) {
        // Log error but continue with upload
        console.error("Error deleting old image:", deleteError);
        // Don't throw the error to allow the update to continue
      }

      try {
        // Generate a unique filename to avoid conflicts
        const timestamp = new Date().getTime();
        const filename = `${timestamp}_${staffData.newImage.name}`;

        // Upload new image
        const imageRef = ref(staffStorageRef, `images/${filename}`);
        await uploadBytes(imageRef, staffData.newImage);
        const imageUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "staff", staffId), {
          image: imageUrl,
        });
      } catch (uploadError) {
        console.error("Error uploading new image:", uploadError);
        throw uploadError; // Rethrow to trigger the catch block
      }
    } else if (staffData.imageUrl === "") {
      // Delete image without replacement
      if (oldImageUrl) {
        try {
          await deleteImageFromStorage(oldImageUrl);
        } catch (deleteError) {
          console.error("Error deleting image:", deleteError);
          // Continue with the update even if image deletion fails
        }

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
    // Check if URL is valid
    if (!imageUrl || !imageUrl.includes("firebasestorage.googleapis.com")) {
      console.warn("Invalid image URL format:", imageUrl);
      return;
    }

    // Extract the path from the URL
    const fullPath = imageUrl.split(
      "firebasestorage.googleapis.com/v0/b/carevita-fit.appspot.com/o/"
    )[1];

    if (fullPath) {
      // Decode the URL-encoded path and remove query parameters
      const decodedPath = decodeURIComponent(fullPath.split("?")[0]);

      // Create a direct reference to the file in storage
      // We use a direct reference to storage root to avoid path duplication
      const imageRef = ref(storage, decodedPath);

      // Delete the file
      await deleteObject(imageRef);
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

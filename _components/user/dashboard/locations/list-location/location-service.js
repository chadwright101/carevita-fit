"use client";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, locationsStorageRef } from "@/_firebase/firebase";
import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-toastify";
import { toastProps } from "@/_lib/ToastProps";

export const deleteLocation = async (locationId, image) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this location?"
  );

  if (!confirmDelete) return false;

  try {
    await deleteDoc(doc(db, "locations", locationId));

    if (image) {
      try {
        const fullPath = image.split(
          "firebasestorage.googleapis.com/v0/b/carevita-fit.appspot.com/o/"
        )[1];
        if (fullPath) {
          const decodedPath = decodeURIComponent(fullPath.split("?")[0]);
          const imageRef = ref(locationsStorageRef, decodedPath);
          await deleteObject(imageRef);
        }
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    toast.success("Location deleted successfully!", toastProps);
    return true;
  } catch (error) {
    console.error("Error deleting location:", error);
    toast.error("Failed to delete location. Please try again.", toastProps);
    return false;
  }
};

export const updateLocation = async (locationId, locationData, oldImage) => {
  try {
    await updateDoc(doc(db, "locations", locationId), {
      description: locationData.description,
      heading: locationData.heading,
      location: locationData.city,
      suburb: locationData.suburb,
      googleMapsLink: locationData.googleMapsLink,
      staffMember: locationData.staffMember,
    });

    if (locationData.newImage) {
      if (oldImage) {
        await deleteImageFromStorage(oldImage);
      }

      const imageRef = ref(
        locationsStorageRef,
        `images/${locationData.newImage.name}`
      );
      await uploadBytes(imageRef, locationData.newImage);
      const imageUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "locations", locationId), {
        image: imageUrl,
      });
    } else if (locationData.imageUrl === "") {
      if (oldImage) {
        await deleteImageFromStorage(oldImage);
        await updateDoc(doc(db, "locations", locationId), {
          image: "",
        });
      }
    }

    toast.success("Location updated successfully!", toastProps);
    return true;
  } catch (error) {
    console.error("Error updating location:", error);
    toast.error("Failed to update location. Please try again.", toastProps);
    return false;
  }
};

export const moveLocationToTop = async (locationId) => {
  try {
    await updateDoc(doc(db, "locations", locationId), {
      timestamp: new Date().getTime(),
    });
    toast.success("Location moved to the top!", toastProps);
    return true;
  } catch (error) {
    console.error("Error updating location order:", error);
    toast.error("Failed to reorder location. Please try again.", toastProps);
    return false;
  }
};

const deleteImageFromStorage = async (imageUrl) => {
  try {
    const fullPath = imageUrl.split(
      "firebasestorage.googleapis.com/v0/b/carevita-fit.appspot.com/o/"
    )[1];
    if (fullPath) {
      const decodedPath = decodeURIComponent(fullPath.split("?")[0]);
      const imageRef = ref(locationsStorageRef, decodedPath);
      await deleteObject(imageRef);
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

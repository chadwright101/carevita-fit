"use client";

import { createContext, useState, useRef } from "react";

import {
  ref,
  uploadBytes,
  deleteObject,
  updateMetadata,
} from "firebase/storage";

import { ToastContainer, toast } from "react-toastify";
import { toastProps } from "@/app/_lib/ToastProps";
import { RefreshExpirationTime } from "../_lib/RefreshExpirationTime";

export const AdminGalleryContext = createContext();

export const AdminGalleryProvider = ({ children }) => {
  const [imageInfo, setImageInfo] = useState([]);
  const [file, setFile] = useState(null);
  const [reloadImages, setReloadImages] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const img = new Image();
      img.onload = function () {
        if (img.width < 1400 || img.height < 650) {
          alert(
            "Error! Image is too small. Please make sure it is at least 1400px in width and 650px in height."
          );
          event.target.value = "";
        } else {
          setFile(selectedFile);
        }
      };

      img.src = URL.createObjectURL(selectedFile);
    }
  };

  const uploadImage = async (storageRef, galleryName) => {
    try {
      if (file) {
        const fileName = `${Date.now()}_${file.name}`;
        const fileRef = ref(storageRef, fileName);
        setReloadImages(true);

        toast.info("Adding new image...", toastProps);

        await uploadBytes(fileRef, file);

        const metadata = {
          customMetadata: {
            timestamp: new Date().getTime(),
          },
        };
        await updateMetadata(fileRef, metadata);

        setFile(null);
        setTimeout(() => {
          toast.success("Success! New image added.", toastProps);
        }, 3000);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Error! New image could not be added. Please try again and contact the developer if the problem persists.",
        toastProps
      );
    } finally {
      RefreshExpirationTime();
      setTimeout(() => {
        const element = document.getElementById(
          `${galleryName}-gallery-image-0`
        );
        element.scrollIntoView({ behavior: "smooth" });
      }, 1500);
      setReloadImages(false);
    }
  };

  const updateImageTimestamp = async (storageRef, filename, galleryName) => {
    try {
      const imageRef = ref(storageRef, filename);
      toast.info("Moving image...", toastProps);
      setReloadImages(true);
      const updatedMetadata = {
        customMetadata: {
          timestamp: new Date().getTime(),
        },
      };

      await updateMetadata(imageRef, updatedMetadata);

      setTimeout(() => {
        toast.success(
          "Success! Image moved to the first position.",
          toastProps
        );
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(
        "Error! Image could not be moved. Please try again and contact the developer if the problem persists.",
        toastProps
      );
    } finally {
      RefreshExpirationTime();
      setTimeout(() => {
        const element = document.getElementById(
          `${galleryName}-gallery-image-0`
        );
        element.scrollIntoView({ behavior: "smooth" });
      }, 1500);
      setReloadImages(false);
    }
  };

  const removeImage = async (storageRef, filename, index, galleryName) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image? This action cannot be undone."
    );
    if (confirmed) {
      try {
        toast.info("Deleting image...", toastProps);

        setReloadImages(true);
        const fileRef = ref(storageRef, filename);
        await deleteObject(fileRef);

        setTimeout(() => {
          toast.success("Success! Image deleted.", toastProps);
        }, 2000);
      } catch (error) {
        console.log(error);
      } finally {
        if (index) {
          setTimeout(() => {
            const element = document.getElementById(
              `${galleryName}-gallery-image-${index === 0 ? "0" : index - 1}`
            );
            element.scrollIntoView({ behavior: "smooth" });
          }, 1500);
        }
        setReloadImages(false);
        RefreshExpirationTime();
      }
    }
  };

  return (
    <AdminGalleryContext.Provider
      value={{
        imageInfo,
        setImageInfo,
        file,
        setFile,
        reloadImages,
        setReloadImages,
        fileInputRef,
        handleFileChange,
        uploadImage,
        removeImage,
        updateImageTimestamp,
      }}
    >
      {children}
      <ToastContainer />
    </AdminGalleryContext.Provider>
  );
};

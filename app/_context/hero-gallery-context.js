"use client";

import { createContext, useState, useRef } from "react";

import {
  ref,
  uploadBytes,
  deleteObject,
  updateMetadata,
} from "firebase/storage";

import { storage } from "@/app/_firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import { toastProps } from "@/app/_context/testimonial-context";

export const HeroGalleryContext = createContext();

export const heroSlideshowStorageRef = ref(storage, "hero-slideshow");

export const HeroGalleryProvider = ({ children }) => {
  const [heroImageInfo, setHeroImageInfo] = useState([]);
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

  const uploadHeroImage = async () => {
    try {
      if (file) {
        const fileName = `${Date.now()}_${file.name}`;
        const fileRef = ref(heroSlideshowStorageRef, fileName);
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
        }, 4000);
        setReloadImages(false);
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
    }
  };

  const updateImageTimestamp = async (filename) => {
    try {
      const imageRef = ref(heroSlideshowStorageRef, filename);
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
      }, 3000);
      setReloadImages(false);
    } catch (error) {
      console.error(error);
      toast.error(
        "Error! Image could not be moved. Please try again and contact the developer if the problem persists.",
        toastProps
      );
    }
  };

  const removeHeroImage = async (filename) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image? This action cannot be undone."
    );
    if (confirmed) {
      try {
        toast.info("Deleting image...", toastProps);
        setReloadImages(true);

        const fileRef = ref(heroSlideshowStorageRef, filename);
        await deleteObject(fileRef);

        setTimeout(() => {
          toast.success("Success! Image deleted.", toastProps);
        }, 3000);
        setReloadImages(false);
      } catch (error) {
        console.log(error);
        toast.error(
          "Error! Image could not be deleted. Please try again and contact the developer if the problem persists."
        );
      }
    }
  };

  return (
    <HeroGalleryContext.Provider
      value={{
        heroImageInfo,
        setHeroImageInfo,
        file,
        setFile,
        reloadImages,
        setReloadImages,
        fileInputRef,
        handleFileChange,
        uploadHeroImage,
        removeHeroImage,
        updateImageTimestamp,
      }}
    >
      {children}
      <ToastContainer />
    </HeroGalleryContext.Provider>
  );
};

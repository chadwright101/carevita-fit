"use client";

import { createContext, useState, useRef, useCallback } from "react";

import {
  ref,
  uploadBytes,
  deleteObject,
  listAll,
  getDownloadURL,
  updateMetadata,
  getMetadata,
} from "firebase/storage";

import { toast } from "react-toastify";
import { toastProps } from "@/_lib/ToastProps";

export const AdminGalleryContext = createContext();

export const AdminGalleryProvider = ({ children }) => {
  const [mainImageInfo, setMainImageInfo] = useState([]);
  const [secondaryImageInfo, setSecondaryImageInfo] = useState([]);
  const [file, setFile] = useState(null);
  const [galleryVersion, setGalleryVersion] = useState({ main: 0, secondary: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = useCallback(
    (event) => {
      const selectedFile = event.target.files[0];

      if (!selectedFile) return;

      const img = new Image();
      img.onload = () => {
        if (img.width < 1400 || img.height < 650) {
          alert(
            "Error! Image is too small. Please make sure it is at least 1400px in width and 650px in height."
          );
          event.target.value = "";
        } else {
          setFile(selectedFile);
        }
      };

      img.onerror = () => {
        alert(
          "Error loading image.  Please try a different file type or check the file."
        );
        event.target.value = "";
      };

      img.src = URL.createObjectURL(selectedFile);
    },
    []
  );

  const uploadImage = useCallback(
    async (storageRef, galleryName) => {
      try {
        if (!file) return;

        const fileName = `${Date.now()}_${file.name}`;
        const fileRef = ref(storageRef, fileName);

        toast.info("Adding new image...", toastProps);

        await uploadBytes(fileRef, file);

        const metadata = {
          customMetadata: {
            timestamp: new Date().getTime(),
          },
        };
        await updateMetadata(fileRef, metadata);

        toast.success("Success! New image added.", {
          ...toastProps,
          delay: 3000,
        });

        setGalleryVersion(prev => ({
          ...prev,
          [galleryName]: prev[galleryName] + 1
        }));

        const element = document.getElementById(
          `${galleryName}-gallery-image-0`
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } catch (error) {
        console.error("Upload Error:", error);
        toast.error(
          "Error! New image could not be added. Please try again and contact the developer if the problem persists.",
          toastProps
        );
      } finally {
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [file, fileInputRef]
  );

  const updateImageTimestamp = useCallback(
    async (storageRef, filename, galleryName) => {
      try {
        const imageRef = ref(storageRef, filename);
        toast.info("Moving image...", toastProps);

        const updatedMetadata = {
          customMetadata: {
            timestamp: new Date().getTime(),
          },
        };

        await updateMetadata(imageRef, updatedMetadata);

        toast.success("Success! Image moved to the first position.", {
          ...toastProps,
          delay: 2000,
        });

        setGalleryVersion(prev => ({
          ...prev,
          [galleryName]: prev[galleryName] + 1
        }));

        const element = document.getElementById(
          `${galleryName}-gallery-image-0`
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } catch (error) {
        console.error("Timestamp Update Error:", error);
        toast.error(
          "Error! Image could not be moved. Please try again and contact the developer if the problem persists.",
          toastProps
        );
      }
    },
    []
  );

  const removeImage = useCallback(
    async (storageRef, filename, index, galleryName) => {
      const confirmed = window.confirm(
        "Are you sure you want to delete this image? This action cannot be undone."
      );

      if (!confirmed) return;

      try {
        toast.info("Deleting image...", toastProps);

        const fileRef = ref(storageRef, filename);

        let fileExists = false;
        try {
          await getDownloadURL(fileRef);
          fileExists = true;
        } catch (e) {
          console.warn(
            `File ${filename} does not exist.  Skipping deletion.`,
            e
          );
          toast.warn(
            `File ${filename} does not exist. It may have already been deleted.`,
            toastProps
          );
        }

        if (fileExists) {
          await deleteObject(fileRef);

          toast.success("Success! Image deleted.", {
            ...toastProps,
            delay: 2000,
          });

          setGalleryVersion(prev => ({
            ...prev,
            [galleryName]: prev[galleryName] + 1
          }));

          if (index !== undefined) {
            let elementId = `${galleryName}-gallery-image-${
              index === 0 ? "0" : index - 1
            }`;
            const element = document.getElementById(elementId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      } catch (error) {
        console.error("Deletion Error:", error);
        toast.error(
          "Error! Image could not be deleted. Please try again and contact the developer if the problem persists.",
          toastProps
        );
      }
    },
    []
  );

  const getGalleryImages = useCallback(async (storageRef) => {
    try {
      setIsLoading(true);
      const res = await listAll(storageRef);
      const imageInfoPromises = res.items.map(async (itemRef) => {
        const metadata = await getMetadata(itemRef);
        const filename = itemRef.name;
        const url = await getDownloadURL(itemRef);
        return {
          url,
          filename,
          timestamp: metadata.customMetadata?.timestamp || 0,
        };
      });
      const newImageInfo = await Promise.all(imageInfoPromises);
      newImageInfo.sort((a, b) => b.timestamp - a.timestamp);
      return newImageInfo;
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AdminGalleryContext.Provider
      value={{
        mainImageInfo,
        setMainImageInfo,
        secondaryImageInfo,
        setSecondaryImageInfo,
        galleryVersion,
        file,
        isLoading,
        fileInputRef,
        handleFileChange,
        uploadImage,
        removeImage,
        updateImageTimestamp,
        getGalleryImages,
      }}
    >
      {children}
    </AdminGalleryContext.Provider>
  );
};

"use client";

import { useState, useEffect, useRef } from "react";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
  updateMetadata,
  getMetadata,
} from "firebase/storage";

import { storage } from "@/app/_firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import { toastProps } from "@/app/_context/testimonial-context";

import ImageContainer from "@/app/_components/image-container";
import Heading from "@/app/_components/heading";

const heroSlideshowStorageRef = ref(storage, "hero-slideshow");

const HeroSection = () => {
  const [heroImageInfo, setHeroImageInfo] = useState([]);
  const [file, setFile] = useState(null);
  const [reloadImages, setReloadImages] = useState(false);
  const [imagesLoading, setImageLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const getHeroImages = async () => {
      try {
        const res = await listAll(heroSlideshowStorageRef);

        const imageInfoPromises = res.items.map(async (itemRef) => {
          const metadata = await getMetadata(itemRef);
          const url = await getDownloadURL(itemRef);
          const filename = itemRef.name;
          return {
            url,
            filename,
            timestamp: metadata.customMetadata.timestamp || 0,
          };
        });

        const imageInfo = await Promise.all(imageInfoPromises);

        imageInfo.sort((a, b) => b.timestamp - a.timestamp);

        setHeroImageInfo(imageInfo);
      } catch (error) {
        console.log(error);
        toast.error(
          "Error! Images could not load. Please try again and contact the developer if the problem persists.",
          toastProps
        );
      }
    };
    getHeroImages();
  }, [reloadImages]);

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
          "Success! Image moved to the top of the list.",
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
    <section className="admin-main-slideshow">
      <Heading subheading cssClasses="admin-testimonials-section__heading">
        Hero gallery <span>(maximum 6 images)</span>
      </Heading>
      {heroImageInfo.length !== 0 ? (
        <ul className="admin-main-slideshow__list">
          {heroImageInfo.map(({ url, filename }, index) => (
            <li key={index} className="admin-main-slideshow__list__item">
              <button
                className="admin-main-slideshow__list__item__delete"
                type="button"
                onClick={() => removeHeroImage(filename)}
              >
                <img src="/icons/close-icon.svg" alt="Delete image" />
              </button>
              <button
                className="admin-main-slideshow__list__item__arrow"
                type="button"
                onClick={() => updateImageTimestamp(filename)}
              >
                <img
                  src="/icons/up-arrow.svg"
                  alt="Move testimonial to start"
                />
              </button>
              <ImageContainer
                src={url}
                alt={`Image ${index}`}
                width={650}
                height={650}
                cssClasses="admin-main-slideshow__list__item__image"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="admin-main-slideshow__empty-list">
          You currently have no images in this gallery. Add a new one below...
        </p>
      )}

      {heroImageInfo.length < 6 && (
        <form className="admin-main-slideshow__form">
          <label htmlFor="upload">Upload new image:</label>
          <input
            ref={fileInputRef}
            name="upload"
            id="upload"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="admin-button"
            onClick={uploadHeroImage}
            disabled={!file}
          >
            Upload
          </button>
        </form>
      )}
      <ToastContainer />
    </section>
  );
};

export default HeroSection;

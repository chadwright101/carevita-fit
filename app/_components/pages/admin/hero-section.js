"use client";

import { useState, useEffect, useRef } from "react";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { storage } from "@/app/_firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import { toastProps } from "@/app/_context/testimonial-context";

import ImageContainer from "@/app/_components/image-container";
import Heading from "@/app/_components/heading";

const heroSlideshowStorageRef = ref(storage, "hero-slideshow");

const HeroSection = () => {
  const [heroImageUrls, setHeroImageUrls] = useState([]);
  const [file, setFile] = useState(null);
  const [reloadImages, setReloadImages] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const fileInputRef = useRef(null);

  const getHeroImages = async () => {
    try {
      setImageLoading(true);
      const res = await listAll(heroSlideshowStorageRef);
      const urls = await Promise.all(
        res.items.map(async (itemRef) => {
          return getDownloadURL(itemRef);
        })
      );
      setHeroImageUrls(urls);
      setImageLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHeroImages();
  }, []);

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

        toast.info("Adding new image...", toastProps);

        await uploadBytes(fileRef, file);

        const imageUrl = await getDownloadURL(fileRef);

        setFile(null);
        setHeroImageUrls((prevUrls) => [...prevUrls, imageUrl]);
        toast.success("Success! New image added.", toastProps);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.log(error);
      toast.success(
        "Error! New image could not be added. Please try again and contact the developer if the problem persists.",
        toastProps
      );
    }
  };

  const removeHeroImage = async (url) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image? This action cannot be undone."
    );
    if (confirmed) {
      try {
        const decodedUrl = decodeURIComponent(url);
        const fileNameWithParams = decodedUrl.split("/").pop();
        const fileName = fileNameWithParams.split("?")[0];
        toast.info("Deleting image...", toastProps);

        const fileRef = ref(heroSlideshowStorageRef, fileName);
        await deleteObject(fileRef);

        setReloadImages(!reloadImages);
        toast.success("Success! Image deleted.", toastProps);
        setHeroImageUrls((prevUrls) =>
          prevUrls.filter((prevUrl) => prevUrl !== url)
        );
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
        Main gallery <span>(maximum 6 images)</span>
      </Heading>
      {heroImageUrls.length === 0 && imageLoading ? (
        <div className="spinner"></div>
      ) : heroImageUrls.length !== 0 && !imageLoading ? (
        <ul className="admin-main-slideshow__list">
          {heroImageUrls.map((url, index) => (
            <li key={index} className="admin-main-slideshow__list__item">
              <button
                className="admin-main-slideshow__list__item__icon"
                type="button"
                onClick={() => removeHeroImage(url)}
              >
                <img src="/icons/close-icon.svg" alt="Delete image" />
              </button>
              <ImageContainer
                src={url}
                alt=""
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

      {heroImageUrls.length < 6 && (
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

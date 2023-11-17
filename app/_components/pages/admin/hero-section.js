"use client";

import { useEffect, useContext } from "react";
import { listAll, getDownloadURL, getMetadata } from "firebase/storage";

import { toast } from "react-toastify";
import { toastProps } from "@/app/_context/testimonial-context";

import ImageContainer from "@/app/_components/image-container";
import Heading from "@/app/_components/heading";
import {
  HeroGalleryContext,
  heroSlideshowStorageRef,
} from "@/app/_context/hero-gallery-context";

const HeroSection = () => {
  const {
    heroImageInfo,
    setHeroImageInfo,
    file,
    reloadImages,
    fileInputRef,
    handleFileChange,
    uploadHeroImage,
    removeHeroImage,
    updateImageTimestamp,
  } = useContext(HeroGalleryContext);

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
    </section>
  );
};

export default HeroSection;

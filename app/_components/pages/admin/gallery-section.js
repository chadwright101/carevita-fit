"use client";

import { useEffect, useContext } from "react";
import Image from "next/image";

import { listAll, getDownloadURL, getMetadata, ref } from "firebase/storage";
import { storage } from "@/app/_firebase/firebase";
import { toast } from "react-toastify";
import { toastProps } from "@/app/_context/admin-testimonial-context";

import ImageContainer from "@/app/_components/image-container";
import Heading from "@/app/_components/heading";
import { AdminGalleryContext } from "@/app/_context/admin-gallery-context";

export const gallerySlideshowStorageRef = ref(storage, "gallery-slideshow");

const GallerySection = () => {
  const {
    imageInfo,
    setImageInfo,
    file,
    reloadImages,
    setReloadedImages,
    fileInputRef,
    handleFileChange,
    uploadImage,
    removeImage,
    updateImageTimestamp,
  } = useContext(AdminGalleryContext);

  useEffect(() => {
    const getGalleryImages = async () => {
      try {
        const res = await listAll(gallerySlideshowStorageRef);

        const imageInfoPromises = res.items.map(async (itemRef) => {
          const metadata = await getMetadata(itemRef);
          const filename = itemRef.name;
          const url = await getDownloadURL(itemRef);
          return {
            url,
            filename,
            timestamp: metadata.customMetadata.timestamp || 0,
          };
        });
        const imageInfo = await Promise.all(imageInfoPromises);

        imageInfo.sort((a, b) => b.timestamp - a.timestamp);

        setImageInfo(imageInfo);
      } catch (error) {
        console.log(error);
        toast.error(
          "Error! Images could not load. Please try again and contact the developer if the problem persists.",
          toastProps
        );
      }
    };
    getGalleryImages();
  }, [reloadImages, setImageInfo]);

  return (
    <section className="admin-hero-gallery">
      <Heading subheading cssClasses="admin-testimonials-section__heading">
        Other gallery <span>(maximum 20 images)</span>
      </Heading>
      {imageInfo.length !== 0 ? (
        <ul className="admin-hero-gallery__list">
          {imageInfo.map(({ url, filename }, index) => (
            <li key={index} className="admin-hero-gallery__list__item">
              <div
                className="nav-point"
                id={`other-gallery-image-${index}`}
              ></div>
              <button
                className="admin-hero-gallery__list__item__delete"
                type="button"
                onClick={() =>
                  removeImage(
                    gallerySlideshowStorageRef,
                    filename,
                    index,
                    "other"
                  )
                }
              >
                <Image
                  src="/icons/close-icon.svg"
                  alt="Delete image"
                  width={40}
                  height={40}
                />
              </button>
              {index !== 0 && (
                <button
                  className="admin-hero-gallery__list__item__arrow"
                  type="button"
                  onClick={() =>
                    updateImageTimestamp(
                      gallerySlideshowStorageRef,
                      filename,
                      "other"
                    )
                  }
                >
                  <Image
                    src="/icons/up-arrow.svg"
                    alt="Move image to start"
                    width={40}
                    height={40}
                  />
                </button>
              )}
              <ImageContainer
                src={url}
                alt={`Image ${index}`}
                width={650}
                height={650}
                cssClasses="admin-hero-gallery__list__item__image"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="admin-hero-gallery__empty-list">
          You currently have no images in this gallery. Add a new one below...
        </p>
      )}

      {imageInfo.length < 20 && (
        <form className="admin-hero-gallery__form">
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
            onClick={() => uploadImage(gallerySlideshowStorageRef, "other")}
            disabled={!file}
          >
            Upload
          </button>
        </form>
      )}
    </section>
  );
};

export default GallerySection;

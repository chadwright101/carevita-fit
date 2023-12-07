"use client";

import { useEffect, useContext } from "react";
import Image from "next/image";

import { toast } from "react-toastify";
import { toastProps } from "@/app/_lib/ToastProps";

import { secondaryGalleryStorageRef } from "@/app/_firebase/firebase";
import ImageContainer from "@/app/_components/image-container";
import { AdminGalleryContext } from "@/app/_context/admin-gallery-context";
import { RefreshExpirationTime } from "@/app/_lib/RefreshExpirationTime";

const SecondaryGallerySection = () => {
  const {
    imageInfo,
    setImageInfo,
    file,
    reloadImages,
    fileInputRef,
    handleFileChange,
    uploadImage,
    removeImage,
    updateImageTimestamp,
  } = useContext(AdminGalleryContext);

  useEffect(() => {
    const getSecondaryGalleryImages = async () => {
      try {
        const imageInfo = await fetch("/api/admin/secondary-gallery").then(
          (res) => res.json()
        );

        setImageInfo(imageInfo);
      } catch (error) {
        console.log(error);
        toast.error(
          "Error! Images could not load. Please try again and contact the developer if the problem persists.",
          toastProps
        );
      } finally {
        RefreshExpirationTime();
      }
    };
    getSecondaryGalleryImages();
  }, [reloadImages, setImageInfo]);

  return (
    <section className="admin-gallery">
      {imageInfo.length !== 0 ? (
        <ul className="admin-gallery__list">
          {imageInfo.map(({ url, filename }, index) => (
            <li key={index} className="admin-gallery__list__item">
              <div
                className="nav-point"
                id={`secondary-gallery-image-${index}`}
              ></div>
              <button
                className="admin-gallery__list__item__delete"
                type="button"
                onClick={() =>
                  removeImage(
                    secondaryGalleryStorageRef,
                    filename,
                    index,
                    "secondary"
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
                  className="admin-gallery__list__item__arrow"
                  type="button"
                  onClick={() =>
                    updateImageTimestamp(
                      secondaryGalleryStorageRef,
                      filename,
                      "secondary"
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
                cssClasses="admin-gallery__list__item__image"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="admin-gallery__empty-list">
          You currently have no images in this gallery. Add a new one below...
        </p>
      )}

      {imageInfo.length < 20 && (
        <form className="admin-gallery__form">
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
            onClick={() => uploadImage(secondaryGalleryStorageRef, "secondary")}
            disabled={!file}
          >
            Upload
          </button>
        </form>
      )}
    </section>
  );
};

export default SecondaryGallerySection;

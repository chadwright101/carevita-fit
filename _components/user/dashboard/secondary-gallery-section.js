"use client";

import { useEffect, useContext, useCallback } from "react";
import Image from "next/image";

import { secondaryGalleryStorageRef } from "@/_firebase/firebase";
import ImageContainer from "@/_components/image-container";
import { AdminGalleryContext } from "@/_context/admin-gallery-context";

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
    getGalleryImages,
  } = useContext(AdminGalleryContext);

  const getSecondaryGalleryImages = useCallback(async () => {
    const newImageInfo = await getGalleryImages(secondaryGalleryStorageRef);
    setImageInfo(newImageInfo);
  }, [getGalleryImages, setImageInfo]);

  useEffect(() => {
    getSecondaryGalleryImages();
  }, [reloadImages, getSecondaryGalleryImages]);

  return (
    <section className="admin-gallery">
      {imageInfo.length !== 0 ? (
        <ul className="admin-gallery__list">
          {imageInfo.map(({ url, filename, timestamp }, index) => (
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
                aria-label="Delete Image"
              >
                <Image
                  src="/icons/close-icon2.svg"
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
                  aria-label="Move Image Up"
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

      {imageInfo.length < 25 && (
        <form className="admin-gallery__form">
          <label htmlFor="upload">Upload new image:</label>
          <input
            ref={fileInputRef}
            name="upload"
            id="upload"
            type="file"
            accept=".webp, .jpeg, .png, .jpg"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="admin-button"
            onClick={() => uploadImage(secondaryGalleryStorageRef, "secondary")}
            disabled={!file}
            aria-label="Upload Image"
          >
            Upload
          </button>
        </form>
      )}
    </section>
  );
};

export default SecondaryGallerySection;

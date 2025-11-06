"use client";

import { useEffect, useContext, useCallback } from "react";
import Image from "next/image";
import { mainGalleryStorageRef } from "@/_firebase/firebase";
import ImageContainer from "@/_components/image-container";
import { AdminGalleryContext } from "@/_context/admin-gallery-context";
import utils from "@/_styles/partials/utils/utils.module.scss";

const MainGallerySection = () => {
  const {
    mainImageInfo,
    setMainImageInfo,
    galleryVersion,
    file,
    fileInputRef,
    handleFileChange,
    uploadImage,
    removeImage,
    updateImageTimestamp,
    getGalleryImages,
    isLoading,
  } = useContext(AdminGalleryContext);

  const getMainGalleryImages = useCallback(async () => {
    const newImageInfo = await getGalleryImages(mainGalleryStorageRef);
    setMainImageInfo(newImageInfo);
  }, [getGalleryImages, setMainImageInfo]);

  useEffect(() => {
    getMainGalleryImages();
  }, [galleryVersion.main, getMainGalleryImages]);

  return (
    <section className="admin-gallery">
      {isLoading ? (
        <div className={utils.spinner}></div>
      ) : mainImageInfo.length !== 0 ? (
        <ul className="admin-gallery__list">
          {mainImageInfo.map(({ url, filename, timestamp }, index) => (
            <li key={index} className="admin-gallery__list__item">
              <div
                className="nav-point"
                id={`main-gallery-image-${index}`}
              ></div>
              <button
                className="admin-gallery__list__item__delete"
                type="button"
                onClick={() =>
                  removeImage(mainGalleryStorageRef, filename, index, "main")
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
                      mainGalleryStorageRef,
                      filename,
                      "main"
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
                timestamp={timestamp}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="admin-gallery__empty-list">
          You currently have no images in this gallery. Add a new one below...
        </p>
      )}

      {mainImageInfo.length < 6 && (
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
            onClick={() => uploadImage(mainGalleryStorageRef, "main")}
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

export default MainGallerySection;

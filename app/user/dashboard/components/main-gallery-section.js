"use client";

import { useEffect, useContext } from "react";
import Image from "next/image";

import { list, getDownloadURL, getMetadata } from "firebase/storage";

import { mainGalleryStorageRef } from "@/app/_firebase/firebase";
import ImageContainer from "@/app/_components/image-container";
import { AdminGalleryContext } from "@/app/_context/admin-gallery-context";

const MainGallerySection = () => {
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
    const getMainGalleryImages = async () => {
      try {
        const res = await list(mainGalleryStorageRef, { maxResults: 6 });

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

        setImageInfo(imageInfo);
      } catch (error) {
        console.log(error);
      }
    };
    getMainGalleryImages();
  }, [reloadImages, setImageInfo]);

  return (
    <section className="admin-gallery">
      {imageInfo.length !== 0 ? (
        <ul className="admin-gallery__list">
          {imageInfo.map(({ url, filename }, index) => (
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

      {imageInfo.length < 6 && (
        <form className="admin-gallery__form">
          <label htmlFor="upload">Upload new image:</label>
          <input
            ref={fileInputRef}
            name="upload"
            id="upload"
            type="file"
            accept=".webp, .jpeg, .png"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="admin-button"
            onClick={() => uploadImage(mainGalleryStorageRef, "main")}
            disabled={!file}
          >
            Upload
          </button>
        </form>
      )}
    </section>
  );
};

export default MainGallerySection;

"use client";

import { useEffect, useState } from "react";

import { listAll, getMetadata, getDownloadURL } from "firebase/storage";

import { secondaryGalleryStorageRef } from "@/app/_firebase/firebase";
import Heading from "@/app/_components/heading";
import BasicSlider from "@/app/_components/sliders/basic-slider";
import LoadingLogo from "@/app/_lib/LoadingLogo";

const Gallery = () => {
  const [secondaryGalleryImageObjects, setSecondaryGalleryImageObjects] =
    useState([]);
  const [secondaryGalleryImageUrls, setSecondaryGalleryImageUrls] = useState(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSecondaryGalleryImages = async () => {
      try {
        const res = await listAll(secondaryGalleryStorageRef);

        const imageInfoPromises = res.items.map(async (itemRef) => {
          const metadata = await getMetadata(itemRef);
          const url = await getDownloadURL(itemRef);
          return {
            url,
            timestamp: metadata.customMetadata.timestamp || 0,
          };
        });

        const newImageInfo = await Promise.all(imageInfoPromises);

        newImageInfo.sort((a, b) => b.timestamp - a.timestamp);

        setSecondaryGalleryImageObjects(newImageInfo);
        setSecondaryGalleryImageUrls(
          newImageInfo.map((imageInfo) => imageInfo.url)
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getSecondaryGalleryImages();
  }, [setSecondaryGalleryImageObjects, setSecondaryGalleryImageUrls]);

  return (
    <section className="gallery-section">
      <Heading sectionHeading cssClasses="gallery-section__heading">
        Gallery
      </Heading>
      {loading ? (
        <LoadingLogo section={"gallery-section"} />
      ) : (
        <div className="gallery-section__slider-container">
          <BasicSlider imageList={secondaryGalleryImageUrls} />
        </div>
      )}
    </section>
  );
};

export default Gallery;

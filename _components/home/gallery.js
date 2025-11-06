"use client";

import { useState, useEffect } from "react";
import Heading from "@/_components/heading";
import BasicSlider from "@/_components/sliders/basic-slider";
import { listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { secondaryGalleryStorageRef } from "@/_firebase/firebase";
import { addCacheBustingTimestamp } from "@/_lib/cache-busting-url";
import utils from "@/_styles/partials/utils/utils.module.scss";

const Gallery = () => {
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await listAll(secondaryGalleryStorageRef);

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
        const imageInfo = await Promise.all(imageInfoPromises);

        const sortedImageData = imageInfo
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((imageInfo) => addCacheBustingTimestamp(imageInfo.url, imageInfo.timestamp));

        setImageData(sortedImageData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="gallery-section">
      <Heading sectionHeading cssClasses="gallery-section__heading">
        Gallery
      </Heading>
      {loading ? (
        <div className="gallery-section__slider-container">
          <div className={utils.spinner}></div>
        </div>
      ) : (
        <div className="gallery-section__slider-container">
          <BasicSlider imageList={imageData} />
        </div>
      )}
    </section>
  );
};
export default Gallery;

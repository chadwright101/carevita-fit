"use client";

import { useState, useEffect } from "react";
import HeroSlider from "@/_components/sliders/hero-slider";
import { listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { mainGalleryStorageRef } from "@/_firebase/firebase";
import { addCacheBustingTimestamp } from "@/_lib/cache-busting-url";
import utils from "@/_styles/partials/utils/utils.module.scss";

const Hero = () => {
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await listAll(mainGalleryStorageRef);

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
        console.error("Error fetching hero images:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="hero-section">
        <div className="hero-section__slider-container">
          <div className={utils.spinner}></div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section">
      <div className="hero-section__slider-container">
        <HeroSlider imageList={imageData} />
      </div>
    </section>
  );
};

export default Hero;

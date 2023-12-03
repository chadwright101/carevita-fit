"use client";

import { useEffect, useState } from "react";

import { listAll, getMetadata, getDownloadURL } from "firebase/storage";

import { mainGalleryStorageRef } from "@/app/_firebase/firebase";
import HeroSlider from "@/app/_components/sliders/hero-slider";
import LoadingLogo from "@/app/_lib/LoadingLogo";

const Hero = () => {
  const [mainGalleryImageObjects, setMainGalleryImageObjects] = useState([]);
  const [mainGalleryImageUrls, setMainGalleryImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHeroImages = async () => {
      try {
        const storageResponse = await listAll(mainGalleryStorageRef);

        const imageInfoPromises = storageResponse.items.map(async (itemRef) => {
          const metadata = await getMetadata(itemRef);
          const url = await getDownloadURL(itemRef);
          return {
            url,
            timestamp: metadata.customMetadata.timestamp || 0,
          };
        });

        const newImageInfo = await Promise.all(imageInfoPromises);

        newImageInfo.sort((a, b) => b.timestamp - a.timestamp);

        setMainGalleryImageObjects(newImageInfo);
        setMainGalleryImageUrls(newImageInfo.map((imageInfo) => imageInfo.url));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getHeroImages();
  }, [setMainGalleryImageObjects, setMainGalleryImageUrls]);

  return (
    <section className="hero-section">
      <div className="hero-section__slider-container">
        {loading ? (
          <LoadingLogo section={"gallery-section"} />
        ) : (
          <HeroSlider imageList={mainGalleryImageUrls} />
        )}
      </div>
    </section>
  );
};

export default Hero;

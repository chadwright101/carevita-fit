"use client";

import { useEffect, useState } from "react";

import HeroSlider from "@/app/_components/sliders/hero-slider";
import LoadingLogo from "@/app/_lib/LoadingLogo";

const Hero = () => {
  const [mainGalleryImageObjects, setMainGalleryImageObjects] = useState([]);
  const [mainGalleryImageUrls, setMainGalleryImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHeroImages = async () => {
      const newImageInfo = await fetch("/api/home/hero").then((res) =>
        res.json()
      );
      setMainGalleryImageObjects(newImageInfo);
      setMainGalleryImageUrls(newImageInfo.map((imageInfo) => imageInfo.url));
      setLoading(false);
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

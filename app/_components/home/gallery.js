"use client";

import { useEffect, useState } from "react";

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
      const newImageInfo = await fetch("/api/home/gallery").then((res) =>
        res.json()
      );
      setSecondaryGalleryImageObjects(newImageInfo);
      setSecondaryGalleryImageUrls(
        newImageInfo.map((imageInfo) => imageInfo.url)
      );
      setLoading(false);
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

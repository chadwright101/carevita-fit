"use client";

import { useEffect, useState } from "react";
import { listAll, getDownloadURL, getMetadata } from "firebase/storage";

import { toast } from "react-toastify";
import { toastProps } from "@/app/_context/admin-testimonial-context";

import Heading from "@/app/_components/heading";
import BasicSlider from "@/app/_components/sliders/basic-slider";

import { secondaryGalleryStorageRef } from "@/app/api/firebase/route";
import ImageContainer from "../../image-container";

const Gallery = () => {
  const [secondaryGalleryImageData, setSecondaryGalleryImageData] = useState(
    []
  );
  const [loadLogo, setLoadLogo] = useState(false);
  useEffect(() => {
    const getSecondaryGalleryImages = async () => {
      try {
        setLoadLogo(true);
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

        setSecondaryGalleryImageData(newImageInfo);
        setLoadLogo(false);

        const sortedImageUrls = newImageInfo.map(
          (secondaryGalleryImageData) => secondaryGalleryImageData.url
        );

        setSecondaryGalleryImageData(sortedImageUrls);
      } catch (error) {
        console.log(error);
        toast.error(
          "Error! Images could not load. Please try again and contact the developer if the problem persists.",
          toastProps
        );
      }
    };

    getSecondaryGalleryImages();
  }, [setSecondaryGalleryImageData]);

  return (
    <section className="gallery-section">
      <Heading sectionHeading cssClasses="gallery-section__heading">
        Gallery
      </Heading>
      <div className="gallery-section__slider-container">
        {loadLogo ? (
          <div className="gallery-section__slider-container__logo">
            <ImageContainer
              src="/carevita-fit-logo.jpg"
              alt="CareVita #fit logo"
              width={400}
              height={400}
            />
          </div>
        ) : (
          <BasicSlider imageList={secondaryGalleryImageData} />
        )}
      </div>
    </section>
  );
};

export default Gallery;

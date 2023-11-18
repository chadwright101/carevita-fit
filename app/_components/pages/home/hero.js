"use client";

import { useContext, useEffect, useState } from "react";
import { listAll, getDownloadURL, getMetadata } from "firebase/storage";

import { toast } from "react-toastify";
import { toastProps } from "@/app/_context/admin-testimonial-context";

import HeroSlider from "@/app/_components/sliders/hero-slider";

import data from "@/app/_data/general-data.json";
import { AdminGalleryContext } from "@/app/_context/admin-gallery-context";
import { heroSlideshowStorageRef } from "../admin/hero-section";
import ImageContainer from "../../image-container";

const {
  homePage: {
    hero: { paragraph },
  },
} = data;

const Hero = () => {
  const { heroImageInfo, setHeroImageInfo } = useContext(AdminGalleryContext);
  const [loadLogo, setLoadLogo] = useState(false);
  useEffect(() => {
    const getHeroImages = async () => {
      try {
        setLoadLogo(true);
        const res = await listAll(heroSlideshowStorageRef);

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

        setHeroImageInfo(newImageInfo);
        setLoadLogo(false);

        const sortedImageUrls = newImageInfo.map((imageInfo) => imageInfo.url);

        setHeroImageInfo(sortedImageUrls);
      } catch (error) {
        console.log(error);
        toast.error(
          "Error! Images could not load. Please try again and contact the developer if the problem persists.",
          toastProps
        );
      }
    };

    getHeroImages();
  }, [setHeroImageInfo]);

  return (
    <section className="hero-section">
      <div className="hero-section__slider-container">
        {loadLogo ? (
          <ImageContainer
            src="/carevita-fit-logo.jpg"
            alt="CareVita #fit logo"
            width={400}
            height={400}
            cssClasses="hero-section__slider-container__logo"
          />
        ) : (
          <HeroSlider imageList={heroImageInfo} />
        )}
      </div>
      <div className="hero-section__hero-text">
        <h2 className="white-text">{paragraph[0]}</h2>
        <h2 className="white-text">{paragraph[1]}</h2>
      </div>
    </section>
  );
};

export default Hero;

"use client";

import { useContext, useEffect, useState } from "react";
import { listAll, getDownloadURL } from "firebase/storage";

import { toast } from "react-toastify";
import { toastProps } from "@/app/_context/testimonial-context";

import HeroSlider from "@/app/_components/sliders/hero-slider";

import data from "@/app/_data/general-data.json";
import { HeroGalleryContext } from "@/app/_context/hero-gallery-context";
import { heroSlideshowStorageRef } from "@/app/_context/hero-gallery-context";
import ImageContainer from "../../image-container";

const {
  homePage: {
    hero: { paragraph },
  },
} = data;

const Hero = () => {
  const { heroImageInfo, setHeroImageInfo } = useContext(HeroGalleryContext);
  const [loadLogo, setLoadLogo] = useState(false);
  useEffect(() => {
    const getHeroImages = async () => {
      try {
        setLoadLogo(true);
        const res = await listAll(heroSlideshowStorageRef);

        const imageInfoPromises = res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return url;
        });

        const newImageInfo = await Promise.all(imageInfoPromises);

        newImageInfo.sort((a, b) => b.timestamp - a.timestamp);

        setHeroImageInfo(newImageInfo);
        setLoadLogo(false);
      } catch (error) {
        console.log(error);
        toast.error(
          "Error! Images could not load. Please try again and contact the developer if the problem persists.",
          toastProps
        );
      }
    };

    getHeroImages();
  }, []);

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

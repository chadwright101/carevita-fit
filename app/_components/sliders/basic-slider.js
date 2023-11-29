"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css/core";
import ImageContainer from "../image-container";

const BasicSlider = ({ imageList }) => {
  return (
    <Splide
      options={{
        type: "fade",
        rewind: true,
        pagination: false,
        perPage: 1,
        speed: 2000,
        interval: 5000,
        autoplay: true,
        drag: false,
        arrows: true,
        breakpoints: {
          900: {
            arrows: false,
            drag: true,
          },
        },
      }}
      className="slider"
    >
      {imageList.map((url, index) => (
        <SplideSlide key={index}>
          <ImageContainer
            src={url}
            alt={`CareVita #fit - Image ${index + 1}`}
            width={900}
            height={500}
            smallest={100}
            desktop={95}
          />
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default BasicSlider;

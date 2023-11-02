"use client";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

import "@splidejs/react-splide/css/core";
import ImageContainer from "@/app/_components/image-container";

const HeroSlider = ({ imageList }) => {
  return (
    <Splide
      options={{
        autoplay: true,
        type: "fade",
        interval: 5000,
        rewind: true,
        drag: false,
        dragMinThreshold: { mouse: 50, touch: 150 },
        breakpoints: {
          900: {
            arrows: false,
            drag: true,
          },
        },
      }}
      hasTrack={false}
    >
      <div className="splide__arrows splide__arrows--ltr">
        <button
          className="splide__arrow splide__arrow--prev"
          type="button"
          aria-label="Previous slide"
          aria-controls="splide02-track"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            width="40"
            height="40"
            focusable="false"
          >
            <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path>
          </svg>
        </button>
        <button
          className="splide__arrow splide__arrow--next"
          type="button"
          aria-label="Next slide"
          aria-controls="splide02-track"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            width="40"
            height="40"
            focusable="false"
          >
            <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path>
          </svg>
        </button>
      </div>
      <SplideTrack>
        {imageList.map((url, index) => (
          <SplideSlide key={index}>
            <ImageContainer
              src={url}
              alt={`CareVita #fit - Image ${index + 1}`}
              width={1400}
              height={1000}
              smallest={100}
              desktop={95}
              eager={index < 2 ? true : false}
            />
          </SplideSlide>
        ))}
      </SplideTrack>
    </Splide>
  );
};

export default HeroSlider;

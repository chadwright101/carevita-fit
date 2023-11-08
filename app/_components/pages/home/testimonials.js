"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";

import Heading from "@/app/_components/heading";

import data from "@/app/_data/general-data.json";

import "@splidejs/react-splide/css/core";

const {
  homePage: { testimonials },
} = data;

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <Heading sectionHeading cssClasses="testimonials-section__heading">
        Testimonials
      </Heading>
      <Splide
        options={{
          type: "loop",
          autoplay: true,
          speed: 2000,
          interval: 5500,
          dragMinThreshold: { mouse: 50, touch: 150 },
          arrows: true,
          pauseOnHover: true,
          gap: "2rem",
          drag: false,
          breakpoints: {
            1100: {
              arrows: false,
              drag: true,
            },
          },
        }}
      >
        {testimonials.map(({ name: person, paragraph }, index) => (
          <SplideSlide key={index}>
            <article className="testimonials-section__container">
              <blockquote className="testimonials-section__quote">
                <span className="testimonials-section__quotation-marks">
                  &#8220;
                </span>
                {paragraph}
                <span className="testimonials-section__quotation-marks">
                  &#8221;
                </span>
              </blockquote>
              <cite className="testimonials-section__name">{person}</cite>
            </article>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
};

export default Testimonials;

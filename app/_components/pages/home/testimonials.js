"use client";

import { useState, useEffect } from "react";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { getDocs } from "firebase/firestore";
import { testimonialsCollectionRef } from "../admin/testimonials-section";

import Heading from "@/app/_components/heading";

import "@splidejs/react-splide/css/core";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const getTestimonials = async () => {
      const testimonialsData = await getDocs(testimonialsCollectionRef);
      setTestimonials(
        testimonialsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getTestimonials();
  }, [testimonialsCollectionRef]);
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

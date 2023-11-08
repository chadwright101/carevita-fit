"use client";

import { useState, useEffect } from "react";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/_firebase/firebase";

import Heading from "@/app/_components/heading";

import "@splidejs/react-splide/css/core";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const testimonialsCollectionRef = collection(db, "testimonials");

  useEffect(() => {
    const getTestimonials = async () => {
      const testimonialsData = await getDocs(testimonialsCollectionRef);
      setTestimonials(
        testimonialsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getTestimonials();
  }, []);
  return (
    <section className="testimonials-section">
      <Heading sectionHeading>Testimonials</Heading>
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
            <article>
              <blockquote>
                <span className="quotation-marks">&#8220;</span>
                {paragraph}
                <span className="quotation-marks">&#8221;</span>
              </blockquote>
              <cite>{person}</cite>
            </article>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
};

export default Testimonials;

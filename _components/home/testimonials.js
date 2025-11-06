"use client";

import { useContext } from "react";
import { TestimonialsContext } from "@/_context/testimonials-context";
import Heading from "@/_components/heading";
import TestimonialSlider from "../sliders/testimonial-slider";
import utils from "@/_styles/partials/utils/utils.module.scss";

const Testimonials = () => {
  const { testimonials, isLoading } = useContext(TestimonialsContext);

  if (isLoading) {
    return (
      <section className="testimonials-section">
        <Heading sectionHeading cssClasses="testimonials-section__heading">
          Testimonials
        </Heading>
        <div className={utils.spinnerWhite}></div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="testimonials-section">
        <Heading sectionHeading cssClasses="testimonials-section__heading">
          Testimonials
        </Heading>
        <p>No testimonials found.</p>
      </section>
    );
  }

  return (
    <section className="testimonials-section">
      <Heading sectionHeading cssClasses="testimonials-section__heading">
        Testimonials
      </Heading>
      <TestimonialSlider testimonialData={testimonials} />
    </section>
  );
};

export default Testimonials;

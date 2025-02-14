import { getDocs, orderBy, query } from "firebase/firestore";

import { testimonialsCollectionRef } from "@/app/_firebase/firebase";
import Heading from "@/app/_components/heading";
import TestimonialSlider from "../sliders/testimonial-slider";

const Testimonials = async () => {
  const fetchData = async () => {
    try {
      const q = query(testimonialsCollectionRef, orderBy("timestamp", "desc"));
      const testimonialsData = await getDocs(q);

      const sortedTestimonials = testimonialsData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return sortedTestimonials;
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return [];
    }
  };

  const testimonialData = await fetchData();

  if (!testimonialData || testimonialData.length === 0) {
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
      <TestimonialSlider testimonialData={testimonialData} />
    </section>
  );
};

export default Testimonials;

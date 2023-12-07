import { getDocs } from "firebase/firestore";

import { testimonialsCollectionRef } from "@/app/_firebase/firebase";
import Heading from "@/app/_components/heading";
import TestimonialSlider from "../sliders/testimonial-slider";

const Testimonials = async () => {
  const fetchData = async () => {
    try {
      const testimonialsData = await getDocs(testimonialsCollectionRef);

      const sortedTestimonials = testimonialsData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return sortedTestimonials;
    } catch (error) {
      console.error("Error fetching hero images:", error);
    }
  };

  const testimonialData = await fetchData();

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

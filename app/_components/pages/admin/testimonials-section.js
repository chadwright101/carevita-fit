"use client";

import { useContext, useEffect } from "react";

import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/app/_firebase/firebase";

import Heading from "@/app/_components/heading";
import { TestimonialContext } from "@/app/_context/testimonial-context";

export const testimonialsCollectionRef = collection(db, "testimonials");

const TestimonialsSection = () => {
  const {
    testimonialsArray,
    setTestimonialsArray,
    editIndex,
    editedName,
    setEditedName,
    editedParagraph,
    setEditedParagraph,
    newTestimonialName,
    setNewTestimonialName,
    newTestimonialParagraph,
    setNewTestimonialParagraph,
    handleTestimonialEdit,
    handleTestimonialSave,
    handleTestimonialDelete,
    handleTestimonialCancel,
    handleTestimonialAdd,
    updateTestimonialTimeStamp,
    getTestimonialIsLoading,
    setGetTestimonialIsLoading,
  } = useContext(TestimonialContext);

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        setGetTestimonialIsLoading(true);
        const q = query(
          testimonialsCollectionRef,
          orderBy("timestamp", "desc")
        );
        const testimonialsData = await getDocs(q);
        const sortedTestimonials = testimonialsData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTestimonialsArray(sortedTestimonials);
        setGetTestimonialIsLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setGetTestimonialIsLoading(false);
      }
    };

    getTestimonials();

    const unsubscribeTestimonials = onSnapshot(
      testimonialsCollectionRef,
      (snapshot) => {
        const updatedTestimonials = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        updatedTestimonials.sort((a, b) => b.timestamp - a.timestamp);

        setTestimonialsArray(updatedTestimonials);
      }
    );

    return () => unsubscribeTestimonials();
  }, []);

  return (
    <section className="admin-testimonials-section">
      <Heading subheading cssClasses="admin-testimonials-section__heading">
        Testimonials <span>(maximum 10 entries)</span>
      </Heading>
      {testimonialsArray.length === 0 && getTestimonialIsLoading ? (
        <div className="spinner"></div>
      ) : testimonialsArray.length !== 0 && !getTestimonialIsLoading ? (
        <ol className="testimonial-list">
          {testimonialsArray.map(({ name: person, paragraph, id }, index) => (
            <li className="testimonial-list__item" key={id}>
              <div id={`testimonial-${index}`} className="nav-point"></div>
              {editIndex === index ? (
                <>
                  <p className="testimonial-list__item__index">{index + 1}</p>
                  <form>
                    <label htmlFor="name">Client&apos;s name:</label>
                    <input
                      className="testimonial-list__item__edit-name"
                      name="name"
                      id="name"
                      type="text"
                      value={editedName}
                      onChange={(event) => setEditedName(event.target.value)}
                      required
                    />
                    <label htmlFor="testimonial">Testimonial:</label>
                    <textarea
                      className="testimonial-list__item__edit-paragraph"
                      name="testimonial"
                      id="testimonial"
                      value={editedParagraph}
                      onChange={(event) =>
                        setEditedParagraph(event.target.value)
                      }
                      maxLength={500}
                      rows={5}
                      required
                    />
                  </form>
                  <div className="testimonial-list__item__edit-buttons">
                    <button
                      onClick={() => handleTestimonialSave(id)}
                      className="admin-button"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleTestimonialCancel()}
                      className="admin-button"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="testimonial-list__item__index">{index + 1}</p>
                  <div className="testimonial-list__item__display">
                    <p>&#8220;{paragraph}&#8221;</p>
                    <p>{person}</p>
                  </div>
                  {editIndex !== null ? null : (
                    <div className="testimonial-list__item__edit-buttons">
                      <button
                        onClick={() => handleTestimonialEdit(index)}
                        className="admin-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleTestimonialDelete(id)}
                        className="admin-button"
                      >
                        Delete
                      </button>
                      <div className="testimonial-list__item__arrow">
                        {index > 0 ? (
                          <button
                            type="button"
                            onClick={() =>
                              updateTestimonialTimeStamp(id, index)
                            }
                          >
                            <img
                              src="/icons/up-arrow.svg"
                              alt="Move testimonial to start"
                            />
                          </button>
                        ) : null}
                      </div>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <p className="admin-testimonials-section__empty-list">
          You currently have no testimonials. Add a new one below...
        </p>
      )}
      {testimonialsArray.length < 10 && editIndex === null ? (
        <div className="admin-testimonials-section__add-testimonial">
          <Heading
            subheading
            cssClasses="admin-testimonials-section__add-testimonial__heading"
          >
            Add new testimonial
          </Heading>
          <form
            className="admin-testimonials-section__add-testimonial__form"
            onSubmit={handleTestimonialAdd}
          >
            <label htmlFor="testimonial">
              Testimonial:
              <textarea
                name="testimonial"
                id="testimonial"
                placeholder="Add your testimonial here... (Maximum 300 characters)"
                value={newTestimonialParagraph}
                onChange={(event) =>
                  setNewTestimonialParagraph(event.target.value)
                }
                maxLength={300}
                rows={5}
                required
              />
            </label>
            <label htmlFor="name">
              Name:
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Add your client's full name here..."
                value={newTestimonialName}
                onChange={(event) => setNewTestimonialName(event.target.value)}
                required
              />
            </label>
            <button className="admin-button" type="submit">
              Add Testimonial
            </button>
          </form>
        </div>
      ) : null}
    </section>
  );
};

export default TestimonialsSection;

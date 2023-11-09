"use client";

import { useContext, useEffect } from "react";

import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/app/_firebase/firebase";

import Heading from "@/app/_components/heading";
import { AdminContext } from "@/app/_context/admin-contect";

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
    moveTestimonialUp,
    moveTestimonialDown,
  } = useContext(AdminContext);

  useEffect(() => {
    const getTestimonials = async () => {
      const testimonialsData = await getDocs(testimonialsCollectionRef);
      setTestimonialsArray(
        testimonialsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getTestimonials();

    const unsubscribeTestimonials = onSnapshot(
      testimonialsCollectionRef,
      (snapshot) => {
        const updatedTestimonials = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTestimonialsArray(updatedTestimonials);
      }
    );

    return () => unsubscribeTestimonials();
  }, []);

  return (
    <div className="admin-testimonials-section">
      <Heading subheading cssClasses="admin-testimonials-section__heading">
        Testimonials <span>(maximum 10 entries)</span>
      </Heading>
      <ol className="testimonial-list">
        {testimonialsArray.map(({ name: person, paragraph, id }, index) => (
          <li className="testimonial-list__item" key={id}>
            <div id={`testimonial-${index}`} className="nav-point"></div>
            {editIndex === index ? (
              <>
                <p className="testimonial-list__item__index">{index + 1}</p>
                <form action="">
                  <label htmlFor="name">Client&apos;s name:</label>
                  <input
                    className="testimonial-list__item__edit-name"
                    name="name"
                    id="name"
                    type="text"
                    value={editedName}
                    onChange={(event) => setEditedName(event.target.value)}
                  />
                  <label htmlFor="testimonial">Testimonial:</label>
                  <textarea
                    className="testimonial-list__item__edit-paragraph"
                    name="testimonial"
                    id="testimonial"
                    value={editedParagraph}
                    onChange={(event) => setEditedParagraph(event.target.value)}
                    maxLength={300}
                    rows={5}
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
                    <div className="testimonial-list__item__arrows">
                      {index > 0 ? (
                        <button onClick={() => moveTestimonialUp(index)}>
                          &uarr;
                        </button>
                      ) : null}
                      {index < testimonialsArray.length - 1 ? (
                        <button onClick={() => moveTestimonialDown(index)}>
                          &darr;
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
              />
            </label>
            <button className="admin-button" type="submit">
              Add Testimonial
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default TestimonialsSection;

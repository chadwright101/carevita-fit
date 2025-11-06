"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import classNames from "classnames";

import Heading from "@/_components/heading";
import { TestimonialsContext } from "@/_context/testimonials-context";
import useBodyScrollLock from "@/_hooks/use-body-scroll-lock";

const TestimonialsSection = () => {
  const {
    testimonials,
    isLoading,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    updateTestimonialTimestamp,
  } = useContext(TestimonialsContext);

  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedParagraph, setEditedParagraph] = useState("");
  const [editedProperty, setEditedProperty] = useState("");
  const [newTestimonialName, setNewTestimonialName] = useState("");
  const [newTestimonialParagraph, setNewTestimonialParagraph] = useState("");
  const [newTestimonialProperty, setNewTestimonialProperty] = useState("");

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  useBodyScrollLock(editIndex !== null && isMobile);

  const handleTestimonialEdit = (testimonialIndex) => {
    setEditIndex(testimonialIndex);

    const testimonial = testimonials[testimonialIndex];
    setEditedName(testimonial.name);
    setEditedParagraph(testimonial.paragraph);
    setEditedProperty(testimonial.property);

    setTimeout(() => {
      try {
        const element = document.getElementById(
          `testimonial-${testimonialIndex}`
        );
        if (element && typeof element.scrollIntoView === "function") {
          if (document.body.style.overflow !== "hidden") {
            element.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }
      } catch (error) {
        console.error("ScrollIntoView error:", error);
      }
    }, 250);
  };

  const handleTestimonialSave = async (testimonialId) => {
    await updateTestimonial(testimonialId, {
      name: editedName,
      paragraph: editedParagraph,
      property: editedProperty,
    });
    setEditIndex(null);
  };

  const handleTestimonialAddCancel = () => {
    if (
      newTestimonialName ||
      newTestimonialParagraph ||
      newTestimonialProperty
    ) {
      const confirmed = window.confirm(
        "All progress will be lost. Are you sure you want to cancel?"
      );
      if (confirmed) {
        setNewTestimonialName("");
        setNewTestimonialParagraph("");
        setNewTestimonialProperty("");
      }
    }
  };

  const handleTestimonialEditCancel = () => {
    if (
      editedName !== testimonials[editIndex].name ||
      editedParagraph !== testimonials[editIndex].paragraph ||
      editedProperty !== testimonials[editIndex].property
    ) {
      const confirmed = window.confirm(
        "All progress will be lost. Are you sure you want to cancel?"
      );
      if (confirmed) {
        setEditedName(testimonials[editIndex].name);
        setEditedParagraph(testimonials[editIndex].paragraph);
        setEditedProperty(testimonials[editIndex].property);
        setEditIndex(null);
      }
    } else {
      setEditIndex(null);
    }
  };

  const handleTestimonialDelete = async (testimonialId, testimonialIndex) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (confirmed) {
      const success = await deleteTestimonial(testimonialId);
      if (success) {
        setTimeout(() => {
          try {
            const element = document.getElementById(
              `testimonial-${testimonialIndex === 0 ? "0" : testimonialIndex - 1}`
            );
            if (element && typeof element.scrollIntoView === "function" && testimonialIndex) {
              if (document.body.style.overflow !== "hidden") {
                element.scrollIntoView({ behavior: "smooth", block: "nearest" });
              }
            }
          } catch (error) {
            console.error("ScrollIntoView error:", error);
          }
        }, 250);
      }
    }
  };

  const handleTestimonialAdd = async (e) => {
    e.preventDefault();

    const success = await addTestimonial({
      name: newTestimonialName,
      paragraph: newTestimonialParagraph,
      property: newTestimonialProperty,
    });

    if (success) {
      setNewTestimonialName("");
      setNewTestimonialParagraph("");
      setNewTestimonialProperty("");
    }
  };

  const handleMoveToTop = async (testimonialId) => {
    await updateTestimonialTimestamp(testimonialId);
    setTimeout(() => {
      try {
        const element = document.getElementById("testimonial-0");
        if (element && typeof element.scrollIntoView === "function") {
          if (document.body.style.overflow !== "hidden") {
            element.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }
      } catch (error) {
        console.error("ScrollIntoView error:", error);
      }
    }, 250);
  };

  return (
    <section className="admin-testimonials-section">
      <Heading subheading cssClasses="admin-testimonials-section__heading">
        Testimonials <span>(maximum 40 entries)</span>
      </Heading>
      {testimonials.length < 40 && editIndex === null ? (
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
                placeholder="Add your testimonial here... (Maximum 500 characters)"
                value={newTestimonialParagraph}
                onChange={(event) =>
                  setNewTestimonialParagraph(event.target.value)
                }
                maxLength={500}
                rows={5}
                required
              />
              {newTestimonialParagraph.length > 499 && (
                <p className="testimonial-list__item__editing__container__error-message">
                  Testimonial cannot be more than 500 characters.
                </p>
              )}
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
                maxLength={35}
              />
            </label>
            <label htmlFor="property">
              Property:
              <input
                id="property"
                name="property"
                type="text"
                placeholder="Add your client's property here..."
                value={newTestimonialProperty}
                onChange={(event) =>
                  setNewTestimonialProperty(event.target.value)
                }
                required
                maxLength={35}
              />
            </label>
            <div className="admin-testimonials-section__add-testimonial__form__buttons">
              <button className="admin-button" type="submit">
                Add Testimonial
              </button>
              {newTestimonialName ||
              newTestimonialParagraph ||
              newTestimonialProperty ? (
                <button
                  className="admin-button"
                  type="button"
                  onClick={handleTestimonialAddCancel}
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </div>
      ) : null}
      <Heading subheading cssClasses="admin-testimonials-section__subheading">
        Saved testimonials
      </Heading>
      {testimonials.length === 0 && isLoading ? (
        <div className="spinner"></div>
      ) : testimonials.length !== 0 && !isLoading ? (
        <ol className="testimonial-list">
          {testimonials.map(
            ({ name: person, paragraph, property, id }, index) => (
              <li
                className={classNames("", {
                  "testimonial-list__item": editIndex !== index,
                  "testimonial-list__item--desktop-edit-open":
                    editIndex === index,
                })}
                key={id}
              >
                <div className="nav-point" id={`testimonial-${index}`}></div>
                {editIndex === index ? (
                  <div className="testimonial-list__item__editing">
                    <div className="testimonial-list__item__editing__container">
                      <form>
                        <label htmlFor="testimonial">
                          Editing testimonial #{index + 1}:
                        </label>
                        <textarea
                          className="testimonial-list__item__editing__edit-paragraph"
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
                        {editedParagraph.length > 499 && (
                          <p className="testimonial-list__item__editing__container__error-message">
                            Testimonial cannot be more than 500 characters.
                          </p>
                        )}
                        <label htmlFor="name">Client&apos;s name:</label>
                        <input
                          className="testimonial-list__item__editing__edit-name"
                          name="name"
                          id="name"
                          type="text"
                          value={editedName}
                          onChange={(event) => setEditedName(event.target.value)}
                          required
                          maxLength={35}
                        />
                        <label htmlFor="property">Property:</label>
                        <input
                          className="testimonial-list__item__editing__edit-name"
                          name="property"
                          id="property"
                          type="text"
                          value={editedProperty}
                          onChange={(event) =>
                            setEditedProperty(event.target.value)
                          }
                          required
                          maxLength={35}
                        />
                      </form>
                      <div className="testimonial-list__item__editing__edit-buttons">
                        <button
                          onClick={() => handleTestimonialSave(id)}
                          className="admin-button"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => handleTestimonialEditCancel()}
                          className="admin-button"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="testimonial-list__item__index">
                      {index + 1}
                    </p>
                    <div className="testimonial-list__item__display">
                      <p>&#8220;{paragraph}&#8221;</p>
                      <p>{person}</p>
                      <p>{property}</p>
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
                          onClick={() => handleTestimonialDelete(id, index)}
                          className="admin-button"
                        >
                          Delete
                        </button>
                        <div className="testimonial-list__item__arrow">
                          {index !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleMoveToTop(id)}
                            >
                              <Image
                                src="/icons/up-arrow.svg"
                                alt="Move testimonial to start"
                                width={40}
                                height={40}
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            )
          )}
        </ol>
      ) : (
        <p className="admin-testimonials-section__empty-list">
          You currently have no testimonials. Add a new one below...
        </p>
      )}
    </section>
  );
};

export default TestimonialsSection;

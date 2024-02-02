"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { ToastContainer, toast } from "react-toastify";
import { toastProps } from "@/app/_lib/ToastProps";

import {
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import classNames from "classnames";

import Heading from "@/app/_components/heading";
import { db, testimonialsCollectionRef } from "@/app/_firebase/firebase";

import "react-toastify/dist/ReactToastify.css";

const TestimonialsSection = () => {
  const [testimonialsArray, setTestimonialsArray] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedParagraph, setEditedParagraph] = useState("");
  const [editedProperty, setEditedProperty] = useState("");
  const [newTestimonialName, setNewTestimonialName] = useState("");
  const [newTestimonialParagraph, setNewTestimonialParagraph] = useState("");
  const [newTestimonialProperty, setNewTestimonialProperty] = useState("");
  const [getTestimonialIsLoading, setGetTestimonialIsLoading] = useState(false);

  const handleTestimonialEdit = (testimonialIndex) => {
    setEditIndex(testimonialIndex);

    const testimonial = testimonialsArray[testimonialIndex];
    setEditedName(testimonial.name);
    setEditedParagraph(testimonial.paragraph);
    setEditedProperty(testimonial.property);

    setTimeout(() => {
      const element = document.getElementById(
        `testimonial-${testimonialIndex}`
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
  };

  const handleTestimonialSave = async (testimonialId) => {
    try {
      await updateDoc(doc(db, "testimonials", testimonialId), {
        name: editedName,
        paragraph: editedParagraph,
        property: editedProperty,
      });
      setEditIndex(null);
      toast.success("Success! Testimonial saved.", toastProps);
    } catch (error) {
      toast.error(
        "Error! Testimonial could not be saved. Please try again and contact the developer if the problem persists.",
        toastProps
      );
      console.log(error);
    }
  };

  const handleTestimonialAddCancel = () => {
    setNewTestimonialName("");
    setNewTestimonialParagraph("");
    setNewTestimonialProperty("");
  };

  const handleTestimonialEditCancel = () => {
    if (
      editedName !== testimonialsArray[editIndex].name ||
      editedParagraph !== testimonialsArray[editIndex].paragraph ||
      editedProperty !== testimonialsArray[editIndex].property
    ) {
      const confirmed = window.confirm(
        "All progress will be lost. Are you sure you want to cancel?"
      );
      if (confirmed) {
        setEditedName(testimonialsArray[editIndex].name);
        setEditedParagraph(testimonialsArray[editIndex].paragraph);
        setEditedProperty(testimonialsArray[editIndex].property);
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
      try {
        await deleteDoc(doc(db, "testimonials", testimonialId));
        setTestimonialsArray(
          testimonialsArray.filter((t) => t.id !== testimonialId)
        );
        toast.success("Success! Testimonial deleted.", toastProps);
      } catch (error) {
        toast.error(
          "Error! Testimonial could not be deleted. Please try again and contact the developer if the problem persists.",
          toastProps
        );
        console.log(error);
      } finally {
        setTimeout(() => {
          const element = document.getElementById(
            `testimonial-${testimonialIndex === 0 ? "0" : testimonialIndex - 1}`
          );
          if (testimonialIndex) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 250);
      }
    }
  };

  const handleTestimonialAdd = async (e) => {
    e.preventDefault();

    try {
      const newTestimonial = {
        name: newTestimonialName,
        paragraph: newTestimonialParagraph,
        property: newTestimonialProperty,
        timestamp: new Date().getTime(),
      };

      const docRef = await addDoc(testimonialsCollectionRef, newTestimonial);

      setNewTestimonialName("");
      setNewTestimonialParagraph("");
      setNewTestimonialProperty("");
      toast.success("Success! Testimonial added.", toastProps);
    } catch (error) {
      toast.error(
        "Error! Testimonial could not be added. Please try again and contact the developer if the problem persists."
      );
      console.log(error);
    }
  };

  const updateTestimonialTimeStamp = async (testimonialId) => {
    try {
      const updatedTimestamp = new Date().getTime();
      await updateDoc(doc(db, "testimonials", testimonialId), {
        timestamp: updatedTimestamp,
      });
      toast.success(
        "Success! Testimonial moved to the top of the list.",
        toastProps
      );
    } catch (error) {
      toast.error(
        "Error! Testimonial could not be saved. Please try again and contact the developer if the problem persists.",
        toastProps
      );
      console.log(error);
    } finally {
      setTimeout(() => {
        const element = document.getElementById("testimonial-0");
        element.scrollIntoView({ behavior: "smooth" });
      }, 250);
    }
  };

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        setGetTestimonialIsLoading(true);
        const q = query(
          testimonialsCollectionRef,
          orderBy("timestamp", "desc")
        );
        const testimonialsData = await getDocs(q);
        const testimonials = testimonialsData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sortedTestimonials = testimonials.sort(
          (a, b) => b.timestamp - a.timestamp
        );

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
  }, [setGetTestimonialIsLoading, setTestimonialsArray]);

  return (
    <>
      <section className="admin-testimonials-section">
        <Heading subheading cssClasses="admin-testimonials-section__heading">
          Testimonials <span>(maximum 20 entries)</span>
        </Heading>
        {testimonialsArray.length < 20 && editIndex === null ? (
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
                  onChange={(event) =>
                    setNewTestimonialName(event.target.value)
                  }
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
        {testimonialsArray.length === 0 && getTestimonialIsLoading ? (
          <div className="spinner"></div>
        ) : testimonialsArray.length !== 0 && !getTestimonialIsLoading ? (
          <ol className="testimonial-list">
            {testimonialsArray.map(
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
                            onChange={(event) =>
                              setEditedName(event.target.value)
                            }
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
                                onClick={() =>
                                  updateTestimonialTimeStamp(id, index)
                                }
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
      <ToastContainer />
    </>
  );
};

export default TestimonialsSection;

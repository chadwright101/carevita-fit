"use client";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/app/_firebase/firebase";

import Heading from "@/app/_components/heading";

const TestimonialsSection = () => {
  const [testimonialsArray, setTestimonialsArray] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedParagraph, setEditedParagraph] = useState("");
  const [newTestimonialName, setNewTestimonialName] = useState("");
  const [newTestimonialParagraph, setNewTestimonialParagraph] = useState("");

  const testimonialsCollectionRef = collection(db, "testimonials");

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

  const handleTestimonialEdit = (testimonialIndex) => {
    setEditIndex(testimonialIndex);
    const testimonial = testimonialsArray[testimonialIndex];
    setEditedName(testimonial.name);
    setEditedParagraph(testimonial.paragraph);
  };

  const handleTestimonialSave = async (testimonialId) => {
    try {
      await updateDoc(doc(db, "testimonials", testimonialId), {
        name: editedName,
        paragraph: editedParagraph,
      });
      setEditIndex(null);
    } catch (error) {
      alert("Failed to update testimonial:");
    }
  };

  const handleTestimonialCancel = () => {
    if (
      editedName !== testimonialsArray[editIndex].name ||
      editedParagraph !== testimonialsArray[editIndex].paragraph
    ) {
      const confirmed = window.confirm(
        "All progress will be lost. Are you sure you want to cancel?"
      );
      if (confirmed) {
        setEditedName(testimonialsArray[editIndex].name);
        setEditedParagraph(testimonialsArray[editIndex].paragraph);
        setEditIndex(null);
      }
    } else {
      setEditIndex(null);
    }
  };

  const handleTestimonialDelete = async (testimonialId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (confirmed) {
      try {
        await deleteDoc(doc(db, "testimonials", testimonialId));
        setTestimonialsArray(
          testimonialsArray.filter((t) => t.id !== testimonialId)
        );
      } catch (error) {
        alert("Failed to delete testimonial:");
      }
    }
  };

  const handleTestimonialAdd = async (e) => {
    e.preventDefault();

    if (testimonialsArray.length >= 10) {
      alert("You have reached the maximum limit of testimonials.");
      return;
    }

    try {
      const newTestimonial = {
        name: newTestimonialName,
        paragraph: newTestimonialParagraph,
      };
      const docRef = await addDoc(testimonialsCollectionRef, newTestimonial);
      setTestimonialsArray([
        ...testimonialsArray,
        { ...newTestimonial, id: docRef.id },
      ]);
      setNewTestimonialName("");
      setNewTestimonialParagraph("");
    } catch (error) {
      alert("Failed to add testimonial:");
    }
  };

  const moveTestimonialUp = (testimonialIndex) => {
    if (testimonialIndex > 0) {
      const updatedArray = [...testimonialsArray];
      const [testimonialToMove] = updatedArray.splice(testimonialIndex, 1);
      updatedArray.splice(testimonialIndex - 1, 0, testimonialToMove);
      setTestimonialsArray(updatedArray);
    }
  };

  const moveTestimonialDown = (testimonialIndex) => {
    if (testimonialIndex < testimonialsArray.length - 1) {
      const updatedArray = [...testimonialsArray];
      const [testimonialToMove] = updatedArray.splice(testimonialIndex, 1);
      updatedArray.splice(testimonialIndex + 1, 0, testimonialToMove);
      setTestimonialsArray(updatedArray);
    }
  };

  return (
    <div className="admin-testimonials-section">
      <Heading subheading>Testimonials</Heading>
      <ol>
        {testimonialsArray.map(({ name: person, paragraph, id }, index) => (
          <li key={id}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(event) => setEditedName(event.target.value)}
                />
                <textarea
                  value={editedParagraph}
                  onChange={(event) => setEditedParagraph(event.target.value)}
                ></textarea>
                <button
                  className="admin-button"
                  id="testimonials-save-button"
                  onClick={() => handleTestimonialSave(id)}
                >
                  Save
                </button>
                <button
                  className="admin-button"
                  id="testimonials-cancel-button"
                  onClick={() => handleTestimonialCancel()}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="list-with-arrows">
                  <div className="reorder-buttons">
                    {index > 0 ? (
                      <button
                        id="testimonials-up-button"
                        onClick={() => moveTestimonialUp(index)}
                      >
                        &uarr;
                      </button>
                    ) : null}
                    {index < testimonialsArray.length - 1 ? (
                      <button
                        id="testimonials-down-button"
                        onClick={() => moveTestimonialDown(index)}
                      >
                        &darr;
                      </button>
                    ) : null}
                  </div>
                  <div>
                    <p>
                      Name: <span>{person}</span>
                    </p>
                    <p>Paragraph - {paragraph}</p>
                  </div>
                </div>
                <button
                  className="admin-button"
                  id="testimonials-edit-button"
                  onClick={() => handleTestimonialEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="admin-button"
                  id="testimonials-delete-button"
                  onClick={() => handleTestimonialDelete(id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
      {testimonialsArray.length < 10 ? (
        <form id="admin-add-testimonial-form" onSubmit={handleTestimonialAdd}>
          <input
            type="text"
            placeholder="Name"
            value={newTestimonialName}
            onChange={(event) => setNewTestimonialName(event.target.value)}
          />
          <textarea
            placeholder="Paragraph"
            value={newTestimonialParagraph}
            onChange={(event) => setNewTestimonialParagraph(event.target.value)}
          ></textarea>
          <button className="admin-button" type="submit">
            Add Testimonial
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default TestimonialsSection;

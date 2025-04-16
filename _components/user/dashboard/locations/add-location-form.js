"use client";

import { useState } from "react";
import Image from "next/image";
import { addDoc, updateDoc, doc } from "firebase/firestore";
import {
  db,
  locationsCollectionRef,
  locationsStorageRef,
} from "@/_firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProps } from "@/_lib/ToastProps";

const AddLocationForm = () => {
  const [description, setDescription] = useState("");
  const [heading, setHeading] = useState("");
  const [city, setCity] = useState("");
  const [suburb, setSuburb] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [staffImage, setStaffImage] = useState(null);
  const [staffImagePreview, setStaffImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleStaffImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setStaffImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setStaffImagePreview(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    setImagePreview("");
  };

  const handleStaffImageDelete = () => {
    setStaffImage(null);
    setStaffImagePreview("");
  };

  const resetForm = () => {
    setDescription("");
    setHeading("");
    setCity("");
    setSuburb("");
    setImage(null);
    setImagePreview("");
    setStaffImage(null);
    setStaffImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!heading || !description || !city || !suburb) {
      toast.error("Please fill in all required fields", toastProps);
      return;
    }
    if (!image) {
      toast.error("Please upload a property image", toastProps);
      return;
    }

    setIsSubmitting(true);

    try {
      const newLocation = {
        description,
        heading,
        city,
        suburb,
        image: "",
        staff_image: "",
        timestamp: new Date().getTime(),
      };

      const docRef = await addDoc(locationsCollectionRef, newLocation);

      if (image) {
        const imageRef = ref(locationsStorageRef, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "locations", docRef.id), {
          image: imageUrl,
        });
      }

      if (staffImage) {
        const staffImageRef = ref(
          locationsStorageRef,
          `staff_images/${staffImage.name}`
        );
        await uploadBytes(staffImageRef, staffImage);
        const staffImageUrl = await getDownloadURL(staffImageRef);

        await updateDoc(doc(db, "locations", docRef.id), {
          staff_image: staffImageUrl,
        });
      }

      toast.success("Location added successfully!", toastProps);
      resetForm();
    } catch (error) {
      console.error("Error adding location:", error);
      toast.error("Failed to add location. Please try again.", toastProps);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <h2>Add New Location</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="heading">Property Name:</label>
          <input
            id="heading"
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="suburb">Suburb:</label>
          <input
            id="suburb"
            type="text"
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          >
            <option value="">Select a location</option>
            <option value="Pretoria">Pretoria</option>
            <option value="George">George</option>
            <option value="Mossel Bay">Mossel Bay</option>
          </select>
        </div>

        <div>
          <label htmlFor="image">Property Image:</label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            accept=".jpg,.jpeg,.png,.webp"
          />
          {imagePreview && (
            <div>
              <Image
                src={imagePreview}
                alt="Property Image Preview"
                width={100}
                height={100}
              />
              <button type="button" onClick={handleImageDelete}>
                Remove Image
              </button>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="staffImage">Staff Image:</label>
          <input
            id="staffImage"
            type="file"
            onChange={handleStaffImageChange}
            accept=".jpg,.jpeg,.png,.webp"
          />
          {staffImagePreview && (
            <div>
              <Image
                src={staffImagePreview}
                alt="Staff Image Preview"
                width={100}
                height={100}
              />
              <button type="button" onClick={handleStaffImageDelete}>
                Remove Staff Image
              </button>
            </div>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Location"}
        </button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default AddLocationForm;

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import {
  db,
  locationsCollectionRef,
  locationsStorageRef,
  staffCollectionRef,
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
  const [googleMapsLink, setGoogleMapsLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [staffMembers, setStaffMembers] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const staffQuery = query(
          staffCollectionRef,
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(staffQuery);
        const staffData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStaffMembers(staffData);
      } catch (error) {
        console.error("Error fetching staff members:", error);
        toast.error("Failed to load staff members", toastProps);
      }
    };

    fetchStaffMembers();
  }, []);

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

  const handleImageDelete = () => {
    setImage(null);
    setImagePreview("");
  };

  const fileInputRef = useRef(null);

  const resetForm = () => {
    setDescription("");
    setHeading("");
    setCity("");
    setSuburb("");
    setImage(null);
    setImagePreview("");
    setGoogleMapsLink("");
    setSelectedStaff("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
        googleMapsLink,
        image: "",
        staffMember: selectedStaff || null,
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
          <label htmlFor="googleMapsLink">Google Maps Link (optional):</label>
          <input
            id="googleMapsLink"
            type="url"
            value={googleMapsLink}
            onChange={(e) => setGoogleMapsLink(e.target.value)}
            placeholder="https://maps.google.com/..."
          />
        </div>

        <div>
          <label htmlFor="staffMember">Staff Member (optional):</label>
          <select
            id="staffMember"
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
          >
            <option value="">Select a staff member</option>
            {staffMembers.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="image">Property Image:</label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            accept=".jpg,.jpeg,.png,.webp"
            ref={fileInputRef}
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

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Location"}
        </button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default AddLocationForm;

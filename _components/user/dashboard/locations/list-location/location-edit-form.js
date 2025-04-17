"use client";

import { useState, useEffect } from "react";
import ImageUploader from "./image-uploader";
import { updateLocation } from "./location-service";
import { getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";
import { staffCollectionRef } from "@/_firebase/firebase";
import { toast } from "react-toastify";
import { toastProps } from "@/_lib/ToastProps";

const LocationEditForm = ({ location, onSave, onCancel }) => {
  const [description, setDescription] = useState("");
  const [heading, setHeading] = useState("");
  const [city, setCity] = useState("");
  const [suburb, setSuburb] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [googleMapsLink, setGoogleMapsLink] = useState("");
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
  }, [location]);

  useEffect(() => {
    if (location) {
      setDescription(location.description || "");
      setHeading(location.heading || "");
      setCity(location.city || location.location || "");
      setSuburb(location.suburb || "");
      setImageUrl(location.image || "");
      setGoogleMapsLink(
        location.googleMapsLink || location.google_maps_link || ""
      );
      setSelectedStaff(location.staffMember || "");
    }
  }, [location]);

  const handleImageChange = (newImage) => {
    setImage(newImage);
  };

  const handleImageDelete = () => {
    setImage(null);
    setImageUrl("");
  };

  const handleSubmit = async () => {
    const locationData = {
      description,
      heading,
      city,
      suburb,
      googleMapsLink,
      newImage: image,
      imageUrl,
      staffMember: selectedStaff || null,
    };

    const success = await updateLocation(
      location.id,
      locationData,
      location.image
    );
    if (success) {
      onSave();
    }
  };

  return (
    <div className="location-edit-form">
      <div className="form-group">
        <label htmlFor="heading">Heading</label>
        <input
          id="heading"
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">City</label>
        <select
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        >
          <option value="">Select a city</option>
          <option value="Pretoria">Pretoria</option>
          <option value="George">George</option>
          <option value="Mossel Bay">Mossel Bay</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="suburb">Suburb</label>
        <input
          id="suburb"
          type="text"
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="googleMapsLink">Google Maps Link</label>
        <input
          id="googleMapsLink"
          type="url"
          value={googleMapsLink}
          onChange={(e) => setGoogleMapsLink(e.target.value)}
          placeholder="https://maps.google.com/..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="staffMember">Staff Member (optional)</label>
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

      <div className="form-group">
        <label>Location Image</label>
        <ImageUploader
          initialImageUrl={imageUrl}
          onImageChange={handleImageChange}
          onImageDelete={handleImageDelete}
        />
      </div>

      <div className="form-actions">
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default LocationEditForm;

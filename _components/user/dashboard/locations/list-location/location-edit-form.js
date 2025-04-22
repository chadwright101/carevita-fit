"use client";

import { useState, useEffect } from "react";
import ImageUploader from "./image-uploader";
import { updateLocation } from "./location-service";
import { getDocs, query, orderBy } from "firebase/firestore";
import {
  staffCollectionRef,
  locationsCollectionRef,
} from "@/_firebase/firebase";
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
  const [availableCities, setAvailableCities] = useState([]);

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
    const fetchCities = async () => {
      try {
        const querySnapshot = await getDocs(locationsCollectionRef);
        const cities = new Set();

        querySnapshot.docs.forEach((doc) => {
          const cityValue = doc.data().city;
          if (cityValue) {
            cities.add(cityValue);
          }
        });

        const uniqueCities = Array.from(cities).sort();
        setAvailableCities(uniqueCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
        toast.error("Failed to load cities", toastProps);
      }
    };

    fetchCities();
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
    if (!heading || !description || !city || !suburb) {
      toast.error("Please fill in all required fields", toastProps);
      return;
    }

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

    try {
      const success = await updateLocation(
        location.id,
        locationData,
        location.image
      );

      if (success) {
        if (location) {
          location.city = city;
          location.description = description;
          location.heading = heading;
          location.suburb = suburb;
          location.googleMapsLink = googleMapsLink;
          location.staffMember = selectedStaff || null;
        }

        toast.success("Location updated successfully!", toastProps);
        onSave();
      }
    } catch (error) {
      console.error("Error updating location:", error);
      toast.error("Failed to update location. Please try again.", toastProps);
    }
  };

  return (
    <div className="admin-locations__cities__list__item_edit-form">
      <h3>{location.heading}</h3>
      <div className="admin-locations__cities__list__item_edit-form__field-group">
        <label htmlFor="heading">Property name:</label>
        <input
          id="heading"
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
      </div>

      <div className="admin-locations__cities__list__item_edit-form__field-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="8"
        />
      </div>

      <div className="admin-locations__cities__list__item_edit-form__field-group">
        <label htmlFor="city">City:</label>
        <select
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        >
          <option value="">Select a city</option>
          {availableCities.map((cityOption) => (
            <option key={cityOption} value={cityOption}>
              {cityOption}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-locations__cities__list__item_edit-form__field-group">
        <label htmlFor="suburb">Suburb:</label>
        <input
          id="suburb"
          type="text"
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
        />
      </div>

      <div className="admin-locations__cities__list__item_edit-form__field-group">
        <label htmlFor="googleMapsLink">Google Maps Link:</label>
        <input
          id="googleMapsLink"
          type="url"
          value={googleMapsLink}
          onChange={(e) => setGoogleMapsLink(e.target.value)}
          placeholder="https://maps.google.com/..."
        />
      </div>

      <div className="admin-locations__cities__list__item_edit-form__field-group">
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

      <div className="admin-locations__cities__list__item_edit-form__field-group">
        <label>Location Image:</label>
        <ImageUploader
          initialImageUrl={imageUrl}
          onImageChange={handleImageChange}
          onImageDelete={handleImageDelete}
        />
      </div>

      <div className="admin-locations__cities__list__item_edit-form__buttons">
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default LocationEditForm;

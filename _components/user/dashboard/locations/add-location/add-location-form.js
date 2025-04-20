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
  const [availableCities, setAvailableCities] = useState([]);
  const [newCity, setNewCity] = useState("");
  const [addingNewCity, setAddingNewCity] = useState(false);

  // Fetch staff members
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

  // Fetch unique city values
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
  }, []);

  const handleAddNewCity = () => {
    if (!newCity.trim()) {
      toast.error("Please enter a city name", toastProps);
      return;
    }

    // Check if city already exists
    if (availableCities.includes(newCity.trim())) {
      toast.error("This city already exists", toastProps);
      return;
    }

    setAvailableCities((prev) => [...prev, newCity.trim()].sort());
    setCity(newCity.trim());
    setNewCity("");
    setAddingNewCity(false);
    toast.success(
      `Added "${newCity.trim()}" to the list of cities`,
      toastProps
    );
  };

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
    <section className="admin-locations__add-location">
      <h2 className="admin-locations__add-location__heading">
        Add New Location
      </h2>
      <form
        className="admin-locations__add-location__form"
        onSubmit={handleSubmit}
      >
        <div className="admin-locations__add-location__form__field-group">
          <label htmlFor="heading">Property Name:</label>
          <input
            id="heading"
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            required
            placeholder="Enter property name"
          />
        </div>
        <div className="admin-locations__add-location__form__field-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            placeholder="Enter property description"
          />
        </div>
        <div className="admin-locations__add-location__form__field-group">
          <label htmlFor="suburb">Suburb:</label>
          <input
            id="suburb"
            type="text"
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            required
            placeholder="Enter suburb"
          />
        </div>
        <div className="admin-locations__add-location__form__city">
          <label htmlFor="city">City:</label>
          {!addingNewCity ? (
            <div className="admin-locations__add-location__form__city__select-group">
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">Select a location</option>
                {availableCities.map((cityOption) => (
                  <option key={cityOption} value={cityOption}>
                    {cityOption}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => setAddingNewCity(true)}>
                Add New City
              </button>
            </div>
          ) : (
            <div className="admin-locations__add-location__form__city__input-group">
              <input
                type="text"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="Enter new city name"
              />
              <div className="admin-locations__add-location__form__city__input-group__buttons">
                <button type="button" onClick={handleAddNewCity}>
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewCity("");
                    setAddingNewCity(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="admin-locations__add-location__form__field-group">
          <label htmlFor="googleMapsLink">Google Maps Link (optional):</label>
          <input
            id="googleMapsLink"
            type="url"
            value={googleMapsLink}
            onChange={(e) => setGoogleMapsLink(e.target.value)}
            placeholder="https://maps.google.com/..."
          />
        </div>
        <div className="admin-locations__add-location__form__field-group">
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
        <div className="admin-locations__add-location__form__field-group">
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
        <button
          className="admin-locations__add-location__form__submit-button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Submit"}
        </button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default AddLocationForm;

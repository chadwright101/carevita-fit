"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { doc, deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  db,
  locationsCollectionRef,
  locationsStorageRef,
} from "@/_firebase/firebase";
import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProps } from "@/_lib/ToastProps";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLocationId, setEditingLocationId] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedHeading, setEditedHeading] = useState("");
  const [editedCity, setEditedCity] = useState("");
  const [editedSuburb, setEditedSuburb] = useState("");
  const [editedImage, setEditedImage] = useState(null);
  const [editedImageUrl, setEditedImageUrl] = useState("");
  const [editedGoogleMapsLink, setEditedGoogleMapsLink] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(locationsCollectionRef, (snapshot) => {
      const locationsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      locationsData.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setLocations(locationsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (locationId, image) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this location?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "locations", locationId));

      if (image) {
        try {
          const fullPath = image.split(
            "firebasestorage.googleapis.com/v0/b/carevita-fit.appspot.com/o/"
          )[1];
          if (fullPath) {
            const decodedPath = decodeURIComponent(fullPath.split("?")[0]);
            const imageRef = ref(locationsStorageRef, decodedPath);
            await deleteObject(imageRef);
          }
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      }

      toast.success("Location deleted successfully!", toastProps);
    } catch (error) {
      console.error("Error deleting location:", error);
      toast.error("Failed to delete location. Please try again.", toastProps);
    }
  };

  const handleEdit = (locationId) => {
    const locationToEdit = locations.find(
      (location) => location.id === locationId
    );
    if (locationToEdit) {
      setEditedDescription(locationToEdit.description);
      setEditedHeading(locationToEdit.heading);
      setEditedCity(locationToEdit.city);
      setEditedSuburb(locationToEdit.suburb);
      setEditedImageUrl(locationToEdit.image || "");
      setEditedGoogleMapsLink(
        locationToEdit.googleMapsLink || locationToEdit.google_maps_link || ""
      );
    }
    setEditingLocationId(locationId);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditedImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditedImageUrl(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageDelete = () => {
    setEditedImage(null);
    setEditedImageUrl("");
  };

  const handleSave = async (locationId) => {
    try {
      await updateDoc(doc(db, "locations", locationId), {
        description: editedDescription,
        heading: editedHeading,
        location: editedCity,
        suburb: editedSuburb,
        googleMapsLink: editedGoogleMapsLink,
      });

      if (editedImage) {
        const location = locations.find((loc) => loc.id === locationId);
        if (location?.image) {
          try {
            const fullPath = location.image.split(
              "firebasestorage.googleapis.com/v0/b/carevita-fit.appspot.com/o/"
            )[1];
            if (fullPath) {
              const decodedPath = decodeURIComponent(fullPath.split("?")[0]);
              const oldImageRef = ref(locationsStorageRef, decodedPath);
              await deleteObject(oldImageRef);
            }
          } catch (error) {
            console.error("Error deleting old image:", error);
          }
        }
        const imageRef = ref(locationsStorageRef, `images/${editedImage.name}`);
        await uploadBytes(imageRef, editedImage);
        const imageUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "locations", locationId), {
          image: imageUrl,
        });
      } else if (editedImageUrl === "") {
        const location = locations.find((loc) => loc.id === locationId);
        if (location?.image) {
          try {
            const fullPath = location.image.split(
              "firebasestorage.googleapis.com/v0/b/carevita-fit.appspot.com/o/"
            )[1];
            if (fullPath) {
              const decodedPath = decodeURIComponent(fullPath.split("?")[0]);
              const oldImageRef = ref(locationsStorageRef, decodedPath);
              await deleteObject(oldImageRef);
            }
          } catch (error) {
            console.error("Error deleting image:", error);
          }
          await updateDoc(doc(db, "locations", locationId), {
            image: "",
          });
        }
      }

      toast.success("Location updated successfully!", toastProps);
      setEditingLocationId(null);
      setEditedDescription("");
      setEditedHeading("");
      setEditedCity("");
      setEditedSuburb("");
      setEditedImage(null);
      setEditedImageUrl("");
    } catch (error) {
      console.error("Error updating location:", error);
      toast.error("Failed to update location. Please try again.", toastProps);
    }
  };

  const handleCancel = () => {
    setEditingLocationId(null);
    setEditedDescription("");
    setEditedHeading("");
    setEditedCity("");
    setEditedSuburb("");
    setEditedImage(null);
    setEditedImageUrl("");
  };

  const moveLocationToTop = async (locationId) => {
    try {
      await updateDoc(doc(db, "locations", locationId), {
        timestamp: new Date().getTime(),
      });
      toast.success("Location moved to the top!", toastProps);
    } catch (error) {
      console.error("Error updating location order:", error);
      toast.error("Failed to reorder location. Please try again.", toastProps);
    }
  };

  return (
    <section>
      <h2>Cities</h2>
      {loading ? (
        <p>Loading locations...</p>
      ) : locations.length === 0 ? (
        <p>No locations added yet.</p>
      ) : (
        <ul>
          {locations.map((location, index) => (
            <li key={location.id}>
              {editingLocationId === location.id ? (
                <>
                  <input
                    type="text"
                    value={editedHeading}
                    onChange={(e) => setEditedHeading(e.target.value)}
                  />
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                  <select
                    value={editedCity}
                    onChange={(e) => setEditedCity(e.target.value)}
                    required
                  >
                    <option value="">Select a city</option>
                    <option value="Pretoria">Pretoria</option>
                    <option value="George">George</option>
                    <option value="Mossel Bay">Mossel Bay</option>
                  </select>
                  <input
                    type="text"
                    value={editedSuburb}
                    onChange={(e) => setEditedSuburb(e.target.value)}
                  />
                  {editedImageUrl && (
                    <Image
                      src={editedImageUrl}
                      alt="Location Image Preview"
                      width={100}
                      height={100}
                    />
                  )}
                  <input type="file" onChange={handleImageChange} />
                  <button onClick={handleImageDelete}>Delete Image</button>
                  <div>
                    <label>Google Maps Link:</label>
                    <input
                      type="url"
                      value={editedGoogleMapsLink}
                      onChange={(e) => setEditedGoogleMapsLink(e.target.value)}
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                  <button onClick={() => handleSave(location.id)}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{location.heading}</h3>
                  <p>Description: {location.description}</p>
                  <p>City: {location.city}</p>
                  <p>Suburb: {location.suburb}</p>
                  {location.image && (
                    <Image
                      src={location.image}
                      alt={location.heading}
                      width={100}
                      height={100}
                    />
                  )}
                  {location.googleMapsLink && (
                    <p>
                      <a
                        href={location.googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on Google Maps
                      </a>
                    </p>
                  )}
                  <br />
                  <button onClick={() => handleEdit(location.id)}>Edit</button>
                  <br />
                  <button
                    onClick={() => handleDelete(location.id, location.image)}
                  >
                    Delete
                  </button>
                  <br />
                  {index !== 0 && (
                    <button
                      className=""
                      onClick={() => moveLocationToTop(location.id)}
                      aria-label="Move Location to Top"
                    >
                      reorder
                    </button>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <ToastContainer />
    </section>
  );
};

export default LocationList;

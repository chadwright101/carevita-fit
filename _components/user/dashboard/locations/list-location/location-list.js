"use client";

import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { locationsCollectionRef } from "@/_firebase/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocationItem from "./location-item";
import LocationEditForm from "./location-edit-form";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLocationId, setEditingLocationId] = useState(null);

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

  const handleEdit = (locationId) => {
    setEditingLocationId(locationId);
  };

  const handleSaveComplete = () => {
    setEditingLocationId(null);
  };

  const handleCancel = () => {
    setEditingLocationId(null);
  };

  const getLocationToEdit = () => {
    return locations.find((location) => location.id === editingLocationId);
  };

  return (
    <section className="locations-list-section">
      <h2>Cities</h2>

      {loading ? (
        <p>Loading locations...</p>
      ) : locations.length === 0 ? (
        <p>No locations added yet.</p>
      ) : (
        <ul className="locations-list">
          {locations.map((location, index) => (
            <li key={location.id} className="location-list-item">
              {editingLocationId === location.id ? (
                <LocationEditForm
                  location={getLocationToEdit()}
                  onSave={handleSaveComplete}
                  onCancel={handleCancel}
                />
              ) : (
                <LocationItem
                  location={location}
                  index={index}
                  totalLocations={locations.length}
                  onEdit={handleEdit}
                />
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

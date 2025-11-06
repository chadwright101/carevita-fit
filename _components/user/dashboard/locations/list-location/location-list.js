"use client";

import { useContext, useState } from "react";
import LocationItem from "./location-item";
import LocationEditForm from "./location-edit-form";
import { LocationsContext } from "@/_context/locations-context";

const LocationList = () => {
  const { locations, isLoading } = useContext(LocationsContext);
  const [editingLocationId, setEditingLocationId] = useState(null);

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
    <section className="admin-locations__cities">
      {isLoading ? (
        <p>Loading locations...</p>
      ) : locations.length === 0 ? (
        <p>No locations added yet.</p>
      ) : (
        <ul className="admin-locations__cities__list">
          {locations.map((location, index) => (
            <li
              key={location.id}
              className="admin-locations__cities__list__item"
            >
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
    </section>
  );
};

export default LocationList;

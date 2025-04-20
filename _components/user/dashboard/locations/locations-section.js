"use client";

import { useState } from "react";
import AddLocationForm from "./add-location/add-location-form";
import LocationList from "./list-location/location-list";

const LocationsSection = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="admin-locations">
      <h3 className="admin-locations__heading">Locations</h3>

      <button
        className="admin-locations__add-location-button"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "Hide Add Form" : "Add New Location"}
      </button>

      {showAddForm && <AddLocationForm />}
      <LocationList />
    </div>
  );
};

export default LocationsSection;

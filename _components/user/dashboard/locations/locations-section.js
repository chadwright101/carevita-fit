"use client";

import { useState } from "react";
import AddLocationForm from "./add-location-form";
import LocationList from "./location-list";

const LocationsSection = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div>
      <h1>Manage Locations</h1>

      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? "Hide Add Form" : "Add New Location"}
      </button>

      {showAddForm && <AddLocationForm />}

      <LocationList />
    </div>
  );
};

export default LocationsSection;

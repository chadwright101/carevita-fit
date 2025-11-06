"use client";

import { useContext, useEffect, useState } from "react";
import { LocationsContext } from "@/_context/locations-context";
import SingleProperty from "./single-property";
import utils from "@/_styles/partials/utils/utils.module.scss";

const Properties = () => {
  const { locations, selectedCities, isLoading } = useContext(LocationsContext);
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    if (locations.length > 0 && Object.keys(selectedCities).length > 0) {
      const filtered = locations.filter((location) => {
        return selectedCities[location.city] === true;
      });
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(locations);
    }
  }, [locations, selectedCities]);

  if (isLoading) {
    return (
      <div className="property-section--loading">
        <div className={utils.spinner}></div>
      </div>
    );
  }

  return (
    <section className="property-section">
      {filteredLocations.length === 0 ? (
        <p>No properties found for the selected filters.</p>
      ) : (
        filteredLocations.map((location) => (
          <SingleProperty key={location.id} propertyData={location} eager />
        ))
      )}
    </section>
  );
};

export default Properties;

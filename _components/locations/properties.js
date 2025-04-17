"use client";

import { useContext, useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";

import { LocationsContext } from "@/_context/locations-context";
import SingleProperty from "./single-property";
import { locationsCollectionRef } from "@/_firebase/firebase";

const Properties = () => {
  const { selectedCities, isLoading } = useContext(LocationsContext);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        console.log("Attempting to fetch locations from Firestore...");
        const querySnapshot = await getDocs(locationsCollectionRef);
        const locationsPayload = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sortedLocations = locationsPayload.sort((a, b) => {
          return (b.timestamp || 0) - (a.timestamp || 0);
        });

        setLocations(sortedLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // Filter locations based on selected cities
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
    return <div className="property-section">Loading properties...</div>;
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

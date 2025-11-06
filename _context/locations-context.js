"use client";

import { createContext, useState, useEffect } from "react";
import { getDocs } from "firebase/firestore";
import { locationsCollectionRef } from "@/_firebase/firebase";

export const LocationsContext = createContext();

export const LocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState({});
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [enquireNowLocation, setEnquireNowLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(locationsCollectionRef);
        const locationsPayload = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sortedLocations = locationsPayload.sort((a, b) => {
          return (b.timestamp || 0) - (a.timestamp || 0);
        });

        setLocations(sortedLocations);

        const cities = new Set();
        sortedLocations.forEach((location) => {
          if (location.city) {
            cities.add(location.city);
          }
        });

        const uniqueCities = Array.from(cities).sort();
        setAvailableCities(uniqueCities);

        const initialSelectedState = {};
        uniqueCities.forEach((city) => {
          initialSelectedState[city] = true;
        });

        setSelectedCities(initialSelectedState);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Function to toggle a specific city's visibility
  const toggleCity = (city) => {
    setSelectedCities((prev) => {
      // Create a new object where all cities are set to false
      const newState = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = false;
      });

      // Set the selected city to true
      newState[city] = true;

      return newState;
    });
    setShowClearFilter(true);
  };

  // Function to show all cities
  const showAllCities = () => {
    setSelectedCities((prev) => {
      const newState = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = true;
      });
      return newState;
    });
    setShowClearFilter(false);
  };

  // Check if a specific city is selected
  const isCitySelected = (city) => {
    return selectedCities[city] || false;
  };

  return (
    <LocationsContext.Provider
      value={{
        locations,
        availableCities,
        selectedCities,
        isLoading,
        showClearFilter,
        setShowClearFilter,
        enquireNowLocation,
        setEnquireNowLocation,
        toggleCity,
        showAllCities,
        isCitySelected,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};

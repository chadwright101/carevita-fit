"use client";

import { createContext, useState, useEffect } from "react";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { locationsCollectionRef } from "@/_firebase/firebase";
import {
  deleteLocation,
  updateLocation,
  moveLocationToTop,
} from "@/_components/user/dashboard/locations/list-location/location-service";

export const LocationsContext = createContext();

export const LocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState({});
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [enquireNowLocation, setEnquireNowLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const q = query(locationsCollectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        try {
          const locationsPayload = snapshot.docs.map((doc) => ({
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
          setError(null);
        } catch (error) {
          console.error("Error processing locations:", error);
          setError(error);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Error listening to locations:", error);
        setError(error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
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
        error,
        showClearFilter,
        setShowClearFilter,
        enquireNowLocation,
        setEnquireNowLocation,
        toggleCity,
        showAllCities,
        isCitySelected,
        deleteLocation,
        updateLocation,
        moveLocationToTop,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};

"use client";

import { useContext, useEffect } from "react";
import { getDocs } from "firebase/firestore";

import { LocationsContext } from "@/_context/locations-context";
import SingleProperty from "./single-property";
import data from "@/_data/general-data.json";
import { locationsCollectionRef } from "@/_firebase/firebase";

const {
  locationsPage: { properties, instructors },
} = data;

const Properties = () => {
  const { showPretoria, showGeorge, showMosselBay } =
    useContext(LocationsContext);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        console.log("Attempting to fetch locations from Firestore...");
        const querySnapshot = await getDocs(locationsCollectionRef);
        const locationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Successfully fetched locations:", locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <section className="property-section">
      {showMosselBay && (
        <>
          <SingleProperty
            propertyData={properties[0]}
            instructorData={instructors[1]}
            eager
            enquireNowPropertyName={properties[0].propertyName}
          />
          <SingleProperty
            propertyData={properties[4]}
            instructorData={instructors[2]}
            eager
            enquireNowPropertyName={properties[4].propertyName}
          />
          <SingleProperty
            propertyData={properties[6]}
            instructorData={instructors[5]}
            eager
            enquireNowPropertyName={properties[6].propertyName}
          />
        </>
      )}
      {showPretoria && (
        <>
          <SingleProperty
            propertyData={properties[1]}
            instructorData={instructors[0]}
            enquireNowPropertyName={properties[1].propertyName}
          />
          <SingleProperty
            propertyData={properties[3]}
            instructorData={instructors[2]}
            enquireNowPropertyName={properties[3].propertyName}
          />
          <SingleProperty
            propertyData={properties[5]}
            instructorData={instructors[0]}
            enquireNowPropertyName={properties[5].propertyName}
          />
        </>
      )}
      {showGeorge && (
        <SingleProperty
          propertyData={properties[2]}
          instructorData={instructors[3]}
          enquireNowPropertyName={properties[2].propertyName}
        />
      )}
    </section>
  );
};

export default Properties;

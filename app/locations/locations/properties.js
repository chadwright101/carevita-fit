"use client";

import { useContext } from "react";

import { LocationsContext } from "@/app/_context/locations-context";
import SingleProperty from "@/app/locations/locations/single-property";
import data from "@/app/_data/general-data.json";

const {
  locationsPage: { properties, instructors },
} = data;

const Properties = () => {
  const { showPretoria, showGeorge, showMosselBay } =
    useContext(LocationsContext);

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
            instructorData={instructors[1]}
            eager
            enquireNowPropertyName={properties[4].propertyName}
          />
        </>
      )}
      {showPretoria && (
        <>
          <SingleProperty
            propertyData={properties[1]}
            instructorData={instructors[2]}
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

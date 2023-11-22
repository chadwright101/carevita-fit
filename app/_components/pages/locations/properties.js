"use client";

import { useContext } from "react";

import { LocationsContext } from "@/app/_context/locations-context";
import SingleProperty from "@/app/_components/pages/locations/single-property";
import data from "@/app/_data/general-data.json";

const {
  locationsPage: { properties },
} = data;

const Properties = () => {
  const { showJohannesburg, showPretoria, showGeorge, showMosselBay } =
    useContext(LocationsContext);

  return (
    <section className="property-section">
      {showJohannesburg && (
        <SingleProperty
          data={properties[0]}
          eager
          enquireNowPropertyName={properties[0].propertyName}
        />
      )}
      {showPretoria && (
        <SingleProperty
          data={properties[1]}
          eager
          enquireNowPropertyName={properties[1].propertyName}
        />
      )}
      {showMosselBay && (
        <SingleProperty
          data={properties[2]}
          enquireNowPropertyName={properties[2].propertyName}
        />
      )}
      {showGeorge && (
        <SingleProperty
          data={properties[3]}
          enquireNowPropertyName={properties[3].propertyName}
        />
      )}
    </section>
  );
};

export default Properties;

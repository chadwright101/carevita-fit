"use client";

import { useContext } from "react";

import { LocationsContext } from "@/app/_context/locations-context";
import SingleProperty from "@/app/locations/locations/single-property";
import data from "@/app/_data/general-data.json";

const {
  locationsPage: { properties },
} = data;

const Properties = () => {
  const { showPretoria, showGeorge, showMosselBay } =
    useContext(LocationsContext);

  return (
    <section className="property-section">
      {showMosselBay && (
        <>
          <SingleProperty
            data={properties[0]}
            eager
            enquireNowPropertyName={properties[0].propertyName}
          />
          <SingleProperty
            data={properties[4]}
            eager
            enquireNowPropertyName={properties[4].propertyName}
          />
        </>
      )}
      {showPretoria && (
        <>
          <SingleProperty
            data={properties[1]}
            enquireNowPropertyName={properties[1].propertyName}
          />
          <SingleProperty
            data={properties[3]}
            enquireNowPropertyName={properties[3].propertyName}
          />
        </>
      )}
      {showGeorge && (
        <SingleProperty
          data={properties[2]}
          enquireNowPropertyName={properties[2].propertyName}
        />
      )}
    </section>
  );
};

export default Properties;

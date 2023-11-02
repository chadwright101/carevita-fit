"use client";

import { useContext } from "react";

import Heading from "@/_components/heading";
import { LocationsContext } from "@/_context/locations-provider";
import Property from "@/_components/pages/locations/property";
import PropertyFilter from "@/_components/pages/locations/property-filter";

import data from "@/data/general-data.json";

const {
  locationsPage: { properties },
} = data;

const Locations = () => {
  const { showJohannesburg, showPretoria, showGeorge, showMosselBay } =
    useContext(LocationsContext);
  return (
    <main>
      <Heading pageHeading>Locations</Heading>
      <PropertyFilter />
      <section className="property-page">
        {showJohannesburg && <Property data={properties.property1} eager />}
        {showPretoria && <Property data={properties.property2} eager />}
        {showMosselBay && <Property data={properties.property3} />}
        {showGeorge && <Property data={properties.property4} />}
      </section>
    </main>
  );
};

export default Locations;

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
      {showJohannesburg && <SingleProperty data={properties[0]} eager />}
      {showPretoria && <SingleProperty data={properties[1]} eager />}
      {showMosselBay && <SingleProperty data={properties[2]} />}
      {showGeorge && <SingleProperty data={properties[3]} />}
    </section>
  );
};

export default Properties;

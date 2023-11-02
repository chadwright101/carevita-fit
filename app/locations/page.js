"use client";

import { useContext } from "react";

import Heading from "@/app/_components/heading";
import { LocationsContext } from "@/app/_context/locations-provider";
import Property from "@/app/_components/pages/locations/property";
import PropertyFilter from "@/app/_components/pages/locations/property-filter";
import MeetTheTeam from "../_components/pages/locations/meet-the-team";

import data from "@/app/_data/general-data.json";

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
        {showJohannesburg && <Property data={properties[0]} eager />}
        {showPretoria && <Property data={properties[1]} eager />}
        {showMosselBay && <Property data={properties[2]} />}
        {showGeorge && <Property data={properties[3]} />}
      </section>
      <div className="nav-point" id="team"></div>
      <MeetTheTeam />
    </main>
  );
};

export default Locations;

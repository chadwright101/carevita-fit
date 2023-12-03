import Heading from "@/app/_components/heading";

import PropertyFilter from "@/app/locations/locations/property-filter";
import MeetTheTeam from "./locations/meet-the-team";
import Properties from "./locations/properties";

export const metadata = {
  title: "Locations - CareVita #fit",
  openGraph: {
    title: "Locations - CareVita #fit",
  },
};

const Locations = () => {
  return (
    <main>
      <Heading pageHeading>Locations</Heading>
      <PropertyFilter />
      <Properties />
      <div className="nav-point" id="team"></div>
      <MeetTheTeam />
    </main>
  );
};

export default Locations;

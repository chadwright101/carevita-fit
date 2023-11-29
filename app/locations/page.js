import Heading from "@/app/_components/heading";

import PropertyFilter from "@/app/_components/pages/locations/property-filter";
import MeetTheTeam from "../_components/pages/locations/meet-the-team";
import Properties from "../_components/pages/locations/properties";

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

import Heading from "@/_components/heading";

import PropertyFilter from "@/_components/locations/property-filter";
import MeetTheTeam from "@/_components/locations/meet-the-team";
import Properties from "@/_components/locations/properties";

export const metadata = {
  title: "Locations - CareVita #fit",
  openGraph: {
    title: "Locations - CareVita #fit",
  },
};

export const revalidate = 3600;

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

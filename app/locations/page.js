import Heading from "@/app/_components/heading";

import PropertyFilter from "@/app/_components/pages/locations/property-filter";
import MeetTheTeam from "../_components/pages/locations/meet-the-team";
import Properties from "../_components/pages/locations/properties";

export const metadata = {
  title: "Locations - #fit",
  description: "",
  keywords:
    "#fit, CareVita, elderly fitness, wellbeing, elderly, retired, old people, care centre, retirement estate, fitness programme",
  openGraph: {
    title: "Locations - #fit",
    description: "",
    type: "website",
    locale: "en_ZA",
    siteName: "#fit - CareVita",
    url: "",
    keywords:
      "#fit, CareVita, elderly fitness, wellbeing, elderly, retired, old people, care centre, retirement estate, fitness programme",
    images: [
      {
        url: "",
      },
      {
        url: "",
      },
      {
        url: "",
      },
    ],
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

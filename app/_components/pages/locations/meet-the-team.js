import Heading from "../../heading";
import ImageContainer from "../../image-container";

import data from "@/app/_data/general-data.json";

const {
  locationsPage: { properties },
} = data;

const MeetTheTeam = () => {
  return (
    <section className="team-section">
      <Heading sectionHeading>Meet the Team</Heading>
      <ul>
        {properties.map(
          ({ instructor: { name: instructorName, image, bio } }, index) => (
            <li key={index}>
              <div
                className="nav-point"
                id={instructorName.toLowerCase()}
              ></div>
              <ImageContainer
                src={image}
                alt={`CareVita #fit - ${instructorName}`}
                width={400}
                height={400}
                smallest={95}
                tablet={50}
                desktopSmall={40}
                desktop={30}
              />
              <h4>{instructorName}</h4>
              <p>{bio}</p>
            </li>
          )
        )}
      </ul>
    </section>
  );
};

export default MeetTheTeam;

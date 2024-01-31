import Heading from "../../_components/heading";
import ImageContainer from "../../_components/image-container";

import data from "@/app/_data/general-data.json";

const {
  locationsPage: { properties, instructors },
} = data;

const MeetTheTeam = () => {
  return (
    <section className="team-section">
      <Heading className="team-section__heading" sectionHeading>
        Meet the Team
      </Heading>
      <ul className="team-section__list">
        {instructors.map(({ name: instructorName, image, bio }, index) => (
          <li className="team-section__list-item" key={index}>
            <div className="nav-point" id={instructorName.toLowerCase()}></div>
            <ImageContainer
              src={image}
              alt={`CareVita #fit - ${instructorName}`}
              width={400}
              height={400}
              smallest={95}
              tablet={50}
              desktopSmall={40}
              desktop={30}
              cssClasses="team-section__image"
            />
            <h4>{instructorName}</h4>
            <p>{bio}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MeetTheTeam;

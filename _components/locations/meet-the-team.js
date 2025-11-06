"use client";

import { useContext } from "react";
import Heading from "@/_components/heading";
import ImageContainer from "@/_components/image-container";
import { StaffContext } from "@/_context/staff-context";
import utils from "@/_styles/partials/utils/utils.module.scss";

const MeetTheTeam = () => {
  const { staff, isLoading } = useContext(StaffContext);

  return (
    <section className="team-section">
      <Heading className="team-section__heading" sectionHeading>
        Meet the Team
      </Heading>
      {isLoading ? (
        <div className="team-section--loading">
          <div className={utils.spinner}></div>
        </div>
      ) : (
        <ul className="team-section__list">
          {staff
            .filter(({ bio }) => bio && bio.trim() !== "")
            .map(({ name, image, bio, id, timestamp }) => (
              <li className="team-section__list-item" key={id}>
                <div className="nav-point" id={name.toLowerCase()}></div>
                <ImageContainer
                  src={image}
                  alt={`CareVita #fit - ${name}`}
                  width={400}
                  height={400}
                  smallest={95}
                  tablet={50}
                  desktopSmall={40}
                  desktop={30}
                  cssClasses="team-section__image"
                  timestamp={timestamp}
                />
                <h4>{name}</h4>
                <p>{bio}</p>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
};

export default MeetTheTeam;

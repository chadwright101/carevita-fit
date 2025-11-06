"use client";

import { useState, useEffect } from "react";
import Heading from "@/_components/heading";
import ImageContainer from "@/_components/image-container";
import { staffCollectionRef } from "@/_firebase/firebase";
import { getDocs, query, orderBy } from "firebase/firestore";
import utils from "@/_styles/partials/utils/utils.module.scss";

const MeetTheTeam = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        // Create a query to order by timestamp in descending order
        const instructorsQuery = query(
          staffCollectionRef,
          orderBy("timestamp", "desc")
        );

        // Get the documents
        const querySnapshot = await getDocs(instructorsQuery);

        // Map the documents to our data structure
        const instructorsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setInstructors(instructorsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching instructors:", error);
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);
  return (
    <section className="team-section">
      <Heading className="team-section__heading" sectionHeading>
        Meet the Team
      </Heading>
      {loading ? (
        <div className="team-section--loading">
          <div className={utils.spinner}></div>
        </div>
      ) : (
        <ul className="team-section__list">
          {instructors
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

import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/_firebase/firebase";

import Heading from "@/_components/heading";
import ImageContainer from "@/_components/image-container";
import { LocationsContext } from "@/_context/locations-context";

const SingleProperty = ({ propertyData, eager }) => {
  const {
    heading,
    suburb,
    city,
    googleMapsLink,
    image,
    description,
    staffMember,
  } = propertyData;

  const [instructorData, setInstructorData] = useState(null);
  const { setEnquireNowLocation } = useContext(LocationsContext);

  useEffect(() => {
    const fetchInstructorData = async () => {
      if (!staffMember) return;

      try {
        const staffDocRef = doc(db, "staff", staffMember);
        const staffDocSnap = await getDoc(staffDocRef);

        if (staffDocSnap.exists()) {
          setInstructorData(staffDocSnap.data());
        }
      } catch (error) {
        console.error("Error fetching instructor data:", error);
      }
    };

    fetchInstructorData();
  }, [staffMember]);

  return (
    <article className="property-component">
      <div className="property-component__heading-container">
        <Heading
          cssClasses="property-component__heading-container__heading"
          sectionHeading
        >
          {heading}
        </Heading>
        <Link
          className="property-component__heading-container__link"
          href={googleMapsLink}
          target="_blank"
        >
          {suburb}, {city}
        </Link>
      </div>
      <div className="property-component__image">
        <ImageContainer
          src={image}
          alt={`CareVita #fit - ${heading}`}
          width={1100}
          height={500}
          eager={eager}
          smallest={95}
          desktopSmall={50}
        />
      </div>
      <div className="property-component__description">
        {instructorData && instructorData.image && (
          <div>
            <Link href={`/locations#${instructorData.name.toLowerCase()}`}>
              <ImageContainer
                src={instructorData.image}
                alt={`${instructorData.name} - CareVita #fit instructor`}
                width={100}
                height={100}
                eager={eager}
                smallest={30}
                tabletLarge={30}
              />
            </Link>
          </div>
        )}
        <p>{description}</p>
      </div>
      <Link href="/contact">
        <button
          type="button"
          onClick={() => setEnquireNowLocation(heading)}
          className="button button--normal property-component__button"
        >
          Enquire Now
        </button>
      </Link>
    </article>
  );
};

export default SingleProperty;

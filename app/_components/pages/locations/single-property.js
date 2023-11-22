import Link from "next/link";
import { useContext } from "react";

import Heading from "@/app/_components/heading";
import ImageContainer from "@/app/_components/image-container";
import { LocationsContext } from "@/app/_context/locations-context";

const SingleProperty = ({ data, eager, enquireNowPropertyName }) => {
  const {
    propertyName,
    propertyLocation: { suburb, city },
    image,
    description,
    instructor: { name, image: instructorImage },
  } = data;

  const { setEnquireNowLocation } = useContext(LocationsContext);

  return (
    <article className="property-component">
      <div className="property-component__heading-container">
        <Heading
          cssClasses="property-component__heading-container__heading"
          sectionHeading
        >
          {propertyName}
        </Heading>
        <Link className="property-component__heading-container__link" href="#">
          {suburb}, {city}
        </Link>
      </div>
      <div className="property-component__image">
        <ImageContainer
          src={image}
          alt={`CareVita #fit - ${propertyName}`}
          width={1100}
          height={500}
          eager={eager}
          smallest={95}
          desktopSmall={50}
        />
      </div>
      <div className="property-component__description">
        <p>{description}</p>
        <Link href={`/locations#${name.toLowerCase()}`}>
          <ImageContainer
            src={instructorImage}
            alt={`${name} - CareVita #fit instructor`}
            width={50}
            height={50}
            eager={eager}
            smallest={10}
            tabletLarge={5}
          />
        </Link>
      </div>
      <Link href="/contact">
        <button
          type="button"
          onClick={() => setEnquireNowLocation(enquireNowPropertyName)}
          className="button button--normal property-component__button"
        >
          Enquire Now
        </button>
      </Link>
    </article>
  );
};

export default SingleProperty;

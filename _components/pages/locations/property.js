import Link from "next/link";

import Heading from "@/_components/heading";
import ImageContainer from "@/_components/image-container";

const Property = ({ data, eager }) => {
  const {
    propertyName,
    propertyLocation: { suburb, city },
    image,
    description,
    instructor: { name, image: instructorImage },
  } = data;
  return (
    <article className="property-component">
      <div className="property-heading">
        <Heading sectionHeading>{propertyName}</Heading>
        <Link href="#">
          {suburb}, {city}
        </Link>
      </div>
      <div className="property-image">
        <ImageContainer
          src={image}
          alt={`CareVita #fit - ${propertyName}`}
          width={1100}
          height={500}
          eager={eager}
        />
      </div>
      <div className="property-description">
        <p>{description}</p>
        <Link href={`/locations#${name.toLowerCase()}`}>
          <ImageContainer
            src={instructorImage}
            alt={`${name} - CareVita #fit instructor`}
            width={50}
            height={50}
            eager={eager}
          />
        </Link>
      </div>
    </article>
  );
};

export default Property;

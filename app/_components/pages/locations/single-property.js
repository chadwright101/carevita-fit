import Link from "next/link";

import Heading from "@/app/_components/heading";
import ImageContainer from "@/app/_components/image-container";
import Button from "@/app/_components/button";

const SingleProperty = ({ data, eager }) => {
  const {
    propertyName,
    propertyLocation: { suburb, city },
    image,
    description,
    instructor: { name, image: instructorImage },
  } = data;
  return (
    <article className="property-component">
      <div className="property-component__heading-container">
        <Heading
          cssClasses="property-component__heading-container--heading"
          sectionHeading
        >
          {propertyName}
        </Heading>
        <Link className="property-component__heading-container--link" href="#">
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
      <Button url="/contact">Enquire Now</Button>
    </article>
  );
};

export default SingleProperty;

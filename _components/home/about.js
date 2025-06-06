import Heading from "@/_components/heading";
import ImageContainer from "@/_components/image-container";

import data from "@/_data/general-data.json";
import Link from "next/link";

const {
  homePage: {
    about: { images, paragraphs },
  },
} = data;

const About = () => {
  return (
    <section className="about-section">
      <ImageContainer
        src={images[0]}
        alt="CareVita #fit - Group"
        width="1100"
        height="660"
        smallest="90"
        tabletLarge="50"
        cssClasses="about-section__image"
      />
      <article>
        <div id="about" className="nav-point"></div>
        <Heading cssClasses="about-section__heading" sectionHeading>
          About
        </Heading>
        <div className="about-section__container">
          <div className="about-section__container__paragraphs">
            {paragraphs.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <Link href="/locations">
            <button
              type="button"
              className="button button--normal about-section__container__button"
            >
              View our locations
            </button>
          </Link>
        </div>
      </article>
      <ImageContainer
        src={images[1]}
        alt="CareVita #fit - Group"
        width="1100"
        height="660"
        smallest="90"
        cssClasses="about-section__image"
      />
    </section>
  );
};

export default About;

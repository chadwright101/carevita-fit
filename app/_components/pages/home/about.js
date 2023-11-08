import Heading from "@/app/_components/heading";
import ImageContainer from "@/app/_components/image-container";

import data from "@/app/_data/general-data.json";

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
        <Heading cssClasses="about-section__heading" sectionHeading>
          About
        </Heading>
        <div className="about-section__paragraph-container">
          {paragraphs.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
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

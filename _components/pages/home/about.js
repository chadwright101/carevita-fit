import Heading from "../../heading";
import ImageContainer from "../../image-container";

import data from "@/data/general-data.json";

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
        phone="90"
        desktopSmall="40"
        cssClasses=""
      />
      <article>
        <Heading sectionHeading>About</Heading>
        <div>
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
        phone="90"
        desktopSmall="40"
        cssClasses=""
      />
    </section>
  );
};

export default About;

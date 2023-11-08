import HeroSlider from "@/app/_components/sliders/hero-slider";

import data from "@/app/_data/general-data.json";

const {
  homePage: {
    hero: { images, paragraph },
  },
} = data;

const Hero = () => {
  return (
    <section className="hero-section">
      <HeroSlider imageList={images} />
      <div className="hero-section__hero-text">
        <h2 className="white-text">{paragraph[0]}</h2>
        <h2 className="white-text">{paragraph[1]}</h2>
      </div>
    </section>
  );
};

export default Hero;

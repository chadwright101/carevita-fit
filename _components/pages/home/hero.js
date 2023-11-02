import HeroSlider from "@/_components/sliders/hero-slider";

import data from "@/data/general-data.json";

import "@/styles/partials/pages/home.module.scss";

const {
  homePage: {
    hero: { images, paragraph },
  },
} = data;

const Hero = () => {
  return (
    <section className="hero-section">
      <HeroSlider imageList={images} />
      <div className="hero-text">
        <h2 className="white-text">{paragraph[0]}</h2>
        <h2 className="white-text">{paragraph[1]}</h2>
      </div>
    </section>
  );
};

export default Hero;

import HeroSlider from "@/app/_components/sliders/hero-slider";

import data from "@/app/data/general-data.json";

import "@/app/styles/partials/pages/home.module.scss";
import About from "./_components/pages/home/about";
import Testimonials from "./_components/pages/home/testimonials";
import Gallery from "./_components/pages/home/gallery";

const {
  homePage: {
    hero: { images, paragraph },
  },
} = data;

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <HeroSlider imageList={images} />
        <div className="hero-text">
          <h2 className="white-text">{paragraph[0]}</h2>
          <h2 className="white-text">{paragraph[1]}</h2>
        </div>
      </section>
      <div id="about" className="nav-point"></div>
      <About />
      <Testimonials />
      <div id="gallery" className="nav-point"></div>
      <Gallery />
    </main>
  );
}

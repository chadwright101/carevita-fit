import About from "../_components/home/about";
import Testimonials from "../_components/home/testimonials";
import Gallery from "../_components/home/gallery";
import Hero from "../_components/home/hero";
import HeroParagraph from "../_components/home/hero-paragraph";

export const metadata = {
  title: "Home - CareVita #fit",
  openGraph: {
    title: "Home - CareVita #fit",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <HeroParagraph />
      <About />
      <Testimonials />
      <div id="gallery" className="nav-point"></div>
      <Gallery />
    </main>
  );
}

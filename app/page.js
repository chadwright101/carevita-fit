import About from "../_components/pages/home/about";
import Testimonials from "../_components/pages/home/testimonials";
import Gallery from "../_components/pages/home/gallery";
import Hero from "@/_components/pages/home/hero";

import "@/styles/partials/pages/home.module.scss";

export default function Home() {
  return (
    <main>
      <Hero />
      <div id="about" className="nav-point"></div>
      <About />
      <Testimonials />
      <div id="gallery" className="nav-point"></div>
      <Gallery />
    </main>
  );
}

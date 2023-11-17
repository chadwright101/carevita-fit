import About from "./_components/pages/home/about";
import Testimonials from "./_components/pages/home/testimonials";
import Gallery from "./_components/pages/home/gallery";
import Hero from "./_components/pages/home/hero";
import { HeroGalleryProvider } from "./_context/hero-gallery-context";

export const metadata = {
  title: "Home - #fit",
  description: "",
  keywords:
    "#fit, CareVita, elderly fitness, wellbeing, elderly, retired, old people, care centre, retirement estate, fitness programme",
  openGraph: {
    title: "Home - #fit",
    description: "",
    type: "website",
    locale: "en_ZA",
    siteName: "#fit - CareVita",
    url: "",
    keywords:
      "#fit, CareVita, elderly fitness, wellbeing, elderly, retired, old people, care centre, retirement estate, fitness programme",
    images: [
      {
        url: "",
      },
      {
        url: "",
      },
      {
        url: "",
      },
    ],
  },
};

export default function Home() {
  return (
    <HeroGalleryProvider>
      <main>
        <Hero />
        <div id="about" className="nav-point"></div>
        <About />
        <Testimonials />
        <div id="gallery" className="nav-point"></div>
        <Gallery />
      </main>
    </HeroGalleryProvider>
  );
}

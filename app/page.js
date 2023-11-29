import About from "./_components/pages/home/about";
import Testimonials from "./_components/pages/home/testimonials";
import Gallery from "./_components/pages/home/gallery";
import Hero from "./_components/pages/home/hero";
import { AdminGalleryProvider } from "./_context/admin-gallery-context";
import HeroParagraph from "./_components/pages/home/hero-paragraph";

export const metadata = {
  title: "Home - CareVita #fit",
  openGraph: {
    title: "Home - CareVita #fit",
  },
};

export default function Home() {
  return (
    <AdminGalleryProvider>
      <main>
        <Hero />
        <HeroParagraph />
        <About />
        <Testimonials />
        <div id="gallery" className="nav-point"></div>
        <Gallery />
      </main>
    </AdminGalleryProvider>
  );
}

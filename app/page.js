import About from "./_components/pages/home/about";
import Testimonials from "./_components/pages/home/testimonials";
import Gallery from "./_components/pages/home/gallery";
import Hero from "./_components/pages/home/hero";
import { AdminGalleryProvider } from "./_context/admin-gallery-context";

export const metadata = {
  title: "Home - #fit",
  openGraph: {
    title: "Home - #fit",
  },
};

export default function Home() {
  return (
    <AdminGalleryProvider>
      <main>
        <Hero />
        <About />
        <Testimonials />
        <div id="gallery" className="nav-point"></div>
        <Gallery />
      </main>
    </AdminGalleryProvider>
  );
}

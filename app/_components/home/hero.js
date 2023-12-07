import HeroSlider from "@/app/_components/sliders/hero-slider";

import { listAll, getDownloadURL, getMetadata } from "firebase/storage";

import { mainGalleryStorageRef } from "@/app/_firebase/firebase";

const Hero = async () => {
  const fetchData = async () => {
    try {
      const res = await listAll(mainGalleryStorageRef);

      const imageInfoPromises = res.items.map(async (itemRef) => {
        const metadata = await getMetadata(itemRef);
        const filename = itemRef.name;
        const url = await getDownloadURL(itemRef);
        return {
          url,
          filename,
          timestamp: metadata.customMetadata.timestamp || 0,
        };
      });
      const imageInfo = await Promise.all(imageInfoPromises);
      return imageInfo.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error("Error fetching hero images:", error);
    }
  };

  const imageData = await fetchData();
  const sortedImageData = imageData.map((imageInfo) => imageInfo.url);

  return (
    <section className="hero-section">
      <div className="hero-section__slider-container">
        <HeroSlider imageList={sortedImageData} />
      </div>
    </section>
  );
};

export default Hero;

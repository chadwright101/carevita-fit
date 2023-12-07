import { listAll, getDownloadURL, getMetadata } from "firebase/storage";

import { secondaryGalleryStorageRef } from "@/app/_firebase/firebase";

import Heading from "@/app/_components/heading";
import BasicSlider from "@/app/_components/sliders/basic-slider";

const Gallery = async () => {
  const fetchData = async () => {
    try {
      const res = await listAll(secondaryGalleryStorageRef);

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
    <section className="gallery-section">
      <Heading sectionHeading cssClasses="gallery-section__heading">
        Gallery
      </Heading>
      <div className="gallery-section__slider-container">
        <BasicSlider imageList={sortedImageData} />
      </div>
    </section>
  );
};
export default Gallery;

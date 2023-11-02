import Heading from "@/app/_components/heading";
import BasicSlider from "@/app/_components/sliders/basic-slider";

import data from "@/app/_data/general-data.json";

const {
  homePage: { gallery },
} = data;

const Gallery = () => {
  return (
    <section className="gallery-section">
      <Heading sectionHeading>Gallery</Heading>
      <BasicSlider imageList={gallery} />
    </section>
  );
};

export default Gallery;

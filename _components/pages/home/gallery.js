import Heading from "../../heading";
import BasicSlider from "../../sliders/basic-slider";

import data from "@/data/general-data.json";

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

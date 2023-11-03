import Heading from "../_components/heading";
import ContactInfo from "../_components/pages/contact/contact-info";
import Form from "../_components/pages/contact/form";
import ImageContainer from "../_components/image-container";

import data from "@/app/_data/general-data.json";
import Image from "next/image";

const {
  contactPage: { image },
} = data;

const Contact = () => {
  return (
    <main className="contact-section">
      <Heading pageHeading>Contact</Heading>
      <div className="desktop-grid">
        <div>
          <ContactInfo />
          <Form />
        </div>
        <div>
          <ImageContainer
            src={image}
            width={900}
            height={900}
            cssClasses="contact-image"
          />
        </div>
      </div>
    </main>
  );
};

export default Contact;

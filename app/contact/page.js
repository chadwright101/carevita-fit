import Heading from "../_components/heading";
import ContactInfo from "./components/contact-info";
import Form from "./components/form";
import ImageContainer from "../_components/image-container";

import data from "@/app/_data/general-data.json";

const {
  contactPage: { image },
} = data;

export const metadata = {
  title: "Contact - CareVita #fit",
  openGraph: {
    title: "Contact - CareVita #fit",
  },
};

const Contact = () => {
  return (
    <main className="contact-section">
      <Heading pageHeading>Contact</Heading>
      <div className="contact-section__grid">
        <div>
          <ContactInfo />
          <Form />
        </div>
        <div>
          <ImageContainer
            src={image}
            width={900}
            height={900}
            cssClasses="contact-section__image"
          />
        </div>
      </div>
    </main>
  );
};

export default Contact;

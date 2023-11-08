import Heading from "../_components/heading";
import ContactInfo from "../_components/pages/contact/contact-info";
import Form from "../_components/pages/contact/form";
import ImageContainer from "../_components/image-container";

import data from "@/app/_data/general-data.json";

const {
  contactPage: { image },
} = data;

export const metadata = {
  title: "Contact - #fit",
  description: "",
  keywords:
    "#fit, CareVita, elderly fitness, wellbeing, elderly, retired, old people, care centre, retirement estate, fitness programme",
  openGraph: {
    title: "Contact - #fit",
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

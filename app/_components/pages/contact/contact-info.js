"use client";

import { useState } from "react";

import data from "@/app/_data/general-data.json";

const {
  contactPage: { phone, email },
} = data;

const ContactInfo = () => {
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  return (
    <ul className="contact-info">
      <li className="contact-info__item">
        Tel:{" "}
        {!showPhone ? (
          <span
            className="contact-info__show"
            onClick={() => setShowPhone(true)}
          >
            Show phone number
          </span>
        ) : (
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="contact-info__link"
          >
            {phone}
          </a>
        )}
      </li>
      <li className="contact-info__item">
        Email:{" "}
        {!showEmail ? (
          <span
            className="contact-info__show"
            onClick={() => setShowEmail(true)}
          >
            Show email address
          </span>
        ) : (
          <a href={`mailto:${email}`} className="contact-info__link">
            {email}
          </a>
        )}
      </li>
    </ul>
  );
};

export default ContactInfo;

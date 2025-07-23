"use client";

import { useState } from "react";
import { showPhoneNumber, showEmailAddress } from "@/_actions/send-email";

const ContactInfo = () => {
  const [displayPhoneNumber, setDisplayPhoneNumber] =
    useState("Show phone number");
  const [displayEmail, setDisplayEmail] = useState("Show email address");

  const handleShowPhoneNumber = async () => {
    const phoneNumber = await showPhoneNumber();
    setDisplayPhoneNumber(phoneNumber);
  };

  const handleShowEmailAddress = async () => {
    const emailAddress = await showEmailAddress();
    setDisplayEmail(emailAddress);
  };

  return (
    <ul className="contact-info">
      <li className="contact-info__item">
        Tel:{" "}
        {displayPhoneNumber === "Show phone number" ? (
          <button
            className="contact-info__show"
            onClick={handleShowPhoneNumber}
          >
            {displayPhoneNumber}
          </button>
        ) : (
          <a
            href={`tel:${displayPhoneNumber.replace(/\s/g, "")}`}
            className="contact-info__link"
          >
            {displayPhoneNumber}
          </a>
        )}
      </li>
      <li className="contact-info__item">
        Email:{" "}
        {displayEmail === "Show email address" ? (
          <button
            className="contact-info__show"
            onClick={handleShowEmailAddress}
          >
            {displayEmail}
          </button>
        ) : (
          <a href={`mailto:${displayEmail}`} className="contact-info__link">
            {displayEmail}
          </a>
        )}
      </li>
    </ul>
  );
};

export default ContactInfo;

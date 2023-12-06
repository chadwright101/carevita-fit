"use client";

import { useState } from "react";

const ContactInfo = () => {
  const [showPhone, setShowPhone] = useState("Show phone number");
  const [showEmail, setShowEmail] = useState("Show email address");

  const handlePhoneNumber = async () => {
    try {
      const response = await fetch("/api/contact/show-phone-number");
      const phoneNumber = await response.json();
      setShowPhone(phoneNumber);
    } catch {
      console.log(error);
    }
  };

  const handleEmail = async () => {
    try {
      const response = await fetch("/api/contact/show-email");
      const email = await response.json();
      setShowEmail(email);
    } catch {
      console.log(error);
    }
  };

  return (
    <ul className="contact-info">
      <li className="contact-info__item">
        Tel:{" "}
        {showPhone === "Show phone number" ? (
          <span className="contact-info__show" onClick={handlePhoneNumber}>
            {showPhone}
          </span>
        ) : (
          <a
            href={`tel:${showPhone.replace(/\s/g, "")}`}
            className="contact-info__link"
          >
            {showPhone}
          </a>
        )}
      </li>
      <li className="contact-info__item">
        Email:{" "}
        {showEmail === "Show email address" ? (
          <span className="contact-info__show" onClick={handleEmail}>
            {showEmail}
          </span>
        ) : (
          <a href={`mailto:${showEmail}`} className="contact-info__link">
            {showEmail}
          </a>
        )}
      </li>
    </ul>
  );
};

export default ContactInfo;

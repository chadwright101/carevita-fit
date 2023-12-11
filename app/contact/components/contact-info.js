"use client";

import { useState } from "react";

const ContactInfo = () => {
  const [showPhone, setShowPhone] = useState("Show phone number");
  const [showEmail, setShowEmail] = useState("Show email address");
  const [loading, setLoading] = useState(true);

  const handlePhoneNumber = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/contact/show-phone-number");
      const phone = await response.json();
      setShowPhone(phone);
    } catch {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/contact/show-email");
      const email = await response.json();
      setShowEmail(email);
    } catch {
      console.log(error);
    } finally {
      setLoading(false);
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
        ) : showPhone !== "Show phone number" ? (
          <a
            href={`tel:${showPhone.replace(/\s/g, "")}`}
            className="contact-info__link"
          >
            {showPhone}
          </a>
        ) : loading ? (
          <p>Loading..</p>
        ) : null}
      </li>
      <li className="contact-info__item">
        Email:{" "}
        {showEmail === "Show email address" ? (
          <span className="contact-info__show" onClick={handleEmail}>
            {showEmail}
          </span>
        ) : showEmail !== "Show email address" ? (
          <a href={`mailto:${showEmail}`} className="contact-info__link">
            {showEmail}
          </a>
        ) : loading ? (
          <p>Loading..</p>
        ) : null}
      </li>
    </ul>
  );
};

export default ContactInfo;

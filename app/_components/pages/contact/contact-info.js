"use client";

import { useState } from "react";

import classNames from "classnames";

import data from "@/app/_data/general-data.json";

const {
  contactPage: { phone, email },
} = data;

const ContactInfo = () => {
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  return (
    <ul>
      <li>
        Tel:{" "}
        {!showPhone ? (
          <span onClick={() => setShowPhone(true)}>Show phone number</span>
        ) : (
          <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
        )}
      </li>
      <li>
        Email:{" "}
        {!showEmail ? (
          <span onClick={() => setShowEmail(true)}>Show email address</span>
        ) : (
          <a href={`mailto:${email}`}>{email}</a>
        )}
      </li>
    </ul>
  );
};

export default ContactInfo;

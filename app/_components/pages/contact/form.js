"use client";

import { useState } from "react";

import Button from "../../button";

import data from "@/app/_data/general-data.json";

const {
  contactPage: {
    form: { propertyList, formAction },
  },
} = data;

const Form = () => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <section className="contact-form-container">
      <p className="contact-form-container__paragraph">
        Please fill out the form below, and we&apos;ll be in touch with you
        ASAP...
      </p>
      <form
        className="contact-form-container__form"
        action={`https://formsubmit.co/${formAction}`}
        method="POST"
      >
        <input
          type="text"
          name="subject"
          defaultValue="Website Contact Form"
          className="hidden"
        />
        <input type="text" name="_honey" className="hidden" />
        <div className="contact-form-container__form--group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Full name"
          />
        </div>
        {showMessage && (
          <>
            <div className="contact-form-container__form--group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                required
                placeholder="Phone number"
              />
            </div>
            <div className="contact-form-container__form--group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                required
                placeholder="Email address"
              />
            </div>
            <div className="contact-form-container__form--group">
              <label htmlFor="property">Property:</label>
              <select id="property" name="property">
                {propertyList.map((property, index) => (
                  <option key={index} value={property}>
                    {property}
                  </option>
                ))}
              </select>
            </div>
            <div className="contact-form-container__form--group">
              <label htmlFor="email">Message:</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Type your message here"
                rows={3}
              />
            </div>
          </>
        )}
        {showMessage && (
          <Button
            form
            onClick={() => setShowMessage(false)}
            cssClasses="mr-auto"
          >
            Submit
          </Button>
        )}
      </form>
      {!showMessage && (
        <Button
          formNext
          onClick={() => setShowMessage(true)}
          cssClasses="mr-auto"
        />
      )}
    </section>
  );
};

export default Form;

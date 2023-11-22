"use client";

import { useContext, useState } from "react";

import Button from "../../button";

import data from "@/app/_data/general-data.json";
import { LocationsContext } from "@/app/_context/locations-context";

const {
  contactPage: {
    form: { propertyList, formAction },
  },
} = data;

const Form = () => {
  const [showMessage, setShowMessage] = useState(false);
  const { enquireNowLocation } = useContext(LocationsContext);
  console.log(enquireNowLocation);
  return (
    <section className="contact-form-container">
      <p className="contact-form-container__paragraph">
        Please fill out the form below, and{" "}
        {enquireNowLocation ? (
          <>
            our team from <span>{enquireNowLocation}</span> will
          </>
        ) : (
          "we'll"
        )}{" "}
        be in touch with you ASAP...
      </p>
      <form
        className="contact-form-container__form"
        action={`https://formsubmit.co/${formAction}`}
        method="POST"
      >
        <input
          type="text"
          name="subject"
          defaultValue={`${enquireNowLocation} - Website Contact Form`}
          className="hidden"
        />
        <input type="text" name="_honey" className="hidden" />
        <div className="contact-form-container__form__group">
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
            <div className="contact-form-container__form__group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                required
                placeholder="Phone number"
              />
            </div>
            <div className="contact-form-container__form__group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                required
                placeholder="Email address"
              />
            </div>
            {enquireNowLocation ? null : (
              <div className="contact-form-container__form__group">
                <label htmlFor="property">Property:</label>

                <select id="property" name="property">
                  {propertyList.map((property, index) => (
                    <option key={index} value={property}>
                      {property}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="contact-form-container__form__group">
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

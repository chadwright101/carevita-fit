"use client";

import { useContext, useEffect, useRef, useState } from "react";

import Button from "../../_components/button";

import data from "@/app/_data/general-data.json";
import { LocationsContext } from "@/app/_context/locations-context";
import { sendEmail } from "@/app/actions";
import Recaptcha from "./recaptcha";

const {
  contactPage: {
    form: { propertyList },
  },
} = data;

const Form = () => {
  const [showMessage, setShowMessage] = useState(false);
  const { enquireNowLocation } = useContext(LocationsContext);
  const [submissionStartTime, setSubmissionStartTime] = useState();
  const [validateRecaptcha, setValidateRecaptcha] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const startSubmissionTimer = () => {
      setSubmissionStartTime(new Date().getTime());
    };
    startSubmissionTimer();
  }, []);

  const handleRecaptchaChange = (value) => {
    const elapsedTime = new Date().getTime() - submissionStartTime;
    if (elapsedTime < 2000) {
      console.error("Form submitted too quickly. Possible bot activity.");
      return;
    } else {
      setValidateRecaptcha(!!value);
    }
  };

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
        ref={ref}
        className="contact-form-container__form"
        action={async (formData) => {
          await sendEmail(formData);
          ref.current.reset();
        }}
      >
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
        {showMessage && validateRecaptcha && (
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
        {showMessage && validateRecaptcha && (
          <Button form onClick={() => setShowMessage(false)}>
            Submit
          </Button>
        )}
      </form>
      {!showMessage && (
        <>
          <Button
            formNext
            onClick={() => setShowMessage(true)}
            disabled={!validateRecaptcha}
            cssClasses="contact-form-container__next-button"
          />
          <Recaptcha onChange={handleRecaptchaChange} />
        </>
      )}
    </section>
  );
};

export default Form;

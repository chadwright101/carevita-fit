"use client";

import { useContext, useEffect, useRef, useState } from "react";

import Button from "../button";

import { LocationsContext } from "@/_context/locations-context";
import { sendEmail } from "@/_actions/send-email";
import Recaptcha from "@/_lib/Recaptcha";

const Form = () => {
  const [showMessage, setShowMessage] = useState(false);
  const { enquireNowLocation } = useContext(LocationsContext);
  const [submissionStartTime, setSubmissionStartTime] = useState();
  const [validateRecaptcha, setValidateRecaptcha] = useState(false);
  const [showEmailSubmitted, setShowEmailSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const startSubmissionTimer = () => {
      setSubmissionStartTime(new Date().getTime());
    };
    startSubmissionTimer();
    if (showEmailSubmitted) {
      const element = document.getElementById("email-submitted");
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [showEmailSubmitted]);

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
      {showEmailSubmitted ? (
        <>
          <div id="email-submitted" className="nav-point"></div>
          <p className="contact-form-container__paragraph--submitted ">
            Your email has been sent, we will be in touch soon.
          </p>
          <button
            type="button"
            className="button contact-form-container__paragraph__button"
            onClick={() => setShowEmailSubmitted(false)}
          >
            Go back
          </button>
        </>
      ) : (
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
      )}
      {showEmailSubmitted ? null : (
        <>
          <form
            ref={ref}
            className="contact-form-container__form"
            action={async (formData) => {
              const result = await sendEmail(formData);
              if (result.success) {
                ref.current.reset();
                setShowEmailSubmitted(true);
                setShowMessage(false);
                setErrorMessage(null);
              } else {
                setErrorMessage(result.error);
              }
            }}
          >
            <input type="text" name="_honey" className="hidden" />
            <div className="contact-form-container__form__group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                disabled={!validateRecaptcha}
                required
                placeholder="Full name"
                minLength="2"
              />
            </div>
            {errorMessage && (
              <div style={{ color: "#e74c3c", marginBottom: "1rem" }}>
                {errorMessage}
              </div>
            )}
            {showMessage && validateRecaptcha && (
              <>
                <div className="contact-form-container__form__group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="Phone number"
                    pattern="[+]?[0-9]+"
                  />
                </div>
                <div className="contact-form-container__form__group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Email address"
                  />
                </div>
                {enquireNowLocation ? null : (
                  <div className="contact-form-container__form__group">
                    <label htmlFor="property">Property:</label>

                    <input
                      type="text"
                      id="property"
                      name="property"
                      placeholder="Eg: Bronberg Retirement Estate"
                    />
                  </div>
                )}
                <div className="contact-form-container__form__group">
                  <label htmlFor="email">Message:</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Type your message here (minimum 30 characters)"
                    rows={3}
                    minLength="30"
                  />
                </div>
              </>
            )}
            {showMessage && validateRecaptcha && <Button form>Submit</Button>}
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
        </>
      )}
    </section>
  );
};

export default Form;

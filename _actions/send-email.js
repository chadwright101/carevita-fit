"use server";

import nodemailer from "nodemailer";
import data from "@/_data/general-data.json";
import { emailTemplateHtml } from "../_lib/EmailTemplateHtml";
import express from "express";
import rateLimit from "express-rate-limit";

import { sanitize } from "isomorphic-dompurify";

const app = express();

const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
});

app.use("/sendEmail", formLimiter);
app.use("/showPhoneNumber", formLimiter);
app.use("/showEmailAddress", formLimiter);

export async function sendEmail(formData) {
  const honey = formData.get("honey");

  try {
    if (honey === null) {
      const name = sanitize(formData.get("name"));
      const phone = sanitize(formData.get("phone"));
      const property = sanitize(formData.get("property"));
      const email = sanitize(formData.get("email"));
      const message = sanitize(formData.get("message"));

      const emailHtmlContent = emailTemplateHtml({
        name,
        phone,
        email,
        property,
        message,
      });

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        requireTLS: true,
      });
      const mailOptions = {
        from: process.env.SMTP_SEND_FROM,
        to: process.env.SMTP_SEND_TO,
        subject: "Website form submission - CareVita #fit",
        replyTo: email,
        html: emailHtmlContent,
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.error("Invalid form submission due to non-empty honeypot field");
    }
  } catch (error) {
    console.error(error);
  }
}

const {
  contactPage: { email, phone },
} = data;

export const showPhoneNumber = async () => {
  return phone;
};

export const showEmailAddress = async () => {
  return email;
};

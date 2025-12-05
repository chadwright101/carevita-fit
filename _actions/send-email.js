"use server";

import nodemailer from "nodemailer";
import data from "@/_data/general-data.json";
import { emailTemplateHtml } from "../_lib/EmailTemplateHtml";
import express from "express";
import rateLimit from "express-rate-limit";

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
      const name = formData.get("name");
      const phone = formData.get("phone");
      const property = formData.get("property");
      const email = formData.get("email");
      const message = formData.get("message");

      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_SEND_FROM || !process.env.SMTP_SEND_TO) {
        return {
          success: false,
          error: "Email service is not properly configured. Please try again later."
        };
      }

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
      return { success: true };
    } else {
      console.error("Invalid form submission due to non-empty honeypot field");
      return {
        success: false,
        error: "Form submission failed validation. Please try again."
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to send email. Please try again later."
    };
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

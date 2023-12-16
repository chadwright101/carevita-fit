"use server";

import nodemailer from "nodemailer";
import data from "@/app/_data/general-data.json";
import { emailTemplateHtml } from "./_lib/EmailTemplateHtml";

export async function sendEmail(formData) {
  const honey = formData.get("honey");

  try {
    if (honey === null) {
      const name = formData.get("name");
      const phone = formData.get("phone");
      const email = formData.get("email");
      const property = formData.get("property");
      const message = formData.get("message");

      const emailHtmlContent = emailTemplateHtml({
        name,
        phone,
        email,
        property,
        message,
      });

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
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

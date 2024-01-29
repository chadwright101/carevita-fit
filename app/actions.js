"use server";

import nodemailer from "nodemailer";
import data from "@/app/_data/general-data.json";
import { emailTemplateHtml } from "./_lib/EmailTemplateHtml";
import express from "express";
import rateLimit from "express-rate-limit";
import { db, bucket } from "./_firebase/firebase-admin";

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
      const email = sanitize(formData.get("email"));
      const property = sanitize(formData.get("property"));
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

export const saveTestimonial = async (
  testimonialId,
  editedName,
  editedParagraph,
  editedProperty
) => {
  await db.doc(`testimonials/${testimonialId}`).update({
    name: editedName,
    paragraph: editedParagraph,
    property: editedProperty,
  });
};

export const deleteTestimonial = async (testimonialId) => {
  await db.doc(`testimonials/${testimonialId}`).delete();
};

export const addTestimonial = async (data) => {
  await db.collection("testimonials").add(data);
};

export const updateTestimonialTimestamp = async (
  updatedTimestamp,
  testimonialId
) => {
  await db
    .doc(`testimonials/${testimonialId}`)
    .update({ timestamp: updatedTimestamp });
};

export const getTestimonialsServer = async () => {
  const testimonialsSnapshot = await db
    .collection("testimonials")
    .orderBy("timestamp", "desc")
    .get();
  const testimonials = testimonialsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return testimonials;
};

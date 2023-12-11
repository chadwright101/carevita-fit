"use server";

import nodemailer from "nodemailer";
import data from "@/app/_data/general-data.json";

export async function sendEmail(formData) {
  const honey = formData.get("honey");

  try {
    if (honey === null) {
      const name = formData.get("name");
      const phone = formData.get("phone");
      const email = formData.get("email");
      const property = formData.get("property");
      const message = formData.get("message");

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "justdeejays@gmail.com",
          pass: "cbvvjizxcfokbppa",
        },
      });
      const mailOptions = {
        from: "justdeejays@gmail.com",
        to: "justdeejays@gmail.com",
        subject: "Website form submission - CareVita #fit",
        text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        Property: ${property}
        Message: ${message}
        `,
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

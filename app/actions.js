"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData) {
  try {
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
  } catch (error) {
    console.error(error);
  }
}

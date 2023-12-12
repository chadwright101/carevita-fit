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
        replyTo: email,
        html: `<html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CareVita #fit</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0;">
    <table style="width: 100%; background-color: #94c36a;">
      <tr>
        <td>
          <h1 style="padding: 1rem;">CareVita #fit</h1>
        </td>
      </tr>
    </table>

    <table style="width: 100%; padding: 1rem;">
      <tr>
        <td>
          <h3 style="font-size: 1.25rem">Website form submission</h3>
          <p style="font-size: 1rem; margin-top: 1rem; font-weight: 500;">
            Name: <span style="font-weight: 200; font-style: italic;">${name}</span>
          </p>
          <p style="font-size: 1rem; margin: 1rem 0; font-weight: 500;">
            Phone number: <span style="font-weight: 200; font-style: italic;">${phone}</span>
          </p>
          <p style="font-size: 1rem; font-weight: 500;">
            Email address: <span style="font-weight: 200; font-style: italic;">${email}</span>
          </p>
          <p style="font-size: 1rem; margin: 1rem 0; font-weight: 500;">
            Property in question: <span style="font-weight: 200; font-style: italic;">${property}</span>
          </p>
          <p style="font-size: 1rem; font-weight: 500;">
            Message:
            <br />
            <span style="font-weight: 200; font-style: italic;">${message}</span>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
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

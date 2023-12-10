import nodemailer from "nodemailer";

export async function POST() {
  try {
    const { name, phone, email, property, message } = await req.json();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "justdeejays@gmail.com",
        pass: "2728xX*X",
      },
    });

    const mailOptions = {
      from: "justdeejays@gmail.com",
      to: email,
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

    return Response.json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error(error);
    Response.json({ success: false, error: "Failed to send email" });
  }
}

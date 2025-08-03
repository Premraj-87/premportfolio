/* eslint-disable no-undef */
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  const { name, email, message, companyName, timeElapsed } = req.body;

  if (!req.headers["x-secret-key"] || req.headers["x-secret-key"] !== process.env.NEXT_PUBLIC_FORM_SECRET_KEY) {
    return res.status(403).json({ success: false, error: "Unauthorized" });
  }

  if (companyName || timeElapsed < 2000) {
    return res.status(400).json({ success: false, error: "Bot detected" });
  }

  if (!name || name.length < 2 || !email || !message || message.length < 10) {
    return res.status(400).json({ success: false, error: "Invalid input" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: "New Message from Portfolio",
      text: `From: ${name} <${email}>\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    return res.status(500).json({ success: false, error: "Server error sending email." });
  }
}

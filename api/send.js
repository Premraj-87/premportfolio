/* eslint-disable no-undef */
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  const { name, email, message, companyName, timeElapsed } = req.body;

  // Basic bot/spam protection
  if (req.headers["x-secret-key"] !== process.env.FORM_SECRET_KEY) {
    return res.status(403).json({ success: false, error: "Unauthorized request" });
  }

  if (companyName || timeElapsed < 2000) {
    return res.status(400).json({ success: false, error: "Bot detected" });
  }

  if (!name || name.length < 2 || !email || !email.includes("@") || !message || message.length < 10) {
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

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: "New Portfolio Contact Message",
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ success: false, error: "Server error sending email" });
  }
}

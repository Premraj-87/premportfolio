/* eslint-disable no-undef */
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { name, email, message, companyName, timeElapsed } = req.body;
  const secret = req.headers["x-secret-key"];
  const expectedSecret = process.env.FORM_SECRET_KEY;

  // Debug logging (only in development)
  if (process.env.NODE_ENV !== "production") {
    console.log("Client secret:", secret);
    console.log("Expected secret:", expectedSecret);
  }

  // 🛡️ Security: Secret key validation
  if (!secret || secret !== expectedSecret) {
    return res.status(401).json({ success: false, error: "Unauthorized - Invalid or missing secret key" });
  }

  // 🕵️‍♂️ Spam/Bot Detection
  if (companyName || timeElapsed < 2000) {
    return res.status(400).json({ success: false, error: "Bot detected" });
  }

  // ✅ Validation
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ success: false, error: "Invalid name" });
  }

  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, error: "Invalid email" });
  }

  if (!message || message.trim().length < 10) {
    return res.status(400).json({ success: false, error: "Message too short" });
  }

  // 📧 Send Email
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "New message from portfolio",
      html: `
        <h2>📬 New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Email send error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}

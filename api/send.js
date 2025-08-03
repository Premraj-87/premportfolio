/* eslint-disable no-undef */
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  // ✅ Secret Key validation from header
  const clientSecret = req.headers["x-secret-key"];
  if (clientSecret !== process.env.FORM_SECRET_KEY) {
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid Secret Key" });
  }

  const { name, email, message } = req.body;

  // ✅ Input validation
  if (
    !name?.trim() ||
    !email?.trim() ||
    !message?.trim() ||
    name.length > 100 ||
    email.length > 100 ||
    message.length > 1000
  ) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,      // stored in Vercel
        pass: process.env.MY_PASSWORD,   // stored in Vercel (App Password)
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.MY_EMAIL}>`,
      replyTo: email,
      to: process.env.MY_EMAIL,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    // ✅ Secure headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "no-referrer");

    return res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ success: false, message: "Email send failed." });
  }
}

/* eslint-disable no-undef */
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // ✅ Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  // ✅ Secret Key Validation
  const clientSecret = req.headers["x-secret-key"];
  if (clientSecret !== process.env.FORM_SECRET_KEY) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  // ✅ Basic validation and sanitization
  const { name, email, message } = req.body;

  if (
    !name?.trim() ||
    !email?.trim() ||
    !message?.trim() ||
    message.length > 1000 || // ✅ Anti-spam: limit message size
    name.length > 100 ||
    email.length > 100
  ) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  // ✅ Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.MY_EMAIL}>`,
      replyTo: email,
      to: process.env.MY_EMAIL,
      subject: `New message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    // ✅ Add security headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "no-referrer");

    return res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ success: false, message: "Email send failed." });
  }
}

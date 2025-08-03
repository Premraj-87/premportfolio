/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
"use client";
import { motion } from "framer-motion";
import { ArrowUp, Mail, Github, Linkedin, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Contact() {
  const [showScroll, setShowScroll] = useState(false);
  const [formStatus, setFormStatus] = useState({ loading: false, success: null });
  const [modalOpen, setModalOpen] = useState(false);
  const [loadTime, setLoadTime] = useState(Date.now());

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    setLoadTime(Date.now());
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const sendEmail = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name")?.trim(),
      email: formData.get("email")?.trim(),
      message: formData.get("message")?.trim(),
      companyName: formData.get("companyName")?.trim(),
      timeElapsed: Date.now() - loadTime,
    };

    if (data.companyName || data.timeElapsed < 2000) return;

    if (!data.name || data.name.length < 2) return alert("Invalid name");
    if (!data.email || !data.email.includes("@")) return alert("Invalid email");
    if (!data.message || data.message.length < 10) return alert("Message too short");

    try {
      setFormStatus({ loading: true, success: null });

      const res = await axios.post("/api/send", data, {
        headers: {
          "Content-Type": "application/json",
          "x-secret-key": process.env.NEXT_PUBLIC_FORM_SECRET_KEY,
        },
      });

      if (res.data.success) {
        setFormStatus({ loading: false, success: true });
        e.target.reset();
        setModalOpen(true);
      } else {
        setFormStatus({ loading: false, success: false });
        alert(res.data.error || "Failed to send.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setFormStatus({ loading: false, success: false });
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 px-6 bg-white dark:bg-black text-black dark:text-white"
    >
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-sm w-full shadow-xl text-center text-black dark:text-white">
            <X
              className="absolute top-3 right-3 cursor-pointer hover:text-[#DAA520]"
              onClick={() => setModalOpen(false)}
            />
            <h3 className="text-xl font-bold text-[#DAA520] mb-2">Message Sent!</h3>
            <p>Thank you for reaching out. I'll get back to you soon.</p>
          </div>
        </div>
      )}

      {/* Form */}
      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* Contact Info */}
        <div className="md:w-1/3 w-full flex justify-center">
          <div className="bg-[#f1f5f9] dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-lg flex flex-col items-center gap-6">
            <h3 className="text-2xl font-semibold text-[#DAA520]">Let's Connect</h3>
            <div className="space-y-4 text-center">
              <a href="mailto:premrajanand91@gmail.com" className="flex items-center gap-2 justify-center hover:text-[#DAA520] transition">
                <Mail size={18} /> premrajanand91@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/premrajanand87/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center hover:text-[#DAA520] transition">
                <Linkedin size={18} /> linkedin.com/in/premrajanand-87
              </a>
              <a href="https://github.com/Premraj-87" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center hover:text-[#DAA520] transition">
                <Github size={18} /> github.com/Premraj-87
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="md:w-2/3 w-full">
          <h2 className="text-4xl font-bold text-[#DAA520] mb-8 text-center md:text-left">Contact Me</h2>
          <div className="bg-[#e2e8f0] dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 p-8 rounded-lg shadow-lg">
            <form className="space-y-5" onSubmit={sendEmail}>
              <input type="text" name="companyName" className="hidden" tabIndex="-1" autoComplete="off" />
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Your Name</label>
                <input type="text" name="name" required className="w-full px-4 py-2 rounded-md border bg-white dark:bg-black text-black dark:text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Your Email</label>
                <input type="email" name="email" required className="w-full px-4 py-2 rounded-md border bg-white dark:bg-black text-black dark:text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Your Message</label>
                <textarea name="message" required className="w-full px-4 py-2 rounded-md border bg-white dark:bg-black text-black dark:text-white h-32 resize-none" />
              </div>
              <button type="submit" disabled={formStatus.loading} className="bg-[#DAA520] text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition duration-300">
                {formStatus.loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>

      <div className="mt-24 text-sm text-[#DAA520] text-center">
        © {new Date().getFullYear()} Prem Raj Anand
      </div>

      {showScroll && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#DAA520] text-white shadow-lg hover:bg-yellow-600 transition duration-300" aria-label="Scroll to top">
          <ArrowUp size={20} />
        </button>
      )}
    </section>
  );
}

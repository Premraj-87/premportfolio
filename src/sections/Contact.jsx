import { motion } from "framer-motion";
import { ArrowUp, Mail, Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Contact() {
  const [showScroll, setShowScroll] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      honey: formData.get("website"), // honeypot field
      timestamp: parseInt(formData.get("timestamp"), 10),
    };

    try {
      const res = await axios.post("/api/send", data, {
        headers: {
          "x-secret-key": "premraj@2025!contact_secure", // Replace with your key
        },
      });

      if (res.data.success) {
        alert("Message sent successfully!");
        e.target.reset();
        setTimestamp(Date.now()); // Reset timestamp for next submission
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 px-6 bg-white dark:bg-black text-black dark:text-white"
    >
      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* Left Side: Contact Info */}
        <div className="md:w-1/3 w-full flex justify-center">
          <div className="bg-[#f1f5f9] dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-lg flex flex-col items-center justify-center gap-6">
            <h3 className="text-2xl font-semibold text-[#DAA520]">
              Let's Connect
            </h3>

            <div className="space-y-4 text-center">
              <a
                href="mailto:premrajanand91@gmail.com"
                className="flex items-center gap-2 justify-center text-black dark:text-white hover:text-[#DAA520] transition"
              >
                <Mail size={18} /> premrajanand91@gmail.com
              </a>

              <a
                href="https://www.linkedin.com/in/premrajanand-87"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 justify-center text-black dark:text-white hover:text-[#DAA520] transition"
              >
                <Linkedin size={18} /> linkedin.com/in/premrajanand-87
              </a>

              <a
                href="https://github.com/PremRajAnand"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 justify-center text-black dark:text-white hover:text-[#DAA520] transition"
              >
                <Github size={18} /> github.com/PremRajAnand
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="md:w-2/3 w-full">
          <h2 className="text-4xl font-bold text-[#DAA520] mb-8 text-center md:text-left">
            Contact Me
          </h2>

          <div className="bg-[#e2e8f0] dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 p-8 rounded-lg shadow-lg">
            <form className="space-y-5" onSubmit={sendEmail}>
              <input type="hidden" name="timestamp" value={timestamp} />
              <div style={{ display: "none" }}>
                <label>
                  Website
                  <input type="text" name="website" />
                </label>
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Your Message
                </label>
                <textarea
                  name="message"
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white h-32 resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-[#DAA520] text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-24 text-sm text-[#DAA520] text-center">
        © {new Date().getFullYear()} Prem Raj Anand
      </div>

      {/* Scroll to top */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#DAA520] text-white shadow-lg hover:bg-yellow-600 transition duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </section>
  );
}

/* eslint-disable no-unused-vars */
// src/sections/Intro.jsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TypeAnimation } from "react-type-animation";
import { FaArrowDown } from "react-icons/fa";
import profileLight from "../assets/images/profile-light.png";
import profileDark from "../assets/images/profile-dark.png";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const nameRef = useRef(null);
  const imageRef = useRef(null);
  const name = "Prem Raj Anand";

  // GSAP Word-by-word name animation
  useEffect(() => {
    const chars = nameRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: nameRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  // GSAP Parallax effect on image
  useEffect(() => {
    gsap.to(imageRef.current, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      id="intro"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 max-w-7xl mx-auto transition-colors duration-500 overflow-hidden"
    >
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between w-full gap-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Left Text */}
        <div className="flex-1">
          <h1
            ref={nameRef}
            className="text-4xl sm:text-5xl font-bold mb-4 text-[#FF6F61] tracking-wide"
          >
            {name.split("").map((char, i) => (
              <span key={i} className="inline-block char">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <TypeAnimation
            sequence={[
              "Full Stack Developer",
              1500,
              "MERN Stack Developer",
              1500,
              "React & Node.js Enthusiast",
              1500,
            ]}
            wrapper="p"
            speed={50}
            className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-4"
            repeat={Infinity}
          />

          <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-lg">
            I craft interactive, visually rich web experiences using modern tech. <br />
            Let’s build something incredible together.
          </p>

          <div className="flex gap-4">
            <a
              href="/assets/resume.pdf"
              download
              className="px-6 py-2 border border-[#FF6F61] text-[#FF6F61] rounded hover:bg-[#FF6F61] hover:text-white transition duration-300"
            >
              Download CV
            </a>
            <a
              href="#contact"
              className="px-6 py-2 border border-[#FF6F61] text-[#FF6F61] rounded hover:bg-[#FF6F61] hover:text-white transition duration-300"
            >
              Let’s Talk
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1" ref={imageRef}>
          <img
            src={profileLight}
            alt="Profile"
            className="block dark:hidden w-full max-w-sm mx-auto rounded-lg transition-opacity duration-500"
          />
          <img
            src={profileDark}
            alt="Profile"
            className="hidden dark:block w-full max-w-sm mx-auto rounded-lg transition-opacity duration-500"
          />
        </div>
      </motion.div>

      {/* Scroll down button */}
      <a
        href="#about"
        className="absolute right-5 bottom-5 flex items-center gap-1 text-sm text-[#FF6F61] hover:underline transition"
      >
        scroll down <FaArrowDown size={12} />
      </a>
    </section>
  );
}

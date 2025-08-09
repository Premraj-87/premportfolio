import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-center bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div ref={contentRef}>
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold text-[#FF6F61] mb-6"
          >
            About Me
          </h2>

          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            I’m{" "}
            <span className="font-semibold text-[#FF6F61]">
              Prem Raj Anand
            </span>
            , a creative and detail-oriented full-stack web developer who turns
            ideas into functional, scalable, and visually striking digital
            products.
          </p>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            My stack includes{" "}
            <span className="font-medium text-[#FF6F61]">
              React, Tailwind CSS, GSAP, and Node.js
            </span>
            . I thrive on crafting user-centric interfaces that are not just
            beautiful, but also fast and accessible.
          </p>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            I'm constantly pushing my skills further into backend systems and
            scalable architecture to become a fully autonomous engineer who
            delivers complete solutions.
          </p>
        </div>

        {/* Right: Optional Image or Skills Block */}
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-sm p-6 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg bg-gray-50 dark:bg-gray-900">
            <h3 className="text-xl font-semibold mb-4 text-[#FF6F61]">
              Key Strengths
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li>Clean and maintainable code</li>
              <li>Responsive & accessible UI</li>
              <li>GSAP / Framer Motion animation</li>
              <li>Full-stack project mindset</li>
              <li>Client-focused communication</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

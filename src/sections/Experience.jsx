import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Web Developer",
    company: "BitFusion Technologies",
    location: "Remote, Ranchi",
    duration: "May 2024 – March 2025",
    description: [
   "Developed scalable and responsive web applications using React, HTML, CSS, and JavaScript.",
  "Redesigned and modernized the entire website architecture to improve UX/UI and performance.",
  "Built a dynamic platform for clients to track and manage their carbon footprint data in real-time.",
  "Integrated and maintained backend systems for secure data storage and efficient retrieval.",
  "Collaborated directly with clients to gather detailed requirements and deliver tailored solutions with technical documentation."
    ],
  },
  {
    role: "Frontend Developer",
    company: "Serengstar (Startup)",
    location: "On-site, Ranchi",
    duration: "Feb 2023 – Aug 2023",
    description: [
      "Designed and developed the entire website for a music video competition platform.",
  "Integrated a backend system to securely receive and store video submissions from users.",
  "Optimized performance and UX to handle real traffic and engagement from genuine participants.",
  "Implemented responsive UI/UX design ensuring compatibility across devices and browsers."
    ],
  },
  {
    role: "Web Development Intern",
    company: "Ardent Computech Pvt. Ltd.",
    location: "Remote",
    duration: "Jun 2023 – Jul 2023",
    description: [
       "Led the team during the internship to design and develop a complete e-commerce website for plant sales.",
  "Focused heavily on UI/UX design to ensure a visually appealing and user-friendly shopping experience.",
  "Handled both frontend and backend integration, building features like product listings, cart, and checkout.",
  "Delivered a responsive, scalable, and performance-optimized solution using modern web development practices."
    ],
  },
];

export default function Experience() {
  useEffect(() => {
    gsap.utils.toArray(".experience-card").forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        }
      );
    });
  }, []);

  return (
    <section
      id="experience"
      className="w-full bg-white dark:bg-black text-gray-900 dark:text-white py-20 px-6 md:px-10 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto border border-[#DAA520]/30 rounded-2xl p-8 sm:p-12 shadow-md dark:shadow-lg dark:border-[#DAA520]/20">
        <h2 className="text-4xl font-bold text-center text-[#DAA520] mb-12">
          Experience
        </h2>

        <div className="relative pl-10 sm:pl-12">
          {/* Vertical line */}
          <div className="absolute top-0 left-4 sm:left-5 h-full w-[2px] bg-[#DAA520]/40" />

          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="experience-card relative mb-12 ml-4 sm:ml-6"
            >
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm dark:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <h3 className="text-xl font-semibold text-[#DAA520]">
                    {exp.role}
                    <span className="text-gray-800 dark:text-white font-medium">
                      {" "}
                      @ {exp.company}
                    </span>
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-sm italic text-gray-600 dark:text-gray-400 mb-3">
                  {exp.location}
                </p>
                <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {exp.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

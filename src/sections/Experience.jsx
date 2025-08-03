import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Web Developer",
    company: "Diliate",
    location: "Remote, Faridabad, Haryana",
    duration: "Apr 2024 – Feb 2025",
    description: [
      "Developed responsive websites using HTML, CSS, JavaScript, and frameworks.",
      "Maintained and optimized websites for performance, security, and functionality.",
      "Communicated with clients to gather requirements and deliver documentation.",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Enord Aerospace",
    location: "Remote, New Delhi",
    duration: "Apr 2023 – Jun 2023",
    description: [
      "Supported debugging, testing, and code reviews.",
      "Maintained/upgraded web pages for cross-browser and mobile compatibility.",
      "Collaborated on feature implementation and UI/UX improvements.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Ardent Computech Pvt. Ltd.",
    location: "Remote",
    duration: "Jun 2023 – Jul 2023",
    description: [
      "Assisted in backend integration using PHP and MySQL.",
      "Participated in agile meetings, sprint planning, and code reviews.",
      "Contributed to front-end development and UI design.",
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

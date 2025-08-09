import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Smart Portfolio Builder",
    description:
      "An AI-powered dynamic portfolio builder with live preview, custom themes, and markdown content support.",
    image: "/projects/portfolio-ai.jpg",
    tech: ["React", "Tailwind", "Framer Motion", "GSAP"],
    link: "https://example.com/portfolio-ai",
  },
  {
    title: "TaskSync Pro",
    description:
      "A full-stack task and productivity app with calendar integration and real-time sync features.",
    image: "/projects/task-sync.jpg",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    link: "https://example.com/tasksync",
  },
  {
    title: "Animated Startup Landing",
    description:
      "A visually engaging startup landing page built with GSAP scroll animations and modern design.",
    image: "/projects/landing-page.jpg",
    tech: ["React", "GSAP", "Tailwind", "Framer Motion"],
    link: "https://example.com/landing",
  },
  {
    title: "E-Commerce UI Kit",
    description:
      "A reusable and animated e-commerce frontend UI with beautiful product cards and cart logic.",
    image: "/projects/ecommerce.jpg",
    tech: ["React", "Tailwind", "GSAP"],
    link: "https://example.com/ecommerce-ui",
  },
  {
    title: "Blogify CMS",
    description:
      "A simple and responsive blog content management app with markdown support and dashboard UI.",
    image: "/projects/blogify.jpg",
    tech: ["React", "Node.js", "MongoDB"],
    link: "https://example.com/blogify",
  },
  {
    title: "EventEase",
    description:
      "An animated event listing platform with filterable cards, RSVP system, and interactive UI.",
    image: "/projects/eventease.jpg",
    tech: ["React", "Tailwind", "Framer Motion"],
    link: "https://example.com/eventease",
  },
];

export default function Projects() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    gsap.utils.toArray(".project-card").forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.1,
        }
      );
    });
  }, []);

  return (
    <section
      id="projects"
      className="min-h-screen py-20 px-4 sm:px-6 md:px-12 bg-white dark:bg-black text-gray-900 dark:text-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#FF6F61]">
          Projects
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-card bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-800 cursor-pointer"
              onClick={() => setSelected(project)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-semibold text-[#FF6F61]">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {project.description.slice(0, 80)}...
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-[#FF6F61]/10 text-[#FF6F61] text-xs px-2 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Preview */}
        {selected && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full p-6 relative shadow-xl">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
              >
                <X size={24} />
              </button>
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-[#FF6F61] mb-2">
                {selected.title}
              </h3>
              <p className="text-sm text-gray-800 dark:text-gray-300 mb-4">
                {selected.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selected.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-[#FF6F61]/10 text-[#FF6F61] text-xs px-2 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 bg-[#FF6F61] text-white font-medium py-2 px-4 rounded hover:opacity-90 transition"
              >
                View Live Project
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

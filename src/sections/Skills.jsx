import { useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaUsers,
  FaCode,
  FaMagic,
  FaDatabase,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiVite,
} from "react-icons/si";

const skillData = {
  Frontend: [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    { name: "React", icon: <FaReact className="text-cyan-400" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-sky-400" /> },
    { name: "Vite", icon: <SiVite className="text-purple-400" /> },
  ],
  Backend: [
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
    { name: "Express", icon: <SiExpress className="text-white" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
    { name: "Database", icon: <FaDatabase className="text-blue-300" /> },
  ],
  Tools: [
    { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
    { name: "GitHub", icon: <FaGithub className="text-white" /> },
    { name: "VS Code", icon: <FaCode className="text-blue-500" /> },
    { name: "Figma", icon: <FaFigma className="text-pink-400" /> },
  ],
  SoftSkills: [
    { name: "Teamwork", icon: <FaUsers className="text-indigo-400" /> },
    { name: "Problem Solving", icon: <FaMagic className="text-yellow-400" /> },
    { name: "Communication", icon: <FaMagic className="text-pink-400" /> },
    { name: "Creativity", icon: <FaMagic className="text-purple-400" /> },
  ],
};

const tabs = ["Frontend", "Backend", "Tools", "SoftSkills"];

export default function Skills() {
  const [activeTab, setActiveTab] = useState("Frontend");

  return (
    <section
      id="skills"
      className="py-20 px-4 bg-white dark:bg-black transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#FF6F61] mb-10">
          Skills
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium border ${
                activeTab === tab
                  ? "bg-[#FF6F61] text-white"
                  : "text-gray-700 dark:text-gray-300 border-gray-500 hover:border-[#FF6F61] hover:text-[#FF6F61]"
              } transition-colors duration-300`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Skill Grid */}
        <div className="px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {skillData[activeTab].map((skill, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 border rounded-xl shadow-sm bg-gray-50 dark:bg-gray-900 dark:border-gray-700 hover:shadow-md hover:border-[#FF6F61] transition duration-300"
              >
                <div className="text-4xl mb-2">{skill.icon}</div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {skill.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

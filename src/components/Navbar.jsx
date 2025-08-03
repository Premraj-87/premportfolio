// src/components/Navbar.jsx
import { FaHome, FaUser, FaGraduationCap, FaCode, FaProjectDiagram, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const navItems = [
  { id: "intro", icon: <FaHome />, label: "Home" },
  { id: "about", icon: <FaUser />, label: "About" },
  { id: "education", icon: <FaGraduationCap />, label: "Education" },
  { id: "skills", icon: <FaCode />, label: "Skills" },
  { id: "projects", icon: <FaProjectDiagram />, label: "Projects" },
  { id: "contact", icon: <FaEnvelope />, label: "Contact" },
];

export default function Navbar() {
  return (
    <motion.nav
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg rounded-full px-4 py-2 flex gap-4 border border-gray-300 dark:border-gray-700"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="text-xl text-gray-600 dark:text-gray-300 hover:text-[goldenrod] dark:hover:text-[goldenrod] transition duration-300 p-2"
          title={item.label}
        >
          {item.icon}
        </a>
      ))}
    </motion.nav>
  );
}

// components/SocialSidebar.jsx
import { Github, Linkedin, Twitter } from "lucide-react";

export default function SocialSidebar() {
  const links = [
    {
      href: "https://github.com/Premraj-87",
      icon: <Github size={20} />,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/premrajanand87/",
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
    },
    {
      href: "https://x.com/premrajanand91",
      icon: <Twitter size={20} />,
      label: "Twitter (X)",
    },
  ];

  return (
    <div className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 flex-col gap-6 z-50">
      {links.map(({ href, icon, label }, index) => (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-gray-600 dark:text-gray-300 hover:text-[#DAA520] transition-colors duration-300"
        >
          {icon}
        </a>
      ))}
      <div className="w-px h-24 mx-auto bg-gray-400 dark:bg-gray-600 mt-2" />
    </div>
  );
}

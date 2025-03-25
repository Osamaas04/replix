"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function NavItem({ text, href, active }) {
  return (
    <a
      href={href}
      className={`flex items-center space-x-3 p-2 transition-transform duration-300 scroll-smooth 
        ${active ? "scale-125 text-secondary" : "text-secondary/30 hover:scale-125 hover:text-secondary"}`}
    >
      <span>{text}</span>
    </a>
  );
}

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["dashboard", "chats", "integrations", "results", "pricing"];
      let currentSection = "";
      let foundSection = false;

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section;
            foundSection = true;
            break;
          }
        }
      }

      setActiveSection(currentSection);
      setIsVisible(foundSection); // Show navbar if a section is active, otherwise hide
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isVisible ? "0%" : "-100%" }}
      transition={{ type: "tween", duration: 0.7 }}
      className="hidden md:grid lg:grid content-center fixed top-0 left-0 h-screen font-raleway z-10 bg-transparent w-48 p-4  flex-col space-y-2"
    >
      <NavItem text="- Dashboard" href="#dashboard" active={activeSection === "dashboard"} />
      <NavItem text="- Chats" href="#chats" active={activeSection === "chats"} />
      <NavItem text="- Integration" href="#integrations" active={activeSection === "integrations"} />
      <NavItem text="- Results" href="#results" active={activeSection === "results"} />
      <NavItem text="- Pricing" href="#pricing" active={activeSection === "pricing"} />
    </motion.div>
  );
}

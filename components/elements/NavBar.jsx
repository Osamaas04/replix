"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function NavItem({ text, href }) {
    return (
      <a
        href={href}
        className="flex items-center space-x-3 p-2 transition-transform duration-300 hover:scale-125 text-secondary/30 hover:text-secondary"
      >
        <span className="text-secondary/30 hover:text-secondary">{text}</span>
      </a>
    );
  }

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="hidden md:grid lg:grid content-center fixed top-0 left-0 h-screen font-raleway z-10"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isVisible ? "0%" : "-100%" }}
        transition={{ type: "tween", duration: 0.6 }}
        className="bg-transparent w-48 h-full  p-4 flex flex-col space-y-2"
      >
        <NavItem text="- Dashboard" href="#dashboard" />
        <NavItem text="- Chats" href="#chats" />
        <NavItem text="- Integration" href="#" />
        <NavItem text="- Pricing" href="#" />
        <NavItem text="- Features" href="#" />
      </motion.div>
    </div>
  );
}

"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function IntroBanner() {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 3.5 }}
      className="grid justify-center"
    >
      <motion.div
        className="relative flex gap-2 items-center bg-gray-500/20 rounded-3xl py-1 px-3 cursor-pointer overflow-hidden group"
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="relative z-10 text-gray-100 flex items-center gap-2 text-xs sm:text-sm md:text-base">
          ✨ Introducing Replix <ArrowRight className="w-4" />
        </span>

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
          initial={{ x: "-100%", opacity: 0 }}
          whileHover={{
            x: "100%",
            opacity: 1,
            transition: {
              x: { duration: 1.5, ease: "easeOut" },
              opacity: { duration: 0.6 },
            },
          }}
          exit={{ x: "100%", opacity: 0 }}
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: "80%" }}
        />
      </motion.div>
    </motion.div>
  );
}

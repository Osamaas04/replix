"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SubHeadline() {
    return(
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 3.5 }}
          className="grid gap-8 sm:gap-12 justify-items-center text-center"
        >
          <p className="text-base sm:text-lg md:text-xl text-secondary/70 leading-relaxed">
            AI-powered customer support that automates responses
            <br className="hidden sm:block" />
            and enhances customer engagement.
          </p>

          <Link
            href="/sign-up"
            className="inline-block w-fit text-primary bg-secondary border-2 border-secondary/70 
             shadow-[0_0_15px_theme(colors.secondary/60%)] rounded-3xl px-6 py-3 text-sm sm:text-base
             transition-all duration-500 ease-in-out 
             hover:text-secondary hover:bg-transparent hover:shadow-[0_0_25px_theme(colors.secondary/80%)]"
            aria-label="Join the beta"
          >
            Request a Demo
          </Link>
        </motion.div>
    )
}
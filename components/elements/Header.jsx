"use client";

import Logo from "@/public/assets/chatlogo.webp";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header({ shouldAnimate }) {

  const motionProps = shouldAnimate ? {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  } : {};

  return (
    <motion.header
      {...motionProps}
      className="font-raleway fixed top-0 w-full z-50 bg-gradient-to-b from-primary to-transparent px-6 md:px-24 pt-4 md:pt-6 flex justify-between items-center"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 3.5 }}
        {...(shouldAnimate ? {} : { initial: {}, animate: {}, transition: {} })}
      >
        <Link href="/" className="flex space-x-3 items-center">
          <Image src={Logo} alt="Replix logo" width={29} height={29} />
          <p className="text-secondary text-xl md:text-2xl font-semibold">Replix</p>
        </Link>
      </motion.div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 3.5 }}
        {...(shouldAnimate ? {} : { initial: {}, animate: {}, transition: {} })}
        className="flex items-center space-x-6"
      >
        <Link
          href="/sign-up"
          className="text-secondary bg-transparent border-2 border-solid border-secondary/70 rounded-3xl px-4 py-1 transition-all duration-500 hover:bg-secondary hover:text-primary"
          aria-label="Join the beta"
        >
          Get started
        </Link>
      </motion.div>
    </motion.header>
  );
}

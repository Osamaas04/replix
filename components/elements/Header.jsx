"use client";

import Logo from "@/public/assets/chatlogo.webp";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const API_GATEWAY = "https://gw.replix.space";

export default function Header({ shouldAnimate }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("unauthenticated");

  useEffect(() => {
    async function checkToken() {
      try {
        const response = await fetch(`${API_GATEWAY}/checkAuthToken`, {
          method: "GET",
          headers: { "Content-Type": "apllication/json" },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Check Toekn failed");
        }

        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        console.log("Internal server error");
      }
    }
    checkToken();
  }, []);

  async function handleLogout() {
    setLoading(true);
    try {
      const response = await fetch(`${API_GATEWAY}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      window.location.reload();
    } catch (error) {
      toast.error("Failed to logout, try again later");
    } finally {
      setLoading(false);
    }
  }

  const motionProps = shouldAnimate
    ? {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" },
      }
    : {};

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
          <p className="text-secondary text-xl md:text-2xl font-semibold">
            Replix
          </p>
        </Link>
      </motion.div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 3.5 }}
        {...(shouldAnimate ? {} : { initial: {}, animate: {}, transition: {} })}
        className="flex items-center space-x-6"
      >
        {status === "unauthenticated" ? (
          <Link
            href="/sign-up"
            className="text-secondary bg-transparent border-2 border-solid border-secondary/70 rounded-md px-4 py-1 transition-all duration-500 hover:bg-secondary hover:text-primary"
            aria-label="Join the beta"
          >
            Get started
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-secondary w-24 h-8 rounded-md justify-center flex items-center gap-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle
                className="animate-spin text-white"
                width={18}
                height={18}
              />
            ) : (
              "Logout"
            )}
          </button>
        )}
      </motion.div>
    </motion.header>
  );
}

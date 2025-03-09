"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const getRandom = (max, unit = "") => `${Math.floor(Math.random() * max)}${unit}`;
const randomBetween = (min, max) => Math.random() * (max - min) + min;

const Star = ({ size }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAnimationData({
        style: {
          width: size,
          height: size,
          left: getRandom(window.innerWidth, "px"),
          top: getRandom(window.innerHeight, "px"),
        },
        animate: {
          opacity: [0, randomBetween(0.5, 1), 0], // Fades in and out randomly
        },
        transition: {
          duration: randomBetween(2, 5), // Controls how long the fade lasts
          delay: randomBetween(3, 8), // Minimum delay of 3 seconds before starting
          repeat: Infinity, // Keeps repeating forever
          ease: "easeInOut", // Smooth fade effect
        },
      });
    }
  }, [size]);

  return animationData ? (
    <motion.div
      className="absolute bg-secondary rounded-full"
      style={animationData.style}
      animate={animationData.animate}
      transition={animationData.transition}
    />
  ) : null;
};

const StarrySky = ({ count = 75 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={getRandom(4, "px")} />
      ))}
    </div>
  );
};

export default StarrySky;

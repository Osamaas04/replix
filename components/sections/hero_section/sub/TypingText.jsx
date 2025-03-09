"use client";

import { useEffect } from "react";
import Typewriter from "typewriter-effect/dist/core";

const TypewriterComponent = () => {
  useEffect(() => {
    const element = document.getElementById("typewriter");

    if (element) {
      const typewriter = new Typewriter(element, {
        autoStart: true,
        delay: 40,
        deleteSpeed: 20,
        loop: false,
        cursor: "",
      });

      typewriter
        .typeString('Replix is the new way<br />')
        .pauseFor(500)
        .typeString('to automate customer support')
        .start();
    }
  }, []);

  return (
    <div>
      <div
        id="typewriter"
        className="text-secondary"
      ></div>
    </div>
  );
};

export default TypewriterComponent;

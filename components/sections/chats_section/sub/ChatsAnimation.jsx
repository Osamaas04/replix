"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChatsBackground } from "./ChatsBackground";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ChatsAnimation() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [milestonesReached, setMilestonesReached] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const intervalId = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 2);

      const nextTime = elapsedTime + 3;

      if (nextTime === 3 && !milestonesReached.includes(2)) {
        setMilestonesReached((prev) => [...prev, 2]);
      }
      if (nextTime === 5 && !milestonesReached.includes(4)) {
        setMilestonesReached((prev) => [...prev, 4]);
      }
      if (nextTime === 8 && !milestonesReached.includes(6)) {
        setMilestonesReached((prev) => [...prev, 6]);
      }
      if (nextTime === 11 && !milestonesReached.includes(8)) {
        setMilestonesReached((prev) => [...prev, 8]);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isVisible, elapsedTime, milestonesReached]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      router.push("/login");
    }
  };

  return (
    <div ref={sectionRef} className="font-raleway">
      <div className="flex justify-center items-center">
        <ChatsBackground />
        <div className="flex flex-col bg-primary/30 backdrop-blur-md w-full max-w-[30rem] h-full max-h-[30rem] py-8 absolute z-10 rounded-md border border-secondary/70 shadow-[inset_-30px_30px_40px_0_rgba(255,204,0,0.1)] space-y-4 px-8">
          <div className="flex flex-col space-y-4 flex-grow">
            {elapsedTime >= 0 && (
              <p className="text-secondary w-fit self-end bg-secondary/10 inline-block px-4 py-2 rounded-lg">
                Hi
              </p>
            )}
            {elapsedTime >= 2 && (
              <p className="text-secondary w-fit bg-secondary/10 inline-flex items-center gap-2 px-4 py-2 rounded-lg">
                <Sparkles size={15} />
                Hello, How Can I help you?
              </p>
            )}
            {elapsedTime >= 4 && (
              <p className="text-secondary w-fit self-end bg-secondary/10 inline-block px-4 py-2 rounded-lg">
                Can I return a product if I don't have a receipt?
              </p>
            )}
            {elapsedTime >= 6 && (
              <p className="text-secondary w-fit bg-secondary/10 inline-flex items-center gap-2 px-4 py-2 rounded-lg">
                <Sparkles size={15} />
                Kindly contact our sales team for more info.
              </p>
            )}
          </div>

          <div className="relative mt-auto">
            <input
              type="text"
              placeholder="Ask anything"
              className="bg-secondary/10 text-secondary w-full h-10 rounded-2xl pl-4 focus:outline-0 placeholder:text-secondary/20 placeholder:font-raleway focus:placeholder-transparent"
              onKeyDown={handleKeyDown}
            />
            <Link href="/login">
              <ArrowRight
                size={20}
                color="white"
                className="absolute right-4 top-1/2 -translate-y-1/2"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import HeroPic from "@/public/assets/hero.png";
import { BorderBeam } from "../ui/border-beam";
import { motion } from "framer-motion";

export default function Headline() {
  return (
    <motion.div
      className="relative w-full max-w-[78vw] aspect-video rounded-md overflow-hidden"
      initial={{
        boxShadow: "0 -150px 300px 0 rgba(255, 204, 0, 0.1)",
      }}
      animate={{
        boxShadow: [
          "0 -150px 300px 0 rgba(255, 204, 0, 0.1)",
          "0 -200px 400px 0 rgba(255, 204, 0, 0.2)", // Larger shadow with more opacity
          "0 -150px 300px 0 rgba(255, 204, 0, 0.1)",
        ],
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        delay: 5,
      }}
    >
      <div className="flex flex-col-reverse">
        <div className="bg-gradient-to-b from-transparent to-primary w-[100%] h-[50%] absolute z-10" />
        <Image
          src={HeroPic}
          alt="wv"
          className="object-cover w-full !h-[106%] rounded-md opacity-70"
        />
      </div>

      <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-orange-500 to-transparent"
      />
    </motion.div>
  );
}

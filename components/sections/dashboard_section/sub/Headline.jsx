import Image from "next/image";
import HeroPic from "@/public/assets/hero-dark.png";

export default function Headline() {
  return (
    <div className="relative w-full max-w-screen-lg aspect-video rounded-[2rem] overflow-hidden shadow-[0_-30px_40px_0_rgba(255,204,0,0.1)]">
      <div className="absolute inset-0 bg-secondary/70" />

      <div className="absolute inset-0 before:absolute before:left-[-25%] before:top-[-25%] before:h-[150%] before:w-[150%] before:animate-border-spin before:bg-[conic-gradient(rgba(255,182,193,1)_0deg,rgba(255,126,95,1)_0deg,transparent_80deg)] ">
        
        <div className="absolute inset-[1px]">
          <Image
            src={HeroPic}
            alt="wv"
            className="object-cover w-full !h-[107%] rounded-[2rem]"
            layout="fill"
          />
        </div>

        <div className="bg-gradient-to-bl from-transparent to-primary w-[100%] h-[100%] relative z-10" />
      </div>
    </div>
  );
}

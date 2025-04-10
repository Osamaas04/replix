import TypewriterComponent from "../sub/TypingText";
import IntroBanner from "../sub/IntroBanner";
import SubHeadline from "../sub/SubHeadline";
import { Particles } from "../ui/particles";

export default function HeroSection() {
  return (
    <div className="relative bg-primary text-secondary font-raleway flex items-center justify-center px-4 sm:px-8 text-center pt-[7rem]">
      <div className="absolute overflow-hidden w-full">
        <Particles />
      </div>

      <div className="grid gap-6 sm:gap-8 z-10 max-w-4xl">
        <div className="grid gap-12 sm:gap-16">
          <IntroBanner />

          <div className="relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold space-y-2">
            <TypewriterComponent />
          </div>
        </div>

        <SubHeadline />
      </div>
    </div>
  );
}

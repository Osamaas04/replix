import SplitLayout from "@/components/demo/SplitLayout";
import { Particles } from "@/components/sections/hero_section/ui/particles";

export default function Demo() {
    return (
      <div className="bg-primary h-screen">
        <div className="absolute overflow-hidden h-[100%] w-full">
          <Particles />
        </div>
        <SplitLayout />
      </div>
    );
  }
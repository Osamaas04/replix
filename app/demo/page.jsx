import StarrySky from "@/components/sections/hero_section/sub/StarrySky";
import SplitLayout from "@/components/demo/SplitLayout";

export default function Demo() {
    return (
      <div className="bg-primary h-screen">
        <div className="absolute inset-0">
          <StarrySky />
        </div>
        <SplitLayout />
      </div>
    );
  }
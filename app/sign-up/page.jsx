import { Particles } from "@/components/sections/hero_section/ui/particles";
import SplitLayout from "../../components/authentication/sign-up/SplitLayout";

export default function Signup() {
  return (
    <div className="bg-primary h-screen">
      <div className="absolute overflow-hidden h-[100%] w-full">
        <Particles />
      </div>
      <SplitLayout />
    </div>
  );
}

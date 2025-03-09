import StarrySky from "@/components/sections/hero_section/sub/StarrySky";
import SplitLayout from "../../components/authentication/sign-up/SplitLayout";

export default function Signup() {
  return (
    <div className="bg-primary h-screen">
      <div className="absolute inset-0">
        <StarrySky />
      </div>
      <SplitLayout />
    </div>
  );
}

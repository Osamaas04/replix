import StarrySky from "@/components/sections/hero_section/sub/StarrySky";
import SplitLayout from "../../components/authentication/sign-in/SplitLayout";

export default function Login() {
  return (
    <div className="bg-primary h-screen">
      <div className="absolute inset-0">
        <StarrySky />
      </div>
      <SplitLayout />
    </div>
  );
}

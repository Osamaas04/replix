import { useState } from "react";
import AccountDetails from "../sub/AccountDetails";
import PlanDetails from "../sub/PlanDetails";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const API_GATEWAY = "https://gw.replix.space";

export default function Account() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setLoading(true);
    try {
      const response = await fetch(`${API_GATEWAY}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/")
    } catch (error) {
      toast.error("Failed to logout, try again later");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="grid gap-4 px-4 py-12 lg:py-14 lg:pr-14 lg:pl-[19.5rem] w-auto">
        <div className="grid gap-2">
          <h1 className="text-secondary text-3xl font-semibold">Account</h1>
          <h3 className="text-secondary/70">
            Manage your personal and company details with ease.
          </h3>
        </div>

        <div className="flex flex-col gap-4 w-auto lg:w-[68vw]">
          <AccountDetails />
          <PlanDetails />
        </div>

        <div className="justify-self-end">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-secondary w-24 h-8 rounded-md justify-center flex items-center gap-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle
                className="animate-spin text-white"
                width={18}
                height={18}
              />
            ) : "Logout"}
            
          </button>
        </div>
      </div>
    </div>
  );
}

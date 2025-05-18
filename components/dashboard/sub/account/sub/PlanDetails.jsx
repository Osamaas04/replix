import { useEffect, useState } from "react";
import { CreditCard, CalendarFold, CheckCircle } from "lucide-react";
import {
  pricingPlansMo,
  pricingPlansAnn,
} from "@/components/sections/pricing_section/main/Pricing";
import { toast } from "sonner";

const API_GATEWAY = "https://gw.replix.space";

function capitalizeFirstLetter(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function PlanDetails() {
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    async function handleBilling() {
      try {
        const response = await fetch(`${API_GATEWAY}/plan`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch plan details");
        }

        const data = await response.json();
        setPlanData(data);
      } catch (error) {
        console.error("Error fetching billing info:", error);
        toast.error("Failed to load plan details");
      }
    }

    handleBilling();
  }, []);

  async function handlePayment() {
    try {
      const response = await fetch(`${API_GATEWAY}/billing`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to load billing portal");
      }

      const data = await response.json();

      if (data?.url) {
        window.location.href = data.url
      } else {
        throw new Error("Billing portal URL missing");
      }
    } catch (error) {
      console.error("Error fetching billing portal:", error);
      toast.error("Could not open billing portal");
    }
  }

  const selectedPlan = (() => {
    if (!planData) return null;

    const source =
      planData.billingCycle === "monthly" ? pricingPlansMo : pricingPlansAnn;
    return source.find((plan) => plan.priceId === planData.priceId) || null;
  })();

  return (
    <div className="bg-secondary/10 text-secondary px-4 sm:px-6 md:px-10 py-8 rounded-md overflow-x-auto">
  <div className="grid gap-8">
    <div className="grid gap-2">
      <h1 className="font-semibold text-2xl">Your Plan</h1>
    </div>

    <div className="flex flex-col md:flex-row gap-12">
      {/* Included in your plan */}
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <h1 className="font-semibold text-lg">Included in your plan</h1>
        {planData && selectedPlan ? (
          <p className="mt-1 text-base text-secondary font-semibold">
            {selectedPlan.title}
          </p>
        ) : (
          <div className="mt-2 h-6 w-40 bg-secondary/15 rounded animate-pulse" />
        )}

        {planData ? (
          <ul className="mt-2 space-y-2">
            {selectedPlan?.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} />
                {feature}
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid gap-4 mt-2 animate-pulse">
            <div className="h-4 bg-secondary/15 rounded w-64" />
            <div className="h-4 bg-secondary/15 rounded w-56" />
            <div className="h-4 bg-secondary/15 rounded w-60" />
            <div className="h-4 bg-secondary/15 rounded w-48" />
          </div>
        )}
      </div>

      {/* Billing and payment */}
      <div className="w-full md:w-1/2 grid gap-4">
        <h1 className="font-semibold text-lg">Billing and payment</h1>

        {planData ? (
          <>
            <div className="flex items-center gap-2 mt-2">
              <CreditCard size={22} />
              <p>
                {capitalizeFirstLetter(planData.paymentMethod.brand)} ending{" "}
                <span className="font-sans align-sub">****</span>
                {planData.paymentMethod.last4}
              </p>
            </div>

            <button
              onClick={handlePayment}
              className="bg-secondary border border-secondary text-primary rounded-md px-2 py-1 w-full sm:w-52 text-center"
            >
              Edit billing and payment
            </button>

            <div className="flex items-center gap-2 mt-4">
              <CalendarFold size={22} />
              <p>{`${planData.amount}$/${planData.billingCycle === "monthly" ? "mo" : "ann"}`}</p>
            </div>

            <p className="mt-1">
              {planData.billingCycle === "monthly"
                ? "Monthly Plan, paid monthly"
                : "Annual Plan, paid annually"}
            </p>
          </>
        ) : (
          <div className="grid gap-4 animate-pulse">
            <div className="flex items-center gap-2 mt-2">
              <div className="bg-secondary/15 rounded-full w-[22px] h-[22px]" />
              <div className="h-4 bg-secondary/15 rounded w-32" />
            </div>

            <div className="bg-secondary/15 border border-secondary/30 text-transparent rounded-md px-2 py-1 w-52 h-8" />

            <div className="flex items-center gap-2 mt-4">
              <div className="bg-secondary/15 rounded-full w-[22px] h-[22px]" />
              <div className="h-4 bg-secondary/15 rounded w-24" />
            </div>

            <div className="mt-1">
              <div className="h-4 bg-secondary/15 rounded w-40" />
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  );
}

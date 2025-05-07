import { useEffect, useState } from "react";
import Router from "next/router";
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
        toast.success("Plan details loaded");
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
        toast.success("Redirecting to billing portal...");
        Router.push(data.url);
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
    <div className="bg-secondary/10 text-secondary px-20 py-8 rounded-md w-[50rem]">
      <div className="grid gap-8">
        <div>
          <h1 className="font-semibold text-xl">Your Plan</h1>
          {planData && selectedPlan ? (
            <p className="mt-1 text-lg text-secondary font-semibold">
              {selectedPlan.title}
            </p>
          ) : (
            <div className="mt-2 h-6 w-40 bg-secondary/30 rounded animate-pulse" />
          )}
        </div>

        <div className="flex flex-row justify-between">
          {/* Included in your plan */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Included in your plan</h3>
            {planData ? (
              <ul className="mt-2 space-y-2">
                {selectedPlan?.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} className="text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="grid gap-4 mt-2 animate-pulse">
                <div className="h-4 bg-secondary/30 rounded w-64" />
                <div className="h-4 bg-secondary/30 rounded w-56" />
                <div className="h-4 bg-secondary/30 rounded w-60" />
                <div className="h-4 bg-secondary/30 rounded w-48" />
              </div>
            )}
          </div>

          {/* Billing and payment section */}
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold">Billing and payment</h3>
            </div>

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

                <div className="mt-2">
                  <button
                    onClick={handlePayment}
                    className="bg-secondary border border-secondary text-primary rounded-md px-2 py-1 w-52 text-center inline-block"
                  >
                    Edit billing and payment
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <CalendarFold size={22} />
                  <p>
                    {`${planData.amount}$/${
                      planData.billingCycle === "monthly" ? "mo" : "ann"
                    }`}
                  </p>
                </div>

                <p className="mt-1">
                  {planData.billingCycle === "monthly"
                    ? "Monthly Plan, paid monthly"
                    : "Annual Plan, paid annually"}
                </p>
              </>
            ) : (
              <div className="grid gap-4">
                <div className="flex items-center gap-2 mt-2 animate-pulse">
                  <div className="bg-secondary/30 rounded-full w-[22px] h-[22px]" />
                  <div className="h-4 bg-secondary/30 rounded w-32" />
                </div>

                <div className="mt-2 animate-pulse">
                  <div className="bg-secondary/30 border border-secondary/30 text-transparent rounded-md px-2 py-1 w-52 h-8" />
                </div>

                <div className="flex items-center gap-2 mt-4 animate-pulse">
                  <div className="bg-secondary/30 rounded-full w-[22px] h-[22px]" />
                  <div className="h-4 bg-secondary/30 rounded w-24" />
                </div>

                <div className="mt-1 animate-pulse">
                  <div className="h-4 bg-secondary/30 rounded w-40" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

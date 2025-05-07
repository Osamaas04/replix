import {
  pricingPlansMo,
  pricingPlansAnn,
} from "@/components/sections/pricing_section/main/Pricing";
import { useEffect, useState } from "react";
import { CreditCard, CalendarFold } from "lucide-react";
import Link from "next/link";

const API_GATEWAY = "https://gw.replix.space/plan";

function capitalizeFirstLetter(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function PlanDetails() {
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    async function handleBilling() {
      try {
        const response = await fetch(API_GATEWAY, {
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
      }
    }

    handleBilling();
  }, []);

  return (
    <div className="bg-secondary/10 text-secondary px-20 py-8 rounded-md w-[50rem]">
      <div className="grid gap-8">
        <div>
          <h1 className="font-semibold text-xl">Your Plan</h1>
        </div>

        <div className="flex flex-row justify-between">
          <div>
            <h3 className="font-semibold">Included in your plan</h3>
          </div>

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
                  <Link
                    href="#"
                    className="bg-secondary border border-secondary text-primary rounded-md px-2 py-1 w-20"
                  >
                    Edit billing and payment
                  </Link>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <CalendarFold size={22} />
                  <p>
                    {`${
                      planData.billingCycle === "monthly" ? "29$/mo" : "290$/yr"
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
              <div>
                {/* Payment Method */}
                <div className="flex items-center gap-2 mt-2 animate-pulse">
                  <div className="bg-secondary/30 rounded-full w-[22px] h-[22px]" />
                  <div className="h-4 bg-secondary/30 rounded w-48" />
                </div>

                {/* Edit Billing Button */}
                <div className="mt-2 animate-pulse">
                  <div className="bg-secondary/30 border border-secondary/30 text-transparent rounded-md px-2 py-1 w-40 h-8" />
                </div>

                {/* Billing Cycle */}
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

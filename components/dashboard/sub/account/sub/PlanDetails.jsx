import {
    pricingPlansMo,
    pricingPlansAnn,
  } from "@/components/sections/pricing_section/main/Pricing";
  import { useEffect, useState } from "react";
  import { CreditCard, CalendarFold } from "lucide-react";
  import Link from "next/link";
  
  const API_GATEWAY = "https://gw.replix.space/plan";
  
  export default function PlanDetails() {
    const [planData, setPlanData] = useState(null);
  
    useEffect(() => {
      async function handleBilling() {
        try {
          const response = await fetch(API_GATEWAY, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch plan details");
          }
  
          const data = await response.json();
          setPlanData(data); // store in state
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
  
            <div>
              <div>
                <h3 className="font-semibold">Billing and payment</h3>
              </div>
  
              {planData ? (
                <>
                  <div className="flex items-center gap-2 mt-2">
                    <CreditCard size={22} />
                    <p>
                      {planData.paymentMethod.brand} ending ****
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
                <p>Loading billing info...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
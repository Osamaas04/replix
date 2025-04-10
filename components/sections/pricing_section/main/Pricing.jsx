import { useState, useEffect } from "react";
import Headline from "../sub/Headline";
import PricingCards from "../sub/PricingCards";
import { Switch } from "@/components/dashboard/sub/integrations/ui/switch";
import { motion } from "framer-motion"; // Import framer-motion

export default function Pricing() {
  const [isActivated, setIsActivated] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Add state to trigger re-render

  const pricingPlansMo = [
    {
      title: "Starter AI",
      price: "$29",
      description: "Getting started with AI-driven support.",
      features: [
        "2 social media account integrations",
        "Basic analytics dashboard",
        "Email support",
        "AI-generated insights",
      ],
      billing: "mo",
      href: "#",
    },
    {
      title: "Pro AI",
      price: "$59",
      description: "Advanced AI features for professionals.",
      features: [
        "4 social media account integrations",
        "Advanced analytics dashboard",
        "Priority email support",
        "AI-powered automation",
      ],
      billing: "mo",
      href: "#"
    },
    {
      title: "Enterprise AI",
      price: "$99",
      description: "Enterprise-level AI tools.",
      features: [
        "Unlimited social media account",
        "Custom analytics & reporting",
        "24/7 dedicated support",
        "AI-powered workflow automation",
      ],
      billing: "mo",
      href: "#"
    },
  ];

  const pricingPlansAnn = [
    {
      title: "Starter AI",
      price: "$290",
      description: "Getting started with AI-driven support.",
      features: [
        "2 social media account integrations",
        "Basic analytics dashboard",
        "Email support",
        "AI-generated insights",
      ],
      billing: "ann",
      href: "#",
    },
    {
      title: "Pro AI",
      price: "$590",
      description: "Advanced AI features for professionals.",
      features: [
        "4 social media account integrations",
        "Advanced analytics dashboard",
        "Priority email support",
        "AI-powered automation",
      ],
      billing: "ann",
      href: "#"
    },
    {
      title: "Enterprise AI",
      price: "$990",
      description: "Enterprise-level AI tools.",
      features: [
        "Unlimited social media account",
        "Custom analytics & reporting",
        "24/7 dedicated support",
        "AI-powered workflow automation",
      ],
      billing: "ann",
      href: "#"
    },
  ];

  // Trigger animation reset when switching plans
  useEffect(() => {
    setAnimationKey(prevKey => prevKey + 1); // Increment the key to trigger animation
  }, [isActivated]);

  return (
    <div className="bg-primary grid justify-center overflow-hidden" id="pricing">
      <Headline />
      <div className="flex justify-center items-center gap-2">
        <Switch onClick={() => setIsActivated(prev => !prev)} />
        <p className="text-secondary">Annual</p>
        <div className="bg-secondary rounded-3xl">
          <p className="text-xs text-primary font-semibold py-1 px-2">2 MONTHS FREE ✨</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:flex justify-center gap-8 p-8">
        {isActivated
          ? pricingPlansAnn.map((plan, index) => (
            <PricingCards
              key={index}
              title={plan.title}
              price={<motion.span
                key={animationKey} // Use animationKey to trigger re-animation
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {plan.price}
              </motion.span>}
              description={plan.description}
              features={plan.features}
              billing={plan.billing}
              href={plan.href}
              className={plan.price === "$590" ? "border-[#FFA500]/50" : ""}
            />
          ))
          : pricingPlansMo.map((plan, index) => (
            <PricingCards
              key={index}
              title={plan.title}
              price={<motion.span
                key={animationKey} // Use animationKey to trigger re-animation
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {plan.price}
              </motion.span>}
              description={plan.description}
              features={plan.features}
              billing={plan.billing}
              href={plan.href}
              className={plan.price === "$59" ? "border-[#FFA500]/50" : ""}
            />
          ))
        }
      </div>
    </div>
  );
}

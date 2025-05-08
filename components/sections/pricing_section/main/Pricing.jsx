import { useState, useEffect } from "react";
import Headline from "../sub/Headline";
import PricingCards from "../sub/PricingCards";
import { Switch } from "@/components/dashboard/sub/integrations/ui/switch";
import { motion } from "framer-motion";

export const pricingPlansMo = [
  {
    title: "Starter AI",
    price: "$29",
    description: "Getting started with AI-driven support.",
    features: [
      "2 social media account",
      "500 AI responses/month",
      "Basic AI model",
      "No human agent escalation",
    ],
    billing: "mo",
    priceId: "price_1RFvvlFkqathCLJmjPaoRSCb",
  },
  {
    title: "Pro AI",
    price: "$59",
    description: "Advanced AI features for professionals.",
    features: [
      "3 social media account",
      "2000 AI responses/month",
      "Advanced AI model",
      "Human agent escalation",
    ],
    billing: "mo",
    priceId: "price_1RFvwRFkqathCLJmal7eJ6z5",
  },
  {
    title: "Enterprise AI",
    price: "$99",
    description: "Enterprise-level AI tools.",
    features: [
      "Unlimited social media account",
      "Unlimited AI responses",
      "Custom AI tuning",
      "AI training from conversations",
    ],
    billing: "mo",
    priceId: "price_1RFvwzFkqathCLJmGNdYcGO9",
  },
];

export const pricingPlansAnn = [
  {
    title: "Starter AI",
    price: "$290",
    description: "Getting started with AI-driven support.",
    features: [
      "2 social media account",
      "500 AI responses/month",
      "Basic AI model",
      "No human agent escalation",
    ],
    billing: "ann",
    priceId: "price_1RFvyAFkqathCLJm7au2D00K",
  },
  {
    title: "Pro AI",
    price: "$590",
    description: "Advanced AI features for professionals.",
    features: [
      "3 social media account",
      "2000 AI responses/month",
      "Advanced AI model",
      "Human agent escalation",
    ],
    billing: "ann",
    priceId: "price_1RFvyjFkqathCLJmERiWYgVA",
  },
  {
    title: "Enterprise AI",
    price: "$990",
    description: "Enterprise-level AI tools.",
    features: [
      "Unlimited social media account",
      "Unlimited AI responses",
      "Custom AI tuning",
      "AI training from conversations",
    ],
    billing: "ann",
    priceId: "price_1RFvyxFkqathCLJmZMjK5Wsx",
  },
];

export default function Pricing() {
  const [isActivated, setIsActivated] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); 

  useEffect(() => {
    setAnimationKey(prevKey => prevKey + 1);
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
              priceId={plan.priceId}
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
              priceId={plan.priceId}
              className={plan.price === "$59" ? "border-[#FFA500]/50" : ""}
            />
          ))
        }
      </div>
    </div>
  );
}

import { useState } from "react";
import Headline from "../sub/Headline";
import PricingCards from "../sub/PricingCards";

export default function Pricing() {
  const [isActivated, setIsActivated] = useState(false)

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
      description: "Enterprise-level AI tools .",
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
      price: "$348",
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
      price: "$708",
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
      price: "$1188",
      description: "Enterprise-level AI tools .",
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

  return (
    <div className="bg-primary grid justify-center overflow-hidden" id="pricing">
      <Headline />
      <div className="flex border border-secondary/70 rounded-md w-fit mx-auto">
        <button className={` w-fit px-2 py-1 rounded-md text-secondary bg-primary ${!isActivated && "bg-secondary !text-primary"
          }`}
          onClick={() => setIsActivated(false)}>Monthly</button>

        <button className={`inline-flex w-fit px-2 py-1 rounded-md text-secondary bg-primary ${isActivated && "bg-secondary !text-primary"
          }`}
          onClick={() => setIsActivated(true)}>Annually</button>
      </div>
      <div className="grid md:grid-cols-2 lg:flex justify-center gap-8 p-8">
        {isActivated
          ? pricingPlansAnn.map((plan, index) => (
            <PricingCards
              key={index}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              billing={plan.billing}
              href={plan.href}
            />
          ))
          : pricingPlansMo.map((plan, index) => (
            <PricingCards
              key={index}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              billing={plan.billing}
              href={plan.href}
            />
          ))
        }

      </div>
    </div>
  );
}

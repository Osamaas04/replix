import Headline from "../sub/Headline";
import PricingCards from "../sub/PricingCards";

export default function Pricing() {
  const pricingPlans = [
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
    },
  ];

  return (
    <div className="bg-primary grid justify-center overflow-hidden" id="pricing">
        <Headline />
      <div className="grid md:grid-cols-2 lg:flex justify-center gap-8 p-8">
        {pricingPlans.map((plan, index) => (
          <PricingCards
            key={index}
            title={plan.title}
            price={plan.price}
            description={plan.description}
            features={plan.features}
          />
        ))}
      </div>
    </div>
  );
}

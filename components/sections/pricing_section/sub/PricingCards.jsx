import Feature from "./Feature";
import { cn } from "@/lib/utils";

const API_GATEWAY = "https://gw.replix.space/subscription";

export default function PricingCards({
  title,
  price,
  description,
  features,
  billing,
  priceId,
  className,
}) {
  const handlePurchase = async () => {
    try {
      const response = await fetch(`${API_GATEWAY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error("Stripe URL not returned");
      }
    } catch (error) {
      console.error("Purchase failed:", error);
    }
  };

  return (
    <div
      className={cn(
        "bg-primary/30 backdrop-blur-md rounded-md border border-secondary/70 w-[20rem] p-8 shadow-[inset_-30px_30px_40px_0_rgba(255,204,0,0.1)]",
        className
      )}
    >
      <div className="text-secondary font-raleway grid gap-8">
        <div className="grid gap-8 justify-start">
          <h1 className="text-2xl">{title}</h1>
          <h2 className="text-3xl flex gap-3 items-end">
            {price}
            <span className="text-base text-secondary/70">/{billing}</span>
          </h2>
          <p className="text-sm">{description}</p>
        </div>
        <hr className="border-secondary/70" />
        <div className="grid gap-4">
          {features.map((feature, index) => (
            <Feature key={index} feature={feature} />
          ))}
        </div>
        <div className="grid justify-center">
          <button
            onClick={handlePurchase}
            className="bg-secondary text-primary border hover:bg-primary hover:text-secondary hover:border-secondary rounded-md px-12 py-2 transition-all duration-500"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

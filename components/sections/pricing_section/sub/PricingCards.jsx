import Feature from "./Feature";

export default function PricingCards({ title, price, description, features,billing, href }) {
  return (
    <div className="bg-primary/30 backdrop-blur-md rounded-md border border-secondary/70 w-[20rem] p-8 shadow-[inset_-30px_30px_40px_0_rgba(255,204,0,0.1)]">
      <div className="text-secondary font-raleway grid gap-8">
        <div className="grid gap-8 justify-start">
          <h1 className="text-2xl">{title}</h1>
          <h2 className="text-3xl flex gap-3 items-end">
            {price}<span className="text-base text-secondary/70">/{billing}</span>
          </h2>
          <p className="text-sm">{description}</p>
          
        </div>
        <hr className="border-secondary/70"/>
        <div className="grid gap-4">
          {features.map((feature, index) => (
            <Feature key={index} feature={feature} />
          ))}
        </div>
        <div className="grid justify-center">
          <a href={href} className="bg-secondary text-primary rounded-md border border-secondary/20 px-12 py-2">
            Purchase
          </a>
        </div>
      </div>
    </div>
  );
}

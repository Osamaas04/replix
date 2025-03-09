import { CircleCheckBig } from "lucide-react";

export default function Feature({feature}) {
  return (
    <p className="flex gap-2 items-center">
      <CircleCheckBig size={18}/>
      <span className="text-sm text-secondary/70">
        {feature}
      </span>
    </p>
  );
}

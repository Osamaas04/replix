import { CircleCheckBig, CircleX } from "lucide-react";

export default function Feature({feature}) {
  return (
    <p className="flex gap-2 items-center">
      {feature === "No human agent escalation" ? <CircleX size={18}/> : <CircleCheckBig size={18}/>}
      <span className="text-sm text-secondary/70">
        {feature}
      </span>
    </p>
  );
}

import { NumberTicker } from "../ui/number-ticker";

export function NumberTickerDemo({value}) {
  return (
    <NumberTicker
      value={value}
      className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-secondary"
    />
  );
}

import { NumberTickerDemo } from "./NumberTickerDemo";

export default function Statistics({title, value}) {
  return (
    
      <div className="grid justify-items-center items-center font-raleway gap-6">
        <NumberTickerDemo value={value}/>
        <p className="text-secondary/70 text-center">{title}</p>
    </div>
  );
}

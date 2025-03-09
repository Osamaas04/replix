import Headline from "../sub/Headline";
import Statistics from "../sub/Statistics";

export default function Results() {
  return (
    <div className="bg-primary">
      <div className="grid justify-center gap-16">
        <Headline />
        <div className="grid sm:grid-cols-2 md:flex gap-32 justify-center">
          <Statistics title="Reduction in Operational Costs" value={60} />
          <Statistics title="Faster Response Time" value={85} />
          <Statistics title="Task Accuracy Rate" value={92} />
        </div>
      </div>
    </div>
  );
}

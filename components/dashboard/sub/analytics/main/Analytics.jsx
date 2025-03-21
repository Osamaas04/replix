import { EscalationRate } from "../sub/EscalationRate";
import { QueryVolume } from "../sub/QueryVolume";
import { ResolvedCases } from "../sub/ResolvedCases";
import { ResponseTime } from "../sub/ResponseTime";
import { TestChart } from "../sub/TestChart";

export default function Analytics() {
  return (
    <div>
      <div className="grid gap-4 px-4 py-12 lg:py-14 lg:pr-14 lg:pl-[19.5rem] w-auto">
        <div className="grid gap-2">
          <h1 className="text-secondary text-3xl font-semibold">Analytics</h1>
          <h3 className="text-secondary/70">
            Track, Monitor, and Improve AI-Powered Customer Support for Better
            Engagement and Efficiency
          </h3>
        </div>
        <div className="grid gap-4 w-auto lg:w-[68vw]">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
            <ResolvedCases />
            <ResponseTime />
          </div>
          <div className="grid gap-4">
            <QueryVolume />
            <div className="grid md:grid-cols-2 gap-4">
                <EscalationRate />
                <TestChart/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

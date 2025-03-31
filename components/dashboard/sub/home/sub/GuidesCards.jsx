import { Rocket } from "lucide-react";
import { Progress } from "../ui/progress";
import { TasksAccordion } from "./TasksAccordion";

export default function GuidesCards() {
  return (
    <div className="text-secondary w-auto lg:w-[68vw]">
      <div className="bg-primary border border-secondary/70 rounded-md p-4 flex-1 min-w-0">
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <Rocket />
            <h1 className="text-lg font-semibold">Set up Guide</h1>
          </div>
          <Progress value={33} />
        </div>

        <div className="mt-4">
          <TasksAccordion />
        </div>
      </div>
    </div>
  );
}

import AssignAgent from "../sub/AssignAgent";

export default function Agents() {
  return (
    <div>
      <div className="grid gap-4 px-4 py-12 lg:py-14 lg:pr-14 lg:pl-[19.5rem] w-auto">
        <div className="grid gap-2">
          <h1 className="text-secondary text-3xl font-semibold">
            Human Agent
          </h1>
          <h3 className="text-secondary/70">
            Assign and manage team members to handle customer interactions directly.
          </h3>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 w-auto lg:w-[68vw]">
          <AssignAgent />
        </div>
      </div>
    </div>
  );
}

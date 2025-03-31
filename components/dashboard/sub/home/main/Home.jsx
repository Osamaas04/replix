import DocsTask from "../sub/DocsTask";
import GuidesCards from "../sub/GuidesCards";


export default function Home() {
  return (
    <div>
      <div className="grid gap-4 px-4 py-12 lg:py-14 lg:pr-14 lg:pl-[19.5rem] w-auto">
        <div className="grid gap-2">
          <h1 className="text-secondary text-3xl font-semibold">Home</h1>
          <h3 className="text-secondary/70">
            You’re almost There! Finish These Tasks to Get The Best Experience.
          </h3>
        </div>
        <div className="grid gap-8">
          <GuidesCards />
          <DocsTask />
        </div>
      </div>
    </div>
  );
}

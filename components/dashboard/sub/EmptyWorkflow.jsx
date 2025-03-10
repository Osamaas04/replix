import { Play, Pause, ZapOff } from "lucide-react";

export default function EmptyWorkflow({ icon: Icon, title }) {
  return (
    <div className="flex flex-col gap-8 justify-center items-center border border-primary/10 rounded-md w-[60rem] h-[20rem] my-auto">
      <div className="grid justify-self-center border border-primary/10 border-dashed rounded-full p-8 w-fit h-fit">
        <Icon />
      </div>

      <div className="grid justify-center">
        <h1 className="font-semibold text-center">{title}</h1>
      </div>
    </div>
  );
}

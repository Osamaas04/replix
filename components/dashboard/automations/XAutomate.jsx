import { Play, Pause } from "lucide-react";

export default function XAutomate({ status, onStatusChange }) {
    const isActivated = status === true; // Using boolean status for clarity

  return (
    <div className="flex px-8 py-4 w-[60rem] justify-between">
      <div className="flex items-center gap-4">
        <svg
          role="img"
          viewBox="0 0 24 24"
          width={25}
          height={25}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
        <h1 className="font-semibold">X</h1>
      </div>

      <button
        className="border border-primary/10 flex items-center gap-2 px-2 py-1 rounded-md"
        onClick={() => onStatusChange(!isActivated)}
      >
        {isActivated ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Activate</>}
      </button>
    </div>
  );
}

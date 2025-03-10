import { Play, Pause } from "lucide-react";

export default function MessengerAutomate({ status, onStatusChange }) {

  return (
    <div className="flex border-b border-primary/10 px-8 py-4 w-[60rem] mx-auto justify-between">
      <div className="flex items-center gap-4">
        <svg
          role="img"
          viewBox="0 0 24 24"
          width={25}
          height={25}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 00-.64.05l-2.39 1.05a.96.96 0 01-1.35-.85l-.07-2.14a.97.97 0 00-.32-.68A11.39 11.389 0 01.002 11.64zm8.32-2.19l-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 00-2.61.48z" />
        </svg>
        <h1 className="font-semibold">Messenger</h1>
      </div>

      <button
        className="border border-primary/10 flex items-center gap-2 px-2 py-1 rounded-md"
        onClick={() => onStatusChange(!status)} // Toggle boolean
      >
        {status ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Activate</>}
      </button>
    </div>
  );
}

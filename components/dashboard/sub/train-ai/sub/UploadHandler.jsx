import UploadFile from "./UploadFile";
import { useState } from "react";
import { BrainCog, SpellCheck } from "lucide-react";

export default function UploadHandler() {
  const [isActivated, setIsActivated] = useState(false);

  return (
    <div className="grid gap-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <button
            className={`border border-secondary/70 px-2 py-1 rounded-md text-secondary bg-primary hover:text-primary hover:bg-secondary ${
              !isActivated && "bg-secondary !text-primary"
            }`}
            onClick={() => setIsActivated(false)}
          >
            <li className="flex items-center gap-2">
              <BrainCog size={18} /> Fine Tune
            </li>
          </button>
          <button
            className={`border border-secondary/70 px-2 py-1 rounded-md text-secondary bg-primary hover:text-primary hover:bg-secondary ${
              isActivated && "bg-secondary !text-primary"
            }`}
            onClick={() => setIsActivated(true)}
          >
            <li className="flex items-center gap-2">
              <SpellCheck size={18} /> Validation
            </li>
          </button>
        </div>
      </div>
      <div className="bg-primary flex flex-col items-center gap-8 border border-secondary/70 rounded-md w-auto lg:w-[68vw] min-h-[20.125rem]">
        <UploadFile
          title={
            isActivated
              ? "Upload validations data to enhance the AI"
              : "Upload fine tuning data to train the AI"
          }
          isValidation={isActivated}
        />
      </div>
      <div className="flex justify-between text-secondary text-sm">
        <p>Supported Formats: JSONL</p>
        <p>Maximum Size: 50MB</p>
      </div>
    </div>
  );
}

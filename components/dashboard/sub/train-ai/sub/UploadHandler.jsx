import UploadContext from "./UploadContext";
import UploadFineTune from "./UploadFineTune";
import UploadInstructions from "./UploadInstructions";
import UploadValidation from "./UploadValidation";

export default function UploadHandler() {
  return (
    <div className="grid gap-8">
      <div className="flex flex-col md:flex-row gap-4 w-auto lg:w-[68vw]">
        <div className="w-full h-full">
          <div className="bg-primary w-full h-full flex flex-col items-center gap-8 border border-secondary/70 rounded-md ">
            <UploadContext />
          </div>
        </div>

        <div className="grid gap-4 w-full h-full">
          <div className="bg-primary w-full h-full flex gap-8 border border-secondary/70 rounded-md ">
            <UploadFineTune />
          </div>
          <div className="bg-primary w-full h-full flex flex-col items-center gap-8 border border-secondary/70 rounded-md ">
            <UploadValidation />
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4">
        <button
          type="button"
          className="bg-primary border border-secondary text-secondary rounded-md px-2 py-1 w-28"
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-secondary border border-secondary text-primary rounded-md px-2 py-1 w-28"
        >
          Start Train
        </button>
      </div>

      <div>
        <UploadInstructions />
      </div>
    </div>
  );
}

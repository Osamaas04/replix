import UploadFineTune from "./UploadFineTune";
import UploadValidation from "./UploadValidation";

export default function UploadHandler() {
  return (
    <div className="grid gap-4">
      <div className="flex gap-4 w-auto lg:w-[68vw]">
        <div className="w-full h-full">
          <div className="bg-primary w-full h-full flex flex-col items-center gap-8 border border-secondary/70 rounded-md ">
            {/* Content */}
          </div>
          
        </div>

        <div className="grid gap-4 w-full h-full">
          <div className="bg-primary w-full h-full flex flex-col items-center gap-8 border border-secondary/70 rounded-md ">
            <UploadFineTune />
          </div>
          <div className="bg-primary w-full h-full flex flex-col items-center gap-8 border border-secondary/70 rounded-md ">
            <UploadValidation />
          </div>
          
        </div>
      </div>
    </div>
  );
}

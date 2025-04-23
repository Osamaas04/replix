import { Upload, FileJson } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

export default function UploadValidation() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  async function handleFileChange(event) {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("dataset", file);
      formData.append("purpose", isValidation ? "validation" : "fine-tune");

      const response = await fetch(`${API_GATEWAY}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload the file - please try again");
      }

      toast.success("File has been uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload the file - please try again");
    }
  }

  return (
    <div className="w-full grid gap-4 py-4">
      <div>
        <h1 className="text-secondary font-semibold text-xl text-center">
          Validation
        </h1>
      </div>
      <div>
        <form>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div className="flex flex-col gap-4 justify-center items-center rounded-md my-auto">
            <button
              type="button"
              className="grid justify-self-center border border-secondary/70 border-dashed rounded-full p-8 w-fit h-fit"
              onClick={handleButtonClick}
            >
              <Upload color="white" />
            </button>

            <div className="grid justify-center">
              <h1 className="text-center text-sm text-secondary/70">
                Enhance the performance of you AI model
              </h1>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

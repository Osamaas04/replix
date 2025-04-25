import { Upload, FileJson } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const API_GATEWAY = "https://gw.replix.space/files";

export default function UploadFineTune() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleFileSubmit = async () => {
    try {
      if (!selectedFile) return;

      const formData = new FormData();
      formData.append("dataset", selectedFile);
      formData.append("purpose", "fine-tune");

      const response = await fetch(`${API_GATEWAY}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload the file - please try again");
      }

      toast.success("File has been uploaded successfully");
      setSelectedFile(null);
    } catch (error) {
      toast.error("Failed to upload the file - please try again");
    }
  };

  return (
    <div className="w-full grid gap-4 py-4">
      <div>
        <h1 className="text-secondary font-semibold text-xl text-center">
          Fine Tune
        </h1>
      </div>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {!selectedFile ? (
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
              Enhance the performance of your AI model
            </h1>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center py-4">
          <div className="flex items-center gap-3 text-secondary">
            <FileJson size={32} />
            <div>
              <p className="font-semibold">{selectedFile.name}</p>
              <p className="text-sm text-secondary/70">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-primary border border-secondary text-secondary rounded-md px-2 py-1"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleFileSubmit}
              className="bg-secondary border border-secondary text-primary rounded-md px-2 py-1"
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

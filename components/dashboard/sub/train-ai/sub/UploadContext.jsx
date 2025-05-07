"use client";

import { useRef, useState } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "../../home/ui/progress";

const API_GATEWAY = "https://gw.replix.space/files";

export default function UploadContext() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsUploaded(false);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setIsUploaded(false);
    setIsUploading(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleFileSubmit = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);
    setIsUploaded(false);

    const formData = new FormData();
    formData.append("context", selectedFile);

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      setIsUploading(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        toast.success("Context file uploaded successfully");
        setIsUploaded(true);
        setUploadProgress(100);
      } else {
        toast.error("Failed to upload the context file");
        setUploadProgress(0);
      }
    };

    xhr.onerror = () => {
      setIsUploading(false);
      toast.error("Failed to upload the context file");
      setUploadProgress(0);
    };

    xhr.open("POST", API_GATEWAY, true);
    xhr.withCredentials = true;
    xhr.send(formData);
  };

  return (
    <div className="bg-primary w-full h-full border border-secondary/70 rounded-md p-4 flex flex-col gap-4">
      <h1 className="text-secondary font-semibold text-xl text-center">
        Context
      </h1>

      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".txt,.json"
      />

      {!selectedFile ? (
        <div className="flex flex-col gap-4 justify-center items-center rounded-md my-auto">
          <button
            type="button"
            className="grid justify-self-center border border-secondary/70 border-dashed rounded-full p-8 w-fit h-fit"
            onClick={handleButtonClick}
          >
            <Upload color="white" size={28} />
          </button>
          <div className="grid justify-center">
            <h1 className="text-center text-sm text-secondary/70">
              Upload a file to set context for the AI
            </h1>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between text-center gap-6 p-4">
          <div className="flex items-center gap-3 text-secondary">
            <FileText size={32} />
            <div>
              <p className="font-semibold">{selectedFile.name}</p>
              <p className="text-sm text-secondary/70">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>

          {isUploading ? (
            <div className="w-32">
              <Progress value={uploadProgress} />
            </div>
          ) : isUploaded ? (
            <CheckCircle size={32} className="text-green-500" />
          ) : (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-primary border border-secondary text-secondary rounded-md px-2 py-1 w-20"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFileSubmit}
                className="bg-secondary border border-secondary text-primary rounded-md px-2 py-1 w-20"
              >
                Upload
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

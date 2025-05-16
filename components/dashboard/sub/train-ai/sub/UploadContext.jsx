"use client";

import { useRef, useState, useEffect } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "../../home/ui/progress";

const API_GATEWAY = "https://gw.replix.space/files";

export default function UploadContext({ contextFile }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(`${API_GATEWAY}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (response.status === 404) return;

        if (!response.ok) {
          toast.error("Failed to fetch uploaded files");
          return;
        }

        const data = await response.json();
        const contextFile = data.find((file) => file.purpose === "context");
        setSelectedFile(contextFile);
        setIsUploaded(true);
      } catch (error) {
        toast.error("Error fetching files");
      } finally {
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

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
    formData.append("dataset", selectedFile);
    formData.append("purpose", "context");

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

  if (loading) {
    return (
      <div className="bg-primary w-full h-full border border-secondary/70 rounded-md p-4 flex flex-col">
        <h1 className="text-secondary font-semibold text-xl text-center mb-4">
          Context
        </h1>
        <div className="bg-secondary/30 w-full h-full animate-pulse rounded-md" />
      </div>
    );
  }

  return (
    <div className="bg-primary w-full h-full border border-secondary/70 rounded-md p-4 flex flex-col">
      <h1 className="text-secondary font-semibold text-xl text-center mb-4">
        Context
      </h1>

      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".txt,.json"
      />

      <div className="flex-1 flex flex-col justify-center items-center">
        {!selectedFile ? (
          <div className="flex flex-col gap-4 justify-center items-center rounded-md">
            <button
              type="button"
              className="grid justify-self-center border border-secondary/70 border-dashed rounded-full p-6 md:p-8 w-fit h-fit"
              onClick={handleButtonClick}
            >
              <Upload
                color="white"
                className="w-[22px] h-[22px] md:w-7 md:h-7"
              />
            </button>
            <div className="grid justify-center">
              <h1 className="text-center text-sm text-secondary/70">
                Upload a file to set context for the AI
              </h1>
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-between text-center gap-6 p-4 w-full max-w-md">
            <div className="flex items-center gap-3 text-secondary">
              <FileText size={32} />
              <div>
                <p className="font-semibold">{selectedFile.name}</p>
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
    </div>
  );
}

"use client";

import { Upload, FileJson, CheckCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { Progress } from "../../home/ui/progress";

const API_GATEWAY = "https://gw.replix.space/files";

export default function UploadFineTune() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchContextFile = async () => {
        setLoading(true);
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
          const fineTuneFile = data.find((file) => file.purpose === "fine-tune");
          setSelectedFile(fineTuneFile);
          setIsUploaded(true);
        } catch (error) {
          toast.error("Error fetching files");
        } finally {
          setLoading(false);
        }
      };
  
      fetchContextFile(); 
    }, []);

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
    try {
      if (!selectedFile) return;

      setIsUploading(true);
      setUploadProgress(0);
      setIsUploaded(false);

      const formData = new FormData();
      formData.append("dataset", selectedFile);
      formData.append("purpose", "fine-tune");

      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100
          );
          setUploadProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        setIsUploading(false);
        if (xhr.status >= 200 && xhr.status < 300) {
          toast.success("File has been uploaded successfully");
          setIsUploaded(true);
          setUploadProgress(100);
        } else {
          toast.error("Failed to upload the file - please try again");
          setUploadProgress(0);
        }
      };

      xhr.onerror = () => {
        setIsUploading(false);
        toast.error("Failed to upload the file - please try again");
        setUploadProgress(0);
      };

      xhr.open("POST", API_GATEWAY, true);
      xhr.withCredentials = true;
      xhr.send(formData);
    } catch (error) {
      setIsUploading(false);
      toast.error("Failed to upload the file - please try again");
      setUploadProgress(0);
    }
  };

  if (loading) {
    return (
      <div className="w-full grid gap-4 p-4">
        <div>
          <h1 className="text-secondary font-semibold text-xl text-center">
            Fine Tune
          </h1>
        </div>
        <div className="bg-secondary/30 w-full h-[107.6px] rounded-md animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full grid gap-4 p-4">
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
        accept=".jsonl"
      />
      {!selectedFile ? (
        <div className="flex flex-col gap-4 justify-center items-center rounded-md my-auto">
          <button
            type="button"
            className="grid justify-self-center border border-secondary/70 border-dashed rounded-full p-6 w-fit h-fit"
            onClick={handleButtonClick}
          >
            <Upload color="white" size={22} />
          </button>
          <div className="grid justify-center">
            <h1 className="text-center text-sm text-secondary/70">
              Enhance the performance of your AI model
            </h1>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between text-center gap-6 p-8">
          <div className="flex items-center gap-3 text-secondary">
            <FileJson size={32} />
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

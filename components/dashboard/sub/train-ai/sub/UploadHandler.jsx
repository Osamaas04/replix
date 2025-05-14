"use client";

import { useEffect, useState } from "react";
import UploadContext from "./UploadContext";
import UploadFineTune from "./UploadFineTune";
import UploadInstructions from "./UploadInstructions";
import UploadValidation from "./UploadValidation";
import { toast } from "sonner";

const API_GATEWAY = "https://gw.replix.space";

export default function UploadHandler() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        const response = await fetch(`${API_GATEWAY}/files`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          toast.error("Failed to fetch uploaded files");
          return;
        }

        const data = await response.json();
        setUploadedFiles(data);
        console.log(data)
      } catch (error) {
        toast.error("Error fetching files");
      }
    };

    fetchUploadedFiles();
  }, []);

  async function handleTrain() {
    try {
      const response = await fetch(`${API_GATEWAY}/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        toast.error("Failed to train AI");
        return;
      }
      toast.success("ai has been trained")
    } catch (error) {
      toast.error("Error training AI");
    }
  }

  const contextFile = uploadedFiles.find((file) => file.purpose === "context");
  const fineTuneFile = uploadedFiles.filter(
    (file) => file.purpose === "fine-tune"
  );
  const validationFile = uploadedFiles.find(
    (file) => file.purpose === "validation"
  );

  return (
    <div className="grid gap-8">
      <div className="flex flex-col md:flex-row gap-4 w-auto lg:w-[68vw]">
        <div className="w-full h-full">
          <div className="bg-primary w-full h-full flex flex-col items-center gap-8 border border-secondary/70 rounded-md ">
            <UploadContext file={contextFile} />
          </div>
        </div>

        <div className="grid gap-4 w-full h-full">
          <div className="bg-primary w-full h-full flex gap-8 border border-secondary/70 rounded-md ">
            <UploadFineTune file={fineTuneFile} />
          </div>
          <div className="bg-primary w-full h-full flex flex-col items-center gap-8 border border-secondary/70 rounded-md ">
            <UploadValidation file={validationFile} />
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
          onClick={handleTrain}
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

"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

const API_GATEWAY = "https://gw.replix.space/train/instruction";

export default function UploadInstructions() {
  const [instructions, setInstructions] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!instructions.trim()) {
      toast.error("Instructions can't be empty");
      return;
    }

    const formData = new FormData();
    formData.append("instruction", instructions);

    try {
      const response = await fetch(API_GATEWAY, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to submit instructions");
      }

      toast.success("Instructions submitted successfully");
      setInstructions("");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };


  // return (
  //   <div className="w-full grid gap-8 py-4">
  //     <div className="border border-secondary/70 rounded-md p-4 grid gap-4">
  //       <div>
  //         <h1 className="text-secondary font-semibold text-xl text-center">
  //           Instructions
  //         </h1>
  //       </div>

  //       <div className="bg-secondary/15 w-full h-[208px] rounded-md animate-pulse"/>
  //     </div>
  //   </div>
  // );

  return (
    <div className="w-full grid gap-8 py-4">
      <div className="border border-secondary/70 rounded-md p-4 grid gap-4">
        <div>
          <h1 className="text-secondary font-semibold text-xl text-center">
            Instructions
          </h1>
        </div>
        <form className="flex flex-col gap-4">
          <textarea
            className="w-full h-52 p-4 rounded-md bg-background text-secondary resize-none focus:outline-none scrollbar"
            placeholder="Enter instructions here..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </form>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-secondary grid border border-secondary text-primary rounded-md px-2 py-1 w-28 justify-self-end"
      >
        Submit
      </button>
    </div>
  );
}

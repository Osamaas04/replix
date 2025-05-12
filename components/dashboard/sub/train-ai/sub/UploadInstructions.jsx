"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function UploadInstructions() {
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!instructions.trim()) {
      toast.error("Instructions cannot be empty");
      return;
    }

    // Handle instructions submission here (e.g., API call)
    toast.success("Instructions submitted successfully");
    setInstructions("");
  };

  return (
    <div className="w-full grid gap-8 py-4">
      <div className="border border-secondary/70 rounded-md p-4">
        <div>
          <h1 className="text-secondary font-semibold text-xl text-center">
            Instructions
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <textarea
            className="w-full h-52 p-4 rounded-md  bg-background text-secondary resize-none focus:outline-none"
            placeholder="Enter instructions here..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </form>
      </div>
      <button
        type="submit"
        className="bg-secondary grid border border-secondary text-primary rounded-md px-2 py-1 w-28 justify-self-end"
      >
        Submit
      </button>
    </div>
  );
}

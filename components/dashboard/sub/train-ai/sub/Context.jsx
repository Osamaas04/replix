"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function Context() {
  const [context, setContext] = useState("");

  const handleContextSubmit = () => {
    if (!context.trim()) {
      toast.error("Context cannot be empty");
      return;
    }
    toast.success("Context submitted successfully");
    console.log("Submitted context:", context);
  };

  return (
    <div className="bg-primary w-full h-full border border-secondary/70 rounded-md p-4 flex flex-col gap-4">
      <h1 className="text-secondary font-semibold text-xl text-center">
        Context
      </h1>
      <textarea
        className="w-full h-full p-4 rounded-md bg-background text-secondary resize-none focus:outline-none placeholder:text-secondary/70"
        placeholder="Enter context here to help guide the AI model..."
        value={context}
        onChange={(e) => setContext(e.target.value)}
      />
      
    </div>
  );
}

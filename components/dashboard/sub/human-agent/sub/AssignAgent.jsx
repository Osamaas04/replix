"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "../ui/alert-dialog";
import { toast } from "sonner";

const API_GATEWAY = "https://gw.replix.space";

export default function AssignAgent() {
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    if (!name.trim() || !companyName.trim()) {
      toast.error("Both name and company name are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_GATEWAY}/assignAgents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, companyName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to assign agent.");
      }

      toast.success("Agent assigned successfully!");
      setCompanyName("");
      setName("");
    } catch (error) {
      console.error("Error assigning agent:", error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-primary flex flex-col border border-secondary/70 rounded-md p-4 w-auto lg:w-[68vw] min-h-[19.72rem]">
      <div>
        <h1 className="text-secondary font-semibold text-center text-xl">
          Assign Agents
        </h1>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="grid border border-secondary/70 border-dashed rounded-full p-8 w-fit h-fit">
              <Plus color="white" />
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Assign Agent</AlertDialogTitle>
              <AlertDialogDescription>
                Enter the name of the team member to assign:
              </AlertDialogDescription>
            </AlertDialogHeader>

            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company name"
              className="w-full mt-2 p-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-white"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Team member full name"
              className="w-full mt-2 p-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-white"
            />

            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm} disabled={loading}>
                {loading ? "Assigning..." : "Assign"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="text-center">
          <h1 className="text-center text-sm text-secondary/70">
            Assign a team member as a human agent
          </h1>
        </div>
      </div>
    </div>
  );
}

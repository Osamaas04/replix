"use client";

import { useEffect, useState } from "react";
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
  const [agentInfo, setAgentInfo] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function retrieveAgents() {
      try {
        const response = await fetch(`${API_GATEWAY}/checkAgent`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch agents");
        }
        const data = await response.json();
        if (data?.agent) {
          setAgentInfo(data.agent);
        } else {
          setAgentInfo(null);
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
        setAgentInfo(null);
      } finally {
        setLoading(false);
      }
    }
    retrieveAgents();
  }, []);

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
      setAgentInfo(data.agent);
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
    <div className="bg-primary flex flex-col border border-secondary/70 rounded-md p-8 w-auto lg:w-[68vw] min-h-[19.72rem]">
      {/* Loading skeleton */}
      {loading && (
        <div className="w-full h-full bg-secondary/10 rounded-md animate-pulse" />
      )}

      {!loading && agentInfo && (
        <>
          {/* Option 2: User has agent(s) */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-secondary font-semibold text-left text-xl">
              Assigned Agents
            </h1>
          </div>
          <div className="border border-secondary/50 p-4 rounded-md text-white">
            <p><strong>Name:</strong> {agentInfo.name}</p>
            <p><strong>Email:</strong> {agentInfo.email}</p>
            <p><strong>Password:</strong> {agentInfo.password}</p>
            <p><strong>Status:</strong> Offline</p>
          </div>
        </>
      )}

      {!loading && !agentInfo && (
        <>
          {/* Option 3: No agent */}
          <div>
            <h1 className="text-secondary font-semibold text-center text-xl mb-4">
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
                    Assign
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
        </>
      )}
    </div>
  );
}

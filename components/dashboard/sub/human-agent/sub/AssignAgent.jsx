"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Eye, EyeOff, Dot, UserRound } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { toast } from "sonner";

const API_GATEWAY = "https://gw.replix.space";

export default function AssignAgent() {
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [agentInfo, setAgentInfo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
        if (data?.agents) {
          setAgentInfo(data.agents);
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
      setAgentInfo((prev) => (prev ? [...prev, data.agent] : [data.agent]));
      setCompanyName("");
      setName("");
    } catch (error) {
      console.error("Error assigning agent:", error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "idle":
        return "green";
      case "busy":
        return "orange";
      case "offline":
      default:
        return "gray";
    }
  }

  return (
    <div className="bg-primary flex flex-col border border-secondary/70 rounded-md p-8 w-auto lg:w-[68vw] h-[19.72rem] overflow-y-auto scrollbar">
      {/* Loading skeleton */}
      {loading && (
        <div className="w-full h-full bg-secondary/10 rounded-md animate-pulse" />
      )}

      {!loading && agentInfo?.length > 0 && (
        <>
          {/* Option 2: User has one or more agents */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-secondary font-semibold text-left text-xl">
              Assigned Agents
            </h1>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="bg-secondary text-primary rounded-md px-3 py-1 text-sm hover:bg-secondary/80">
                  Add new agent
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Assign Another Agent</AlertDialogTitle>
                  <AlertDialogDescription>
                    Enter the new team member’s info to assign:
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
                  <AlertDialogCancel disabled={loading}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleConfirm} disabled={loading}>
                    Assign
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="grid gap-4">
            {agentInfo.map((agent) => (
              <div
                key={agent._id}
                className="flex justify-between border-b border-secondary/70 p-4 text-secondary"
              >
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="flex items-center gap-2 underline"><UserRound size={22}/>{agent.name}</button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Agent Credentials</SheetTitle>
                      <SheetDescription>
                        Access the email and password assigned to your agent
                        account.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      {/* Email Field */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="email" className="text-right">
                          Email
                        </label>
                        <input
                          id="email"
                          value={agent.email}
                          readOnly
                          className="col-span-3 bg-primary/5 rounded-md p-2 focus:outline-none"
                        />
                      </div>

                      {/* Password Field */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="password" className="text-right">
                          Password
                        </label>
                        <div className="col-span-3 relative">
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={agent.password}
                            readOnly
                            className="w-full bg-primary/5 rounded-md p-2 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-800"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <p className="flex items-center gap-1">
                  <Dot color={getStatusColor(agent.status)} /> {agent.status}
                </p>
              </div>
            ))}
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
                  <AlertDialogCancel disabled={loading}>
                    Cancel
                  </AlertDialogCancel>
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

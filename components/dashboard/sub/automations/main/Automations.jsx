"use client";

import InstagramAutomate from "../sub/InstagramAutomate";
import MessengerAutomate from "../sub/MessengerAutomate";
import WhatsappAutomate from "../sub/WhatsappAutomate";
import XAutomate from "../sub/XAutomate";
import { Play, Pause } from "lucide-react";
import EmptyWorkflow from "../sub/EmptyWorkflow";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";

const API_GATEWAY = "https://gw.replix.space/social";

const PLATFORM_NAMES = {
  messenger: "Messenger",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  x: "X",
};

export default function Automations() {
  const [isActivated, setIsActivated] = useState(() => {
    const stored = localStorage.getItem("isActivated");
    return stored === null ? false : stored === "true";
  });

  const [automations, setAutomations] = useState({
    messenger: false,
    instagram: false,
    whatsapp: false,
    x: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("isActivated", isActivated);
  }, [isActivated]);

  useEffect(() => {
    async function fetchStatuses() {
      try {
        const response = await fetch(`${API_GATEWAY}/isActive`, {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch automation statuses");
        }

        const data = await response.json();
        setAutomations(data);
      } catch (error) {
        toast.error(
          error.message || "Something went wrong while loading statuses."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchStatuses();
  }, []);

  async function handleStatusChange(automationName, newStatus) {
    const previousState = automations[automationName];

    setAutomations((prev) => ({
      ...prev,
      [automationName]: newStatus,
    }));

    try {
      const platform = PLATFORM_NAMES[automationName];
      let body = { platform, isActive: newStatus };

      const response = await fetch(`${API_GATEWAY}/activeWorkflow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      const data = await response.json();
      if (data.isActive !== newStatus) {
        throw new Error("Server response mismatch");
      }

      toast.success(
        `${PLATFORM_NAMES[automationName]} ${
          newStatus ? "Activated" : "Deactivated"
        }`
      );
    } catch (error) {
      setAutomations((prev) => ({
        ...prev,
        [automationName]: previousState,
      }));
      if (error.message === "Page ID not found") {
        toast.error(`Kindly Integrate Messenger First`);
      } else if (error.message === "Instagram ID not found") {
        toast.error(`Kindly Integrate Instagram First`);
      } else if (error.message === "WhatsApp ID not found") {
        toast.error(`Kindly Integrate WhatsApp First`);
      } else {
        toast.error(`Failed to update status: ${error.message}`);
      }
    }
  }

  const filteredAutomations = useMemo(() => {
    return Object.entries(automations).filter(
      ([_, status]) => status === isActivated
    );
  }, [automations, isActivated]);

  return (
    <div className="h-screen">
      <div className="grid gap-4 px-4 py-12 lg:py-14 lg:pr-14 lg:pl-[19.5rem]">
        <div className="grid gap-2">
          <h1 className="text-secondary text-3xl font-semibold">
            Automated Workflows
          </h1>
          <h3 className="text-secondary/70">
            Activate or Pause Your Workflows Based on Your Needs.
          </h3>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-4">
            <button
              className={`border border-secondary/70 px-2 py-1 rounded-md text-secondary bg-primary hover:text-primary hover:bg-secondary ${
                !isActivated && "bg-secondary !text-primary"
              }`}
              onClick={() => setIsActivated(false)}
            >
              <li className="flex items-center gap-2">
                <Pause size={18} /> Paused
              </li>
            </button>
            <button
              className={`border border-secondary/70 px-2 py-1 rounded-md text-secondary bg-primary hover:text-primary hover:bg-secondary ${
                isActivated && "bg-secondary !text-primary"
              }`}
              onClick={() => setIsActivated(true)}
            >
              <li className="flex items-center gap-2">
                <Play size={18} /> Activated
              </li>
            </button>
          </div>
        </div>

        <div className="bg-primary flex flex-col items-center gap-4 border border-secondary/70 rounded-md w-auto lg:w-[68vw] min-h-[19.72rem]">
          {loading ? (
            <>
              <div className="text-secondary flex border-b border-secondary/70 px-4 [@media(min-width:390px)]:px-8 py-4 mx-auto justify-between w-[inherit] animate-pulse h-[66.4px]">
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 bg-secondary/15 rounded-full" />
                  <div className="w-24 h-4 bg-secondary/15 rounded-md" />
                </div>
                <div className="flex items-center gap-2 px-2 py-1 border border-secondary/70 rounded-md">
                  <div className="w-4 h-4 bg-secondary/15 rounded-sm" />
                  <div className="w-16 h-3 bg-secondary/15 rounded-md" />
                </div>
              </div>
              <div className="text-secondary flex border-b border-secondary/70 px-4 [@media(min-width:390px)]:px-8 py-4 mx-auto justify-between w-[inherit] animate-pulse h-[66.4px]">
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 bg-secondary/15 rounded-full" />
                  <div className="w-24 h-4 bg-secondary/15 rounded-md" />
                </div>
                <div className="flex items-center gap-2 px-2 py-1 border border-secondary/70 rounded-md">
                  <div className="w-4 h-4 bg-secondary/15 rounded-sm" />
                  <div className="w-16 h-3 bg-secondary/15 rounded-md" />
                </div>
              </div>
              <div className="text-secondary flex border-b border-secondary/70 px-4 [@media(min-width:390px)]:px-8 py-4 mx-auto justify-between w-[inherit] animate-pulse h-[66.4px]">
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 bg-secondary/15 rounded-full" />
                  <div className="w-24 h-4 bg-secondary/15 rounded-md" />
                </div>
                <div className="flex items-center gap-2 px-2 py-1 border border-secondary/70 rounded-md">
                  <div className="w-4 h-4 bg-secondary/15 rounded-sm" />
                  <div className="w-16 h-3 bg-secondary/15 rounded-md" />
                </div>
              </div>
              <div className="text-secondary flex border-b border-secondary/70 px-4 [@media(min-width:390px)]:px-8 py-4 mx-auto justify-between w-[inherit] animate-pulse h-[66.4px]">
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 bg-secondary/15 rounded-full" />
                  <div className="w-24 h-4 bg-secondary/15 rounded-md" />
                </div>
                <div className="flex items-center gap-2 px-2 py-1 border border-secondary/70 rounded-md">
                  <div className="w-4 h-4 bg-secondary/15 rounded-sm" />
                  <div className="w-16 h-3 bg-secondary/15 rounded-md" />
                </div>
              </div>
            </>
          ) : filteredAutomations.length === 0 ? (
            <EmptyWorkflow
              icon={isActivated ? Play : Pause}
              title={
                isActivated
                  ? "You have no activated workflows"
                  : "You have no paused workflows"
              }
            />
          ) : (
            <div className="grid gap-4 w-full">
              {filteredAutomations.map(([name]) => {
                const AutomationComponent = {
                  messenger: MessengerAutomate,
                  instagram: InstagramAutomate,
                  whatsapp: WhatsappAutomate,
                  x: XAutomate,
                }[name];

                return (
                  <AutomationComponent
                    key={name}
                    status={automations[name]}
                    onStatusChange={(newStatus) =>
                      handleStatusChange(name, newStatus)
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

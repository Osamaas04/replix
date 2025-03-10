"use client";

import InstagramAutomate from "../automations/InstagramAutomate";
import MessengerAutomate from "../automations/MessengerAutomate";
import WhatsappAutomate from "../automations/WhatsappAutomate";
import XAutomate from "../automations/XAutomate";
import { Play, Pause } from "lucide-react";
import EmptyWorkflow from "./EmptyWorkflow";
import { useState, useMemo } from "react";

// Define STORAGE_KEYS to avoid undefined errors
const STORAGE_KEYS = {
  PAGE_ID: "facebookPageId",
};

export default function Automations() {
  const [isActivated, setIsActivated] = useState(false);
  const [automations, setAutomations] = useState({
    messenger: false,
    instagram: false,
    whatsapp: false,
    x: false,
  });

  // Handle status change for automation
  async function handleStatusChange(automationName, newStatus) {
    setAutomations((prev) => ({
      ...prev,
      [automationName]: newStatus,
    }));

    const page_id = localStorage.getItem(STORAGE_KEYS.PAGE_ID);
    if (!page_id) {
      console.error("Page ID not found in localStorage");
      return;
    }

    try {
      const response = await fetch("/api/isActive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page_id, isActive: newStatus }),
      });

      if (!response.ok) {
        console.error("Failed to update automation status");
        return;
      }
    } catch (error) {
      console.error("Error updating automation:", error);
    }
  }

  // Memoized filtered list to avoid unnecessary re-renders
  const filteredAutomations = useMemo(() => {
    return Object.entries(automations).filter(([_, status]) => status === isActivated);
  }, [automations, isActivated]);

  return (
    <div>
      <div className="grid gap-4 p-16">
        <div className="grid gap-2">
          <h1 className="text-primary text-3xl font-semibold">
            Automated Workflows
          </h1>
          <h3 className="text-primary/70">Automate your workflows with AI.</h3>
        </div>

        <div className="flex justify-between w-[60rem]">
          <div className="flex gap-4">
            <button
              className={`border border-primary/10 px-2 py-1 rounded-md hover:bg-primary/80 hover:text-secondary ${
                !isActivated && "bg-primary/80 text-secondary"
              }`}
              onClick={() => setIsActivated(false)}
            >
              <li className="flex items-center gap-2">
                <Pause size={18} /> Paused
              </li>
            </button>
            <button
              className={`border border-primary/10 px-2 py-1 rounded-md hover:bg-primary/80 hover:text-secondary ${
                isActivated && "bg-primary/80 text-secondary"
              }`}
              onClick={() => setIsActivated(true)}
            >
              <li className="flex items-center gap-2">
                <Play size={18} /> Activated
              </li>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 border border-primary/10 rounded-md w-[60rem] min-h-[20rem]">
          {filteredAutomations.length === 0 ? (
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

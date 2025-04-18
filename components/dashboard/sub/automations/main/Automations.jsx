"use client";

import InstagramAutomate from "../sub/InstagramAutomate";
import MessengerAutomate from "../sub/MessengerAutomate";
import WhatsappAutomate from "../sub/WhatsappAutomate";
import XAutomate from "../sub/XAutomate";
import { Play, Pause } from "lucide-react";
import EmptyWorkflow from "../sub/EmptyWorkflow";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";

const STORAGE_KEYS = {
  PAGE_ID: "facebookPageId",
  AUTOMATION_STATUSES: "automationStatuses",
  INSTAGRAM_ID: "instagramBusinessId",
  WHATSAPP_ID: "whatsappBusinessId",
};

const API_GATEWAY = "https://gw.replix.space/social";

const PLATFORM_NAMES = {
  messenger: "Messenger",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  x: "X",
};

export default function Automations() {
  const [isActivated, setIsActivated] = useState(false);

  const [automations, setAutomations] = useState(() => {
    if (typeof window === "undefined")
      return {
        messenger: false,
        instagram: false,
        whatsapp: false,
        x: false,
      };

    const saved = localStorage.getItem(STORAGE_KEYS.AUTOMATION_STATUSES);
    return saved
      ? JSON.parse(saved)
      : {
          messenger: false,
          instagram: false,
          whatsapp: false,
          x: false,
        };
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.AUTOMATION_STATUSES,
      JSON.stringify(automations)
    );
  }, [automations]);

  async function handleStatusChange(automationName, newStatus) {
    const previousState = automations[automationName];

    setAutomations((prev) => ({
      ...prev,
      [automationName]: newStatus,
    }));

    try {
      const platform = PLATFORM_NAMES[automationName];
      let body = { platform, isActive: newStatus };

      switch (automationName) {
        case "messenger":
          const page_id = localStorage.getItem(STORAGE_KEYS.PAGE_ID);
          if (!page_id) throw new Error("Page ID not found");
          body.page_id = page_id;
          break;
        case "instagram":
          const instagram_id = localStorage.getItem(STORAGE_KEYS.INSTAGRAM_ID);
          if (!instagram_id) throw new Error("Instagram ID not found");
          body.instagram_id = instagram_id;
          break;
        case "whatsapp":
          const whatsapp_id = localStorage.getItem(STORAGE_KEYS.WHATSAPP_ID);
          if (!whatsapp_id) throw new Error("WhatsApp ID not found");
          body.whatsapp_id = whatsapp_id;
          break;
        default:
          throw new Error("Unsupported platform");
      }

      const response = await fetch(`${API_GATEWAY}/isActive`, {
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
          <h3 className="text-secondary/70">Activate or Pause Your Workflows Based on Your Needs.</h3>
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

        <div className="bg-primary flex flex-col items-center gap-8 border border-secondary/70 rounded-md w-auto lg:w-[68vw] min-h-[20.125rem]">
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

"use client";

import { useState, useEffect, useCallback } from "react";
import { Switch } from "../ui/switch";
import { toast } from "sonner";

const API_GATEWAY = "https://api-gateway-livid.vercel.app/api/social";
const STORAGE_KEYS = {
  WHATSAPP_ID: "whatsappBusinessId",
  LAST_VALIDATED: "waLastValidated",
  FACEBOOK_PAGE_ID: "facebookPageId"
};
const VALIDATION_INTERVAL = 3600000;

export default function WhatsappCard() {
  const [connection, setConnection] = useState(() => ({
    whatsappId:
      typeof window !== "undefined"
        ? localStorage.getItem(STORAGE_KEYS.WHATSAPP_ID)
        : null,
    isConnected:
      typeof window !== "undefined"
        ? Boolean(localStorage.getItem(STORAGE_KEYS.WHATSAPP_ID))
        : false
  }));

  const checkConnection = useCallback(async (whatsappId) => {
    try {
      const response = await fetch(`${API_GATEWAY}/checkWhatsappToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsapp_business_account_id: whatsappId })
      });

      const data = await response.json();

      if (!data.isConnected) {
        localStorage.removeItem(STORAGE_KEYS.WHATSAPP_ID);
        setConnection({ whatsappId: null, isConnected: false });
        toast.warning("WhatsApp connection expired - please reconnect");
      }

      localStorage.setItem(STORAGE_KEYS.LAST_VALIDATED, Date.now());
    } catch (error) {
      console.error("WhatsApp validation error:", error);
    }
  }, []);

  useEffect(() => {
    const validateConnection = async () => {
      const storedWhatsappId = localStorage.getItem(STORAGE_KEYS.WHATSAPP_ID);
      const lastValidated = localStorage.getItem(STORAGE_KEYS.LAST_VALIDATED);

      if (
        storedWhatsappId &&
        (!lastValidated || Date.now() - lastValidated > VALIDATION_INTERVAL)
      ) {
        await checkConnection(storedWhatsappId);
      }
    };

    validateConnection();
  }, [checkConnection]);

  const connectWhatsApp = useCallback(async () => {
    try {
      const facebookPageId = localStorage.getItem(STORAGE_KEYS.FACEBOOK_PAGE_ID);
      if (!facebookPageId) {
        throw new Error("Facebook Page ID not found");
      }

      const response = await fetch(`${API_GATEWAY}/connectWhatsapp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page_id: facebookPageId })
      });

      const data = await response.json();

      if (!response.ok || !data.whatsappId) {
        throw new Error("WhatsApp connection failed");
      }

      localStorage.setItem(STORAGE_KEYS.WHATSAPP_ID, data.whatsappId);
      setConnection({ whatsappId: data.whatsappId, isConnected: true });
      toast.success("Successfully connected WhatsApp");
    } catch (error) {
      setConnection((prev) => ({ ...prev, whatsappId: null }));
      if(error.message === "Facebook Page ID not found"){
        toast.error(`Kindly Integrate Messenger First`);
      } else {
        toast.error(`Failed to integrate WhatsApp: ${error.message}`);
      }
    }
  }, []);

  const handleDisconnect = useCallback(async () => {
    try {
      const whatsappId = localStorage.getItem(STORAGE_KEYS.WHATSAPP_ID);
      if (!whatsappId) throw new Error("WhatsApp ID not found");

      const response = await fetch(`${API_GATEWAY}/disconnectWhatsapp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsapp_business_account_id: whatsappId })
      });

      if (!response.ok) throw new Error("Disconnection failed");

      localStorage.removeItem(STORAGE_KEYS.WHATSAPP_ID);
      localStorage.removeItem(STORAGE_KEYS.LAST_VALIDATED);
      setConnection({ whatsappId: null, isConnected: false });
      toast.success("Successfully disconnected WhatsApp");
    } catch (error) {
      toast.error("Failed to disconnect WhatsApp");
      setConnection((prev) => ({ ...prev, isConnected: true }));
    }
  }, []);

  const handleToggle = useCallback(() => {
    if (connection.isConnected) {
      handleDisconnect();
    } else {
      connectWhatsApp();
    }
  }, [connection.isConnected, handleDisconnect, connectWhatsApp]);

  return (
    <div className="bg-primary text-secondary border border-secondary/70 rounded-md p-8 grid gap-8  lg:w-[19rem] xl:w-[25rem]">
      <div className="grid gap-2">
        <div className="flex items-center gap-4">
          <svg
            role="img"
            viewBox="0 0 24 24"
            width={35}
            height={35}
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <h1 className="font-semibold">WhatsApp</h1>
        </div>
        <h3 className="text-secondary/70">
          Connect your WhatsApp business account
        </h3>
      </div>

      <div className="flex justify-end items-center">
        <Switch checked={connection.isConnected} onCheckedChange={handleToggle} />
      </div>
    </div>
  );
}
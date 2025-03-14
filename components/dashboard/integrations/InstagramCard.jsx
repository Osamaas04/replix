"use client";

import { useState, useEffect, useCallback } from "react";
import { Switch } from "../ui/switch";
import { toast } from "sonner";

const API_GATEWAY = "https://api-gateway-livid.vercel.app/api/social";
const STORAGE_KEYS = {
  INSTAGRAM_ID: "instagramBusinessId",
  LAST_VALIDATED: "igLastValidated"
};
const VALIDATION_INTERVAL = 3600000;

export default function InstagramCard() {
  const [connection, setConnection] = useState(() => ({
    instagramId:
      typeof window !== "undefined"
        ? localStorage.getItem(STORAGE_KEYS.INSTAGRAM_ID)
        : null,
    isConnected:
      typeof window !== "undefined"
        ? Boolean(localStorage.getItem(STORAGE_KEYS.INSTAGRAM_ID))
        : false
  }));

  const checkConnection = useCallback(async (instagramId) => {
    try {
      const response = await fetch(`${API_GATEWAY}/checkInstagramToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instagram_id: instagramId })
      });

      const data = await response.json();

      if (!data.isConnected) {
        localStorage.removeItem(STORAGE_KEYS.INSTAGRAM_ID);
        setConnection({ instagramId: null, isConnected: false });
        toast.warning("Instagram connection expired - please reconnect");
      }

      localStorage.setItem(STORAGE_KEYS.LAST_VALIDATED, Date.now());
    } catch (error) {
      console.error("Validation error:", error);
    }
  }, []);

  useEffect(() => {
    const validateConnection = async () => {
      const storedInstagramId = localStorage.getItem(STORAGE_KEYS.INSTAGRAM_ID);
      const lastValidated = localStorage.getItem(STORAGE_KEYS.LAST_VALIDATED);

      if (
        storedInstagramId &&
        (!lastValidated || Date.now() - lastValidated > VALIDATION_INTERVAL)
      ) {
        await checkConnection(storedInstagramId);
      }
    };

    validateConnection();
  }, [checkConnection]);

  const handleDisconnect = useCallback(async () => {
    try {
      const instagramId = localStorage.getItem(STORAGE_KEYS.INSTAGRAM_ID);
      if (!instagramId) {
        throw new Error("Instagram ID not found");
      }

      const response = await fetch(`${API_GATEWAY}/disconnectInstagram`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instagram_id: instagramId })
      });

      if (!response.ok) {
        throw new Error("Disconnection failed - please try again");
      }

      localStorage.removeItem(STORAGE_KEYS.INSTAGRAM_ID);
      localStorage.removeItem(STORAGE_KEYS.LAST_VALIDATED);
      setConnection({ instagramId: null, isConnected: false });
      toast.success("Successfully disconnected Instagram");
    } catch (error) {
      toast.error("Disconnection failed - please try again");
      setConnection((prev) => ({ ...prev, isConnected: true }));
    }
  }, []);

  const handleToggle = useCallback(() => {
    if (connection.isConnected) {
      setConnection({ instagramId: null, isConnected: false });
      handleDisconnect();
    } else {
      toast.error("Reconnection feature is not implemented");
    }
  }, [connection.isConnected, handleDisconnect]);

  return (
    <div className="bg-white rounded-md p-8 grid gap-8 w-[25rem]">
      <div className="grid gap-2">
        <div className="flex items-center gap-4">
          <svg
            role="img"
            viewBox="0 0 24 24"
            width={35}
            height={35}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839" />
          </svg>
          <h1 className="font-semibold">Instagram</h1>
        </div>
        <h3 className="text-primary/60">Connect your Instagram professional account</h3>
      </div>
      <div className="flex justify-end items-center">
        <Switch checked={connection.isConnected} onCheckedChange={handleToggle} />
      </div>
    </div>
  );
}

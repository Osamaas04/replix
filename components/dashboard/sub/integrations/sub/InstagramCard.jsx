"use client";

import { useState, useEffect, useCallback } from "react";
import { Switch } from "../ui/switch";
import { toast } from "sonner";

const API_GATEWAY = "https://gw.replix.space/social";

export default function InstagramCard() {
  const [connection, setConnection] = useState({
    instagramId: null,
    isConnected: false,
  });

  const checkConnection = useCallback(async () => {
    try {
      const response = await fetch(`${API_GATEWAY}/checkToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ platform: "instagram" }),
      });

      const data = await response.json();

      if (data.isConnected) {
        setConnection({
          instagramId: data.page_id || "connected",
          isConnected: true,
        });
      } else {
        setConnection({ instagramId: null, isConnected: false });
      }
    } catch (error) {
      console.error("Instagram validation error:", error);
    }
  }, []);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  const connectInstagram = useCallback(async () => {
    try {
      const response = await fetch(`${API_GATEWAY}/connectInstagram`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || !data.instagramId) {
        throw new Error("Instagram connection failed - please try again");
      }

      setConnection({
        instagramId: data.instagramId,
        isConnected: true,
      });

      toast.success("Successfully connected Instagram");
    } catch (error) {
      setConnection({ instagramId: null, isConnected: false });

      if (error.message.includes("Facebook Page ID")) {
        toast.error("Kindly Integrate Messenger First");
      } else {
        toast.error(`Failed to integrate Instagram: ${error.message}`);
      }
    }
  }, []);

  const handleDisconnect = useCallback(async () => {
    try {
      const response = await fetch(`${API_GATEWAY}/disconnectSocials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ platform: "instagram", id: connection.instagramId }),
      });

      if (!response.ok) {
        throw new Error("Disconnection failed - please try again");
      }

      setConnection({ instagramId: null, isConnected: false });
      toast.success("Successfully disconnected Instagram");
    } catch (error) {
      toast.error("Disconnection failed - please try again");
      setConnection((prev) => ({ ...prev, isConnected: true }));
    }
  }, [connection.instagramId]);

  const handleToggle = useCallback(() => {
    if (connection.isConnected) {
      handleDisconnect();
    } else {
      connectInstagram();
    }
  }, [connection.isConnected, handleDisconnect, connectInstagram]);

  return (
    <div className="bg-primary text-secondary border border-secondary/70 rounded-md p-8 grid gap-8">
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
            <path d="..." /> {/* SVG Path remains the same */}
          </svg>
          <h1 className="font-semibold">Instagram</h1>
        </div>
        <h3 className="text-secondary/70">
          Connect your Instagram professional account
        </h3>
      </div>
      <div className="flex justify-end items-center">
        <Switch
          checked={connection.isConnected}
          onCheckedChange={handleToggle}
        />
      </div>
    </div>
  );
}

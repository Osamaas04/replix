"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Switch } from "../ui/switch";
import { toast } from "sonner";

export default function MessengerCard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  const [connection, setConnection] = useState({
    pageId: null,
    isConnected: false,
  });

  useEffect(() => {
    const storedPageId = localStorage.getItem("facebookPageId");
    if (storedPageId) checkConnection(storedPageId);

    if (code) connectFacebook(code);

    if (code) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("code");
      router.replace(`${window.location.pathname}?${params.toString()}`);
    }
  }, []);

  async function checkConnection(pageId) {
    try {
      const res = await fetch("/api/checkToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page_id: pageId }),
      });

      const data = await res.json();
      if (data.isConnected) {
        setConnection({ pageId, isConnected: true });
      } else {
        setConnection({ pageId: null, isConnected: false });
      }
    } catch {
      setConnection({ pageId: null, isConnected: false });
    }
  }

  async function connectFacebook(code) {
    try {
      const res = await fetch("/api/connectFacebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      if (!data.page_id) throw new Error("No page ID returned");

      localStorage.setItem("facebookPageId", data.page_id);
      setConnection({ pageId: data.page_id, isConnected: true });

      toast("Facebook page connected successfully!");
    } catch {
      handleDisconnect();
    }
  }

  function handleDisconnect() {
    localStorage.removeItem("facebookPageId");
    setConnection({ pageId: null, isConnected: false });
  }

  function handleToggle() {
    if (connection.isConnected) {
      handleDisconnect();
    } else {
      const clientId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
      const redirectUri =
        process.env.NEXT_PUBLIC_REDIRECT_URI
      const scopes =
        "pages_manage_metadata,pages_read_engagement,pages_show_list,pages_messaging,instagram_basic,instagram_manage_comments,instagram_manage_insights";

      router.push(
        `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}?menu=Integrations&scope=${scopes}`
      );
    }
  }

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
            <path d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 00-.64.05l-2.39 1.05a.96.96 0 01-1.35-.85l-.07-2.14a.97.97 0 00-.32-.68A11.39 11.389 0 01.002 11.64zm8.32-2.19l-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 00-2.61.48z" />
          </svg>
          <h1 className="font-semibold">Messenger</h1>
        </div>
        <h3 className="text-primary/60">Connect your Facebook page</h3>
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

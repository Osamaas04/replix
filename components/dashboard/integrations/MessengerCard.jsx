"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Switch } from "../ui/switch";
import { toast } from "sonner";

const API_GATEWAY = "https://api-gateway-livid.vercel.app/api/social";
const STORAGE_KEYS = {
  PAGE_ID: "facebookPageId",
  LAST_VALIDATED: "fbLastValidated",
};
const VALIDATION_INTERVAL = 3600000;

export default function MessengerCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [connection, setConnection] = useState(() => ({
    pageId:
      typeof window !== "undefined"
        ? localStorage.getItem(STORAGE_KEYS.PAGE_ID)
        : null,
    isConnected:
      typeof window !== "undefined"
        ? Boolean(localStorage.getItem(STORAGE_KEYS.PAGE_ID))
        : false,
  }));

  const authConfig = useMemo(
    () => ({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      scopes: [
        "ads_management",
        "ads_read",
        "attribution_read",
        "business_management",
        "catalog_management",
        "commerce_account_manage_orders",
        "commerce_account_read_orders",
        "commerce_account_read_reports",
        "commerce_account_read_settings",
        "email",
        "instagram_basic",
        "instagram_branded_content_ads_brand",
        "instagram_branded_content_brand",
        "instagram_branded_content_creator",
        "instagram_content_publish",
        "instagram_manage_comments",
        "instagram_manage_events",
        "instagram_manage_insights",
        "instagram_manage_messages",
        "instagram_manage_upcoming_events",
        "instagram_shopping_tag_products",
        "leads_retrieval",
        "manage_app_solution",
        "manage_fundraisers",
        "page_events",
        "pages_manage_ads",
        "pages_manage_cta",
        "pages_manage_engagement",
        "pages_manage_instant_articles",
        "pages_manage_metadata",
        "pages_manage_posts",
        "pages_messaging",
        "pages_messaging_phone_number",
        "pages_messaging_subscriptions",
        "pages_read_engagement",
        "pages_read_user_content",
        "pages_show_list",
        "private_computation_access",
        "publish_video",
        "read_insights",
        "read_page_mailboxes",
        "whatsapp_business_manage_events",
        "whatsapp_business_management",
        "whatsapp_business_messaging",
        "public_profile"
      ].join(","),
    }),
    []
  );

  const checkConnection = useCallback(async (pageId) => {
    try {
      const response = await fetch(`${API_GATEWAY}/checkToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page_id: pageId }),
      });

      const data = await response.json();

      if (!data.isConnected) {
        localStorage.removeItem(STORAGE_KEYS.PAGE_ID);
        setConnection({ pageId: null, isConnected: false });
        toast.warning("Connection expired - please reconnect");
      }

      localStorage.setItem(STORAGE_KEYS.LAST_VALIDATED, Date.now());
    } catch (error) {
      console.error("Validation error:", error);
    }
  }, []);

  useEffect(() => {
    const validateConnection = async () => {
      const storedPageId = localStorage.getItem(STORAGE_KEYS.PAGE_ID);
      const lastValidated = localStorage.getItem(STORAGE_KEYS.LAST_VALIDATED);

      if (
        storedPageId &&
        (!lastValidated || Date.now() - lastValidated > VALIDATION_INTERVAL)
      ) {
        await checkConnection(storedPageId);
      }
    };

    validateConnection();
  }, [checkConnection]);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (code) {
        try {
          const response = await fetch(`${API_GATEWAY}/connectFacebook`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          });

          const data = await response.json();

          if (data.page_id) {
            localStorage.setItem(STORAGE_KEYS.PAGE_ID, data.page_id);
            localStorage.setItem(STORAGE_KEYS.LAST_VALIDATED, Date.now());
            setConnection({ pageId: data.page_id, isConnected: true });
            toast.success("Facebook page connected successfully!");
          }

          // Remove the 'code' query parameter
          const params = new URLSearchParams(searchParams.toString());
          params.delete("code");
          router.replace(`${window.location.pathname}?${params.toString()}`);
        } catch (error) {
          toast.error("Failed to connect Facebook page");
          handleDisconnect();
        }
      }
    };

    handleOAuthCallback();
  }, [code, router, searchParams]);

  const handleDisconnect = useCallback(async () => {
    try {
      const pageId = localStorage.getItem(STORAGE_KEYS.PAGE_ID);
      if (!pageId) {
        throw new Error("Page ID not found");
      }

      const response = await fetch(`${API_GATEWAY}/disconnectFacebook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page_id: pageId }),
      });

      if (!response.ok) {
        throw new Error("Disconnection failed - please try again");
      }

      localStorage.removeItem(STORAGE_KEYS.PAGE_ID);
      localStorage.removeItem(STORAGE_KEYS.LAST_VALIDATED);
      setConnection({ pageId: null, isConnected: false });
      toast.success("Successfully disconnected Facebook page");
    } catch (error) {
      toast.error("Disconnection failed - please try again");
      setConnection((prev) => ({ ...prev, isConnected: true }));
    }
  }, []);

  const handleToggle = useCallback(() => {
    if (connection.isConnected) {
      setConnection({ pageId: null, isConnected: false });
      handleDisconnect();
    } else {
      router.push(
        `https://www.facebook.com/v22.0/dialog/oauth?` +
          `client_id=${authConfig.clientId}&` +
          `redirect_uri=${encodeURIComponent(
            authConfig.redirectUri
          )}/Integrations&` +
          `scope=${encodeURIComponent(authConfig.scopes)}`
      );
    }
  }, [connection.isConnected, handleDisconnect, authConfig, router]);

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

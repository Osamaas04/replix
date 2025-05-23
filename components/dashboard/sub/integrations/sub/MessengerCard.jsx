"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Switch } from "../ui/switch";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

const API_GATEWAY = "https://gw.replix.space/social";

export default function MessengerCard({loading, setMessengerLoading}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [connection, setConnection] = useState({
    pageId: null,
    isConnected: false,
  });

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
        "public_profile",
      ].join(","),
    }),
    []
  );

  const checkConnection = useCallback(async () => {
    try {
      setMessengerLoading(true);
      const response = await fetch(`${API_GATEWAY}/checkToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ platform: "facebook" }),
      });

      const data = await response.json();

      if (data.isConnected) {
        setConnection({
          pageId: data.page_id || "true",
          isConnected: true,
        });
      } else {
        setConnection({ pageId: null, isConnected: false });
      }
    } catch (error) {
      console.error("Validation error:", error);
    } finally {
      setMessengerLoading(false);
    }
  }, []);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (code) {
        try {
          const response = await fetch(`${API_GATEWAY}/connectFacebook`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ code }),
          });

          const data = await response.json();

          if (data.page_id) {
            setConnection({ pageId: data.page_id, isConnected: true });
            toast.success("Facebook page connected successfully!");
            checkConnection();
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
      const response = await fetch(`${API_GATEWAY}/disconnectSocials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ platform: "facebook" }),
      });

      if (!response.ok) {
        throw new Error("Disconnection failed - please try again");
      }

      setConnection({ pageId: null, isConnected: false });
      toast.success("Successfully disconnected Facebook page");
      checkConnection();
    } catch (error) {
      toast.error("Disconnection failed - please try again");
      setConnection((prev) => ({ ...prev, isConnected: true }));
    }
  }, [checkConnection]);

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
          )}?menu=Integrations&` +
          `scope=${encodeURIComponent(authConfig.scopes)}`
      );
    }
  }, [connection.isConnected, handleDisconnect, authConfig, router]);

  // if (loading) {
  //   return (
  //     <div className="p-8">
  //       <Skeleton className="h-[9.6rem] w-full rounded-md" />
  //     </div>
  //   );
  // }

  return (
    <div className="bg-primary text-secondary border border-secondary/70 rounded-md p-8 grid gap-8 ">
      <div className="grid gap-2">
        <div className="flex items-center gap-4">
          <svg
            role="img"
            viewBox="-2.5 -1.5 28 28"
            fill="none"
            strokeWidth="2.5"
            stroke="#fff"
            className="w-9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 00-.64.05l-2.39 1.05a.96.96 0 01-1.35-.85l-.07-2.14a.97.97 0 00-.32-.68A11.39 11.389 0 01.002 11.64Z"
              stroke="#fff"
            />
            <path
              d="M8.32 9.449l-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 00-2.61.48Z"
              fill="#fff"
              strokeWidth="0.1"
            />
          </svg>
          <h1 className="font-semibold">Messenger</h1>
        </div>
        <h3 className="text-secondary/70">Connect your Facebook page</h3>
      </div>

      <div className="flex justify-end items-center">
        {loading ? (
          <div className="inline-flex h-5 w-9 rounded-full bg-secondary/10 animate-pulse" />
        ) : (
          <Switch
            checked={connection.isConnected}
            onCheckedChange={handleToggle}
          />
        )}
      </div>
    </div>
  );
}

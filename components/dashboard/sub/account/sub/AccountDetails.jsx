import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useState, useEffect } from "react";

const API_GATEWAY = "https://gw.replix.space";

export default function AccountDetails() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handleUserInfo() {
      try {
        const response = await fetch(`${API_GATEWAY}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        // toast.error("Failed to load user info");
      } finally {
        setLoading(false);
      }
    }

    handleUserInfo();
  }, []);

  return (
    <div className="text-secondary">
      <div className="flex gap-24">
        <div className="flex flex-col gap-4 w-full">
          {loading ? (
            <div className="w-32 h-32 rounded-full bg-secondary/30 animate-pulse" />
          ) : (
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/9.x/glass/svg?seed=${
                  userData?.email || "default"
                }`}
                alt="User"
              />
              <AvatarFallback>
                {userData?.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          )}

          <div>
            {loading ? (
              <>
                <div className="bg-secondary/30 w-36 h-6 rounded animate-pulse mb-2" />
                <div className="bg-secondary/30 w-28 h-5 rounded animate-pulse" />
              </>
            ) : (
              <div className="w-full">
                <h1 className="font-semibold text-2xl">
                  {userData?.name || "Osama Alsmar"}
                </h1>
                <h3 className="text-sm italic">
                  Company Name: {userData?.company_name || "Replix"}
                </h3>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 w-full">
          <div>
            {loading ? (
              <div className="grid gap-4">
                <div className="grid gap-4">
                  <div className="bg-secondary/30 w-36 h-7 rounded animate-pulse" />
                </div>
                <hr />
                <div className="grid gap-4">
                  <div className="bg-secondary/30 w-48 h-4 rounded animate-pulse" />
                  <div className="bg-secondary/30 w-24 h-4 rounded animate-pulse" />
                </div>
                <hr />
                <div className="grid gap-4">
                  <div className="bg-secondary/30 w-24 h-4 rounded animate-pulse" />
                  <div className="bg-secondary/30 w-32 h-4 rounded animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <h3 className="font-semibold text-xl">Your Account</h3>
                </div>
                <hr />
                <div className="grid gap-2">
                  <h3>{userData?.email || "gradduo@gmail.com"}</h3>
                  <Link
                    href="#"
                    className="underline underline-offset-2 text-sm"
                  >
                    Change email
                  </Link>
                </div>
                <hr />
                <div className="grid gap-2">
                  <h3>Password</h3>
                  <Link
                    href="#"
                    className="underline underline-offset-2 text-sm"
                  >
                    Change password
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

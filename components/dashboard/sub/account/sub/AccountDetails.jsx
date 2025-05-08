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
        // setLoading(false);
      }
    }

    handleUserInfo();
  }, []);

  return (
    <div className="text-secondary w-[20rem]">
      <div className="grid gap-4">
        {/* Avatar and user info */}
        <div className="grid gap-4 items-center">
          {loading ? (
            <div className="w-24 h-24 rounded-full bg-secondary/30 animate-pulse" />
          ) : (
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/9.x/glass/svg?seed=${userData?.email || "default"}`}
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
                <div className="bg-secondary/30 w-36 h-5 rounded animate-pulse mb-2" />
                <div className="bg-secondary/30 w-28 h-4 rounded animate-pulse" />
              </>
            ) : (
              <>
                <h1 className="font-semibold text-xl">
                  {userData?.name || "Osama Alsmar"}
                </h1>
                <h3 className="text-xs italic">
                  Company Name: {userData?.company_name || "Replix"}
                </h3>
              </>
            )}
          </div>

          <hr />
        </div>

        {/* Email section */}
        <div className="grid gap-4">
          <div>
            {loading ? (
              <>
                <div className="bg-secondary/30 w-44 h-4 rounded animate-pulse mb-2" />
                <div className="bg-secondary/30 w-24 h-4 rounded animate-pulse" />
              </>
            ) : (
              <>
                <h3>{userData?.email || "gradduo@gmail.com"}</h3>
                <Link href="#" className="underline underline-offset-2 text-sm">
                  Change email
                </Link>
              </>
            )}
          </div>
          <hr />
        </div>

        {/* Password section */}
        <div className="grid gap-4">
          <div>
            <h3>Password</h3>
            <Link href="#" className="underline underline-offset-2 text-sm">
              Change password
            </Link>
          </div>
          <hr />
        </div>

        {/* Logout button */}
        <div>
          <button className="bg-red-700 border border-secondary text-secondary rounded-md px-2 py-1 w-20">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

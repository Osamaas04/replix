"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Unplug, Zap, House, Newspaper, BotMessageSquare } from "lucide-react";
import SocialCards from "@/components/dashboard/sub/SocialCard";
import Automations from "../sub/Automations";
import Logo from "@/public/assets/chatlogo-dark.webp";

export default function MainDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const menuItem = searchParams.get("menu") || "Home";

  const handleMenuChange = (menu) => {
    const newUrl = `${pathname}?menu=${menu}`;
    router.replace(newUrl);
  };

  return (
    <div className="bg-secondary h-screen">
      <div className="flex">
        <aside className="bg-primary/5 flex flex-col justify-between w-[16rem] h-screen border-r border-primary/10 px-4 py-4">
          <div className="grid items-baseline ">
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="flex space-x-3 items-center">
                <Image src={Logo} alt="Replix logo" width={22} height={22} />
                <p className="text-primary text-xl font-semibold">Replix</p>
              </Link>
            </div>
          </div>

          <div className="border-t border-primary/10 py-8 grid items-end font-raleway text-primary">
            <ol className="grid gap-2">
              {[
                { name: "Home", icon: <House size={18} /> },
                { name: "Automations", icon: <Zap size={18} /> },
                { name: "Integrations", icon: <Unplug size={18} /> },
                { name: "Train AI", icon: <BotMessageSquare size={18} /> },
                { name: "Docs", icon: <Newspaper size={18} /> },
              ].map(({ name, icon }) => (
                <button
                  key={name}
                  className={`hover:bg-primary/10 rounded-md px-3 py-1 ${
                    menuItem === name ? "bg-primary/10" : ""
                  }`}
                  onClick={() => handleMenuChange(name)}
                >
                  <li className="flex gap-4 items-center">{icon} <span>{name}</span></li>
                </button>
              ))}
            </ol>
          </div>
        </aside>

        {menuItem === "Integrations" && <SocialCards />}
        {menuItem === "Automations" && <Automations />}
      </div>
    </div>
  );
}

"use client";

import { Suspense, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Unplug,
  Zap,
  House,
  Newspaper,
  BotMessageSquare,
  UserRoundCog,
  Menu,
  Settings,
  ChartPie,
  X,
  Lock,
} from "lucide-react";
import SocialCards from "@/components/dashboard/sub/integrations/main/SocialCard";
import Automations from "../sub/automations/main/Automations";
import Logo from "@/public/assets/chatlogo.webp";
import Analytics from "../sub/analytics/main/Analytics";
import TrainAi from "../sub/train-ai/main/TrainAi";
import Home from "../sub/home/main/Home";
import Account from "../sub/account/main/Account";
import Agents from "../sub/human-agent/main/Agents";

function DashboardContent() {
  const [isDisplayed, setIsDisplayed] = useState(false);

  function handleClick() {
    setIsDisplayed((prev) => !prev);
  }

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const menuItem = searchParams.get("menu") || "Home";

  const handleMenuChange = (menu) => {
    const newUrl = `${pathname}?menu=${menu}`;
    router.replace(newUrl);
  };

  return (
    <div
      className={`bg-primary h-screen ${isDisplayed && "overflow-y-hidden"}`}
    >
      <div className="bg-primary grid lg:flex sm:justify-normal overflow-hidden">
        <button
          className={`block lg:hidden px-4 py-4 ${isDisplayed && "hidden"}`}
          onClick={handleClick}
        >
          <Menu color="white" />
        </button>

        <div>
          <aside
            className={`fixed bg-primary lg:flex lg:flex-col w-[16rem] h-screen border-r border-secondary/70 px-4 py-4 ${
              isDisplayed ? "inline-grid z-10" : "hidden"
            }`}
          >
            <div className="grid items-baseline">
              <div className="flex items-center justify-between px-3">
                <Link href="/dashboard" className="flex space-x-3 items-center">
                  <Image src={Logo} alt="Replix logo" width={22} height={22} />
                  <p className="text-secondary text-xl font-semibold">Replix</p>
                </Link>
                <div>
                  <button className="flex lg:hidden" onClick={handleClick}>
                    <X color="white" />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-primary/10 mt-auto [@media(max-height:500px)]:mt-16 [@media(max-height:500px)]:mb-0 grid items-end font-raleway text-secondary">
              <ol className="grid gap-2">
                {[
                  { name: "Home", icon: <House size={18} /> },
                  { name: "Analytics", icon: <ChartPie size={18} /> },
                  { hr: true },
                  { name: "Automations", icon: <Zap size={18} /> },
                  { name: "Integrations", icon: <Unplug size={18} /> },
                  { name: "Train AI", icon: <BotMessageSquare size={18} /> },
                  { hr: true },
                  {
                    name: "Docs",
                    icon: <Newspaper size={18} />,
                    link: "/docs",
                  },
                  {
                    name: "Human Agent",
                    icon: <UserRoundCog size={18} />,
                  },
                  { name: "Account", icon: <Settings size={18} /> },
                ].map((item, index) =>
                  item.hr ? (
                    <hr key={index} className="text-secondary/70" />
                  ) : item.link ? (
                    <Link
                      key={item.name}
                      href={item.link}
                      target="_blank"
                      className="hover:bg-secondary/10 rounded-md px-3 py-1"
                    >
                      <li className="flex gap-4 items-center">
                        {item.icon} <span>{item.name}</span>
                      </li>
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      className={`hover:bg-secondary/10 rounded-md px-3 py-1 ${
                        menuItem === item.name ? "bg-secondary/10" : ""
                      }`}
                      onClick={() => handleMenuChange(item.name)}
                    >
                      <li className="flex gap-4 items-center">
                        {item.icon} <span>{item.name}</span>
                      </li>
                    </button>
                  )
                )}
              </ol>
            </div>
          </aside>

          <div className={`${isDisplayed && "mt-[56px]"} `}>
            {menuItem === "Home" && <Home />}
            {menuItem === "Analytics" && <Analytics />}
            {menuItem === "Automations" && <Automations />}
            {menuItem === "Integrations" && <SocialCards />}
            {menuItem === "Train AI" && <TrainAi />}
            {menuItem === "Human Agent" && <Agents />}
            {menuItem === "Account" && <Account />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MainDashboard() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}

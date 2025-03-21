"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Unplug,
  Zap,
  House,
  Newspaper,
  BotMessageSquare,
  UserRound,
  Menu,
  Settings,
  ChartPie,
} from "lucide-react";
import SocialCards from "@/components/dashboard/sub/SocialCard";
import Automations from "../sub/Automations";
import Logo from "@/public/assets/chatlogo.webp";

function DashboardContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const menuItem = searchParams.get("menu") || "Home";

  const handleMenuChange = (menu) => {
    const newUrl = `${pathname}?menu=${menu}`;
    router.replace(newUrl);
  };

  return (
    <div className="bg-primary">
      <div className="grid lg:flex sm:justify-normal">
        <button className="block lg:hidden px-4 py-4">
          <Menu color="white"/>
        </button>

        <aside className="hidden bg-primary lg:flex lg:flex-col w-[16rem] h-screen border-r border-secondary/70 px-4 py-4">
          <div className="grid items-baseline">
            <div className="flex items-center justify-between px-3">
              <Link href="/dashboard" className="flex space-x-3 items-center">
                <Image src={Logo} alt="Replix logo" width={22} height={22} />
                <p className="text-secondary text-xl font-semibold">Replix</p>
              </Link>
              {/* <div>
              <button className="flex">
                <ChevronsUpDown size={18}/>
              </button>
            </div> */}
            </div>
          </div>

          <div className="border-t border-primary/10 my-auto grid items-end font-raleway text-secondary">
            <ol className="grid gap-2">
            {[
  { name: "Home", icon: <House size={18} /> },
  { name: "Analytics", icon: <ChartPie size={18} /> },
  { hr: true },
  { name: "Automations", icon: <Zap size={18} /> },
  { name: "Integrations", icon: <Unplug size={18} /> },
  { name: "Train AI", icon: <BotMessageSquare size={18} /> },
  { hr: true },
  // Docs item changed to a Link
  { name: "Docs", icon: <Newspaper size={18} />, link: "/docs" },
  { name: "Human Agent", icon: <UserRound size={18} /> },
  { name: "Account", icon: <Settings size={18} /> },
].map((item, index) =>
  item.hr ? (
    <hr key={index} className="text-secondary/70" />
  ) : item.link ? (
    // If there's a link property, use the Link component instead of a button
    <Link
      key={item.name}
      href={item.link}
      className={`hover:bg-secondary/10 rounded-md px-3 py-1`}
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

        {menuItem === "Integrations" && <SocialCards />}
        {menuItem === "Automations" && <Automations />}
      </div>
    </div>
  );
}

export default function MainDashboard() {
  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

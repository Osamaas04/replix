"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/chatlogo.webp";
import { Search } from "lucide-react";
import AssignedMessages from "@/components/human-agent/AssignedMessages";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Dot } from "lucide-react";
import { toast } from "sonner";

const API_GATEWAY = "https://gw.replix.space";

export default function AsideChats() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const dummyChats = [
    {
      caseNumber: "#123456",
      platform: "Instagram",
      name: "Osama Alasmar",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Loerm is one of the most used",
    },
    {
      caseNumber: "#123457",
      platform: "Facebook",
      name: "Jane Doe",
      text: "Another example of an escalated conversation.",
    },
    {
      caseNumber: "#123458",
      platform: "Twitter",
      name: "John Smith",
      text: "This message needs immediate attention.",
    },
    {
      caseNumber: "#123459",
      platform: "WhatsApp",
      name: "Alex Johnson",
      text: "Please review this chat. Kindly review it and respond ASAP. I am asking for a callback ASAP",
    },
  ];

  const filteredChats = dummyChats.filter((chat) => {
    const query = searchQuery.toLowerCase();
    return (
      chat.caseNumber.toLowerCase().includes(query) ||
      chat.name.toLowerCase().includes(query)
    );
  });

  async function changeStatus(newStatus) {
    try {
      const response = await fetch(`${API_GATEWAY}/getOnline`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error("Could not update status");
    }
  }

  return (
    <div className="bg-primary h-screen">
      <aside className="fixed bg-primary flex flex-col gap-4 w-[23rem] h-screen border-r border-secondary/70 px-4 py-4 z-10 overflow-y-auto scrollbar">
        <div className="grid gap-8 items-baseline">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex space-x-3 items-center">
              <Image src={Logo} alt="Replix logo" width={22} height={22} />
              <p className="text-secondary text-xl font-semibold">Replix</p>
            </Link>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-secondary font-semibold">Assigned to Me</h3>
              <Select onValueChange={(value) => changeStatus(value)}>
                <SelectTrigger className="w-[100px] text-secondary border border-secondary px-3 py-1 rounded-md">
                  <SelectValue placeholder="Offline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idle">
                    <div className="flex items-center gap-1">
                      <Dot className="text-green-500 h-5 w-5" />
                      <span>Idle</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="offline">
                    <div className="flex items-center gap-1">
                      <Dot className="text-zinc-400 h-5 w-5" />
                      <span>Offline</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <hr className="text-secondary/70" />
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 text-sm text-secondary bg-background border border-secondary/40 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60" />
            </div>
          </div>
        </div>

        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <AssignedMessages
              key={chat.caseNumber}
              {...chat}
              isSelected={selectedCase === chat.caseNumber}
              onClick={() => setSelectedCase(chat.caseNumber)}
            />
          ))
        ) : (
          <p className="text-secondary/60 mt-4 text-center">No chats found</p>
        )}
      </aside>
    </div>
  );
}

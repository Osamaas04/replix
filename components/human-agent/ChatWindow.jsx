"use client";

import { useState, useEffect } from "react";
import { MessageSquareText } from "lucide-react";

export default function ChatWindow({ selectedCase, messages }) {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState(null);

  useEffect(() => {
    if (selectedCase) {
      const selectedChat = messages.find((msg) => msg.caseNumber === selectedCase);
      setChat(selectedChat);
    }
  }, [selectedCase, messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // TODO: replace with actual API call to send message
    console.log(`Sending message to ${chat?.senderId}:`, input);

    // Clear input after sending
    setInput("");
  };

  if (!chat) {
    return (
      <div className="h-screen flex-1 flex flex-col items-center justify-center text-secondary/70 gap-4">
        <MessageSquareText size={60}/>
        <p className="text-xl">Select a chat to view and reply</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-screen p-6">
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="bg-muted text-secondary rounded-lg p-4">
          <p className="text-sm font-semibold">From: {chat.name}</p>
          <p className="mt-2">{chat.text}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-secondary/40 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-secondary bg-background"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-accent text-background rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ChatInput({ onSubmit, currentChatId }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() && currentChatId) {
      onSubmit(message);
      setMessage("");
    }
  };

  const isDisabled = !currentChatId;

  return (
    <form className="p-3 border-t" onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <Input
          placeholder={isDisabled ? "Select a chat to start messaging..." : "Type your message here..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isDisabled}
        />
        <Button type="submit" disabled={isDisabled}>Send</Button>
      </div>
    </form>
  );
}

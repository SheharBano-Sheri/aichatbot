"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ChatInput({ onSubmit }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim()) {
      onSubmit(message);
      setMessage("");
    }
  };

  return (
    <form className="p-3 border-t" onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <Input
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </div>
    </form>
  );
}

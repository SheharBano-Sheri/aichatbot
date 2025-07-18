"use client";

import { Button } from "@/components/ui/button";
import { BrushCleaning, Sun, Moon } from "lucide-react";
import { ChatMessage } from "@/components/chat-message";
import ChatInput from "@/components/chat-input";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function ChatContainer() {
  const [messages, setMessages] = useState([]);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchConversation = async () => {
      const response = await fetch("/api/conversation");
      const data = await response.json();
      setMessages(data);
    };
    
    fetchConversation();
  }, []);

  const onSubmit = async (message) => {
    const userMessage = { content: message, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, messages }),
    });

    const data = await response.json();
    const aiMessage = { content: data, isUser: false };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);

    await fetch("/api/conversation", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userMessage: message, aiMessage: data }),
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="absolute top-4 right-4">
        <Button 
          variant="outline" 
          onClick={toggleTheme} 
          size="icon"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 pt-12">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Start a conversation
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage 
              key={index}
              content={message.content}
              isUser={message.isUser} 
            />
          ))
        )}
      </div>
      <ChatInput onSubmit={onSubmit} />
    </div>
  );
}

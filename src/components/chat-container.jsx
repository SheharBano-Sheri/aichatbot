"use client";

import { Button } from "@/components/ui/button";
import { BrushCleaning } from "lucide-react";
import { ChatMessage } from "@/components/chat-message";
import ChatInput from "@/components/chat-input";
import { useState, useEffect } from "react";


export function ChatContainer() {

  const [messages, setMessages] = useState([]);

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
      body: JSON.stringify({ 
        userMessage: message, 
        aiMessage: data 
      }),
    });
  };

  return (
    <div className="p-0 h-full flex flex-col gap-0">
      <div className="flex justify-between items-center p-3 border-b">
        <div className="flex items-center gap-3">        
          <p className="text-xl font-semibold">Chat</p>
        </div>
        <Button 
          variant="outline" 
          onClick={async () => {
            setMessages([]);
            await fetch("/api/conversation", { method: "DELETE" });
        }}>
          <BrushCleaning />
        </Button>
      </div>      
      
      <div className="overflow-auto p-3 flex-1">
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
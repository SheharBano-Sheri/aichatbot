"use client";

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
    <div className="flex flex-col h-full w-full">      
      <div className="flex-1 overflow-y-auto p-3">
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
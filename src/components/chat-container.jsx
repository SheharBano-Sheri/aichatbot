"use client";

import { ChatMessage } from "@/components/chat-message";
import ChatInput from "@/components/chat-input";
import { useState, useEffect } from "react";
import { useChat } from "@/components/chat-provider";

export function ChatContainer({ currentChatId, messages: initialMessages, onMessagesUpdate }) {
  const [messages, setMessages] = useState(initialMessages || []);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { generateChatTitle, updateChatTitle } = useChat();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, []);

  useEffect(() => {
    if (JSON.stringify(initialMessages || []) !== JSON.stringify(messages)) {
      setMessages(initialMessages || []);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (currentChatId && userEmail && (!initialMessages || initialMessages.length === 0)) {
      fetchConversation();
    }
  }, [currentChatId, userEmail]);
  const fetchConversation = async () => {
    if (!currentChatId || !userEmail) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/conversation?userEmail=${encodeURIComponent(userEmail)}&chatId=${currentChatId}`);
      const data = await response.json();
      setMessages(data);
      onMessagesUpdate(data);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (message) => {
    if (!currentChatId || !userEmail) return;
    
    const isFirstMessage = messages.length === 0;
    
    const userMessage = { content: message, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const response = await fetch("/api/response", {
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userMessage: message, 
        aiMessage: data,
        userEmail,
        chatId: currentChatId
      }),
    });

    // Update chat title based on first message
    if (isFirstMessage) {
      const newTitle = generateChatTitle(message);
      await updateChatTitle(currentChatId, newTitle);
    }
  };  return (
    <div className="flex flex-col h-full w-full max-w-full">      
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 w-full">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Loading conversation...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Start a conversation
          </div>
        ) : (
          <div className="w-full max-w-full">
            {messages.map((message, index) => (
              <ChatMessage 
                key={`${currentChatId}-${index}`}
                content={message.content}
                isUser={message.isUser} 
              />
            ))}
          </div>
        )}
      </div>
      <ChatInput onSubmit={onSubmit} currentChatId={currentChatId} />
    </div>
  );
}
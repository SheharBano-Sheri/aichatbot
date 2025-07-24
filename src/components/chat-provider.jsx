"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [refreshChats, setRefreshChats] = useState(0);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, []);
  const handleChatSelect = (chatId, chatMessages) => {
    setCurrentChatId(chatId);
    const processedMessages = (chatMessages || []).map(msg => ({
      ...msg,
      isUser: msg.isUser !== undefined ? msg.isUser : msg.role === 'user'
    }));
    setMessages(processedMessages);
  };

  const handleNewChat = (newChat) => {
    setCurrentChatId(newChat._id);
    setMessages([]);
  };
  const generateChatTitle = (message) => {
    const words = message.trim().split(" ").slice(0, 3);
    return words.join(" ") + (message.trim().split(" ").length > 3 ? "..." : "");
  };

  const updateChatTitle = async (chatId, title) => {
    if (!userEmail) return;

    await fetch("/api/chat", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: chatId,
        title,
        userEmail,
      }),
    });

    setRefreshChats((prev) => prev + 1);
  };

  const value = {
    currentChatId,
    messages,
    userEmail,
    refreshChats,
    setMessages,
    handleChatSelect,
    handleNewChat,
    generateChatTitle,
    updateChatTitle,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

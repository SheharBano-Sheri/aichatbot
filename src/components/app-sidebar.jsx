"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuAction, SidebarTrigger } from "@/components/ui/sidebar";
import { Plus, Trash2 } from "lucide-react";
import { useChat } from "@/components/chat-provider";

export function AppSidebar({ onChatSelect, onNewChat, currentChatId }) {
  const [chats, setChats] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const { refreshChats } = useChat();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
    if (email) {
      fetchChats(email);
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetchChats(userEmail);
    }
  }, [refreshChats, userEmail]);

  const fetchChats = async (email) => {
    const response = await fetch(`/api/chat?userEmail=${encodeURIComponent(email)}`);
    const data = await response.json();
    setChats(data);
  };
  
  const handleNewChat = async () => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },      body: JSON.stringify({
        title: "Untitled Chat",
        userEmail
      }),
    });
    
    const newChat = await response.json();
    setChats(prev => [newChat, ...prev]);
    onNewChat(newChat);
  };  const handleChatSelect = async (chatId) => {
    try {
      const response = await fetch("/api/chat", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: chatId,
          userEmail
        }),
      });
      
      const result = await response.json();
      
      // Pass the messages immediately to avoid double loading
      onChatSelect(chatId, result.messages || []);
    } catch (error) {
      console.error('Error selecting chat:', error);
      // Fallback to empty messages if there's an error
      onChatSelect(chatId, []);
    }
  };

  const handleDeleteChat = async (chatId, e) => {
    e.stopPropagation();
    
    await fetch("/api/chat", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: chatId,
        userEmail
      }),
    });
    
    setChats(prev => prev.filter(chat => chat._id !== chatId));
    
    const remainingChats = chats.filter(chat => chat._id !== chatId);
    if (remainingChats.length > 0) {
      handleChatSelect(remainingChats[0]._id);
    } else {
      onChatSelect(null, []);
    }
  };

  return (
    <Sidebar>
      {" "}
      <SidebarHeader>
        <div className="flex items-center justify-center p-2">
          <h1 className="text-xl font-bold">ShatBot</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Button onClick={handleNewChat} className="w-full justify-start gap-2 mb-2">
            <Plus className="h-4 w-4" />
            Start New Chat
          </Button>
          <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            {" "}            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat._id}>
                  <SidebarMenuButton onClick={() => handleChatSelect(chat._id)} isActive={chat._id === currentChatId}>
                    <span className="truncate">{chat.title}</span>
                  </SidebarMenuButton>
                  <SidebarMenuAction
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat._id, e);
                    }}
                    showOnHover
                  >
                    <Trash2 className="h-3 w-3" />
                  </SidebarMenuAction>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

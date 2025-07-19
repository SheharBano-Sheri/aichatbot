"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuAction } from "@/components/ui/sidebar";
import { Plus, Trash2 } from "lucide-react";

export function AppSidebar() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    const res = await fetch("/api/conversation");
    const data = await res.json();
    setChats(data);
  };

  const handleNewChat = async () => {
    const res = await fetch("/api/conversation", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: "New Chat", aiMessage: "Hello!" }),
    });
    if (res.ok) fetchChats();
  };

  const handleDeleteChat = async (index, e) => {
    e.stopPropagation();
    await fetch("/api/conversation", { method: "DELETE" });
    fetchChats();
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center p-2">
          <h1 className="text-xl font-bold">ChatBot</h1>
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
            <SidebarMenu>
              {chats.length > 0 ? (
                chats.map((chat, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton>
                      <span className="truncate">{chat.content.slice(0, 20)}</span>
                    </SidebarMenuButton>
                    <SidebarMenuAction onClick={(e) => handleDeleteChat(index, e)} showOnHover>
                      <Trash2 className="h-3 w-3" />
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                ))
              ) : (
                <div className="p-2 text-gray-500">No recent chats</div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

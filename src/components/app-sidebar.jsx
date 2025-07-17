import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuAction, SidebarTrigger } from "@/components/ui/sidebar";
import { Plus, Trash2 } from "lucide-react";

export function AppSidebar() {
  const chats = [
    { id: 1, title: "What is AI?", isActive: true },
    { id: 2, title: "How to use Next.js?", isActive: false },
    { id: 3, title: "MongoDB Connection", isActive: false },
    { id: 4, title: "JavaScript Promises", isActive: false },
    { id: 5, title: "CSS Grid Layout", isActive: false },
  ];

  const handleNewChat = () => {};

  const handleChatSelect = (chatId) => {};

  const handleDeleteChat = (chatId, e) => {};

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
            {" "}
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton onClick={() => handleChatSelect(chat.id)} isActive={chat.isActive}>
                    <span className="truncate">{chat.title}</span>
                  </SidebarMenuButton>
                  <SidebarMenuAction
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id, e);
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

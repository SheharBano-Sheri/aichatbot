"use client";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useChat } from "@/components/chat-provider";

export default function SidebarWrapper({ children }) {
  const pathname = usePathname();
  const hideSidebar = pathname === "/login" || pathname === "/signup";
  const { currentChatId, handleChatSelect, handleNewChat } = useChat();

  if (hideSidebar) {
    return children;
  }
  return (
    <SidebarProvider>
      <AppSidebar 
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
        currentChatId={currentChatId}
      />
      <SidebarInset className="flex flex-col h-screen">
        <SidebarTrigger className="fixed top-4 left-4 z-50" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

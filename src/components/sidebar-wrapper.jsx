"use client";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function SidebarWrapper({ children }) {
  const pathname = usePathname();
  const hideSidebar = pathname === "/login" || pathname === "/signup";

  if (hideSidebar) {
    return children;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen">
        <SidebarTrigger className="fixed top-4 left-4 z-50" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarGroup } from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar className="h-screen flex flex-col justify-between border-r">
      <SidebarHeader className="flex flex-col items-center gap-3 p-4">
        <Button variant="outline" className="w-full">Profile Name</Button>
      </SidebarHeader>
      
      <SidebarContent className="flex-1 px-4 space-y-3 overflow-auto">
        <Button variant="default" className="w-full">+ New Chat</Button>

        <SidebarGroup className="space-y-2 mt-4">
          <Button variant="outline" className="w-full">Chat 1</Button>
          <Button variant="outline" className="w-full">Chat 2</Button>
          <Button variant="outline" className="w-full">Chat 3</Button>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

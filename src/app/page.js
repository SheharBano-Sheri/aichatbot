import { ChatContainer } from "@/components/chat-container";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/app-sidebar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 h-screen overflow-hidden">
      <AppSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex justify-end gap-2 mb-4 w-full p-4">
          <Link href="/signup">
            <Button variant="outline">Signup</Button>
          </Link>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>

        <main className="flex-1 flex justify-center items-center overflow-y-auto">
          <div className="w-full max-w-3xl p-4">
            <ChatContainer />
          </div>
        </main>
      </div>
    </div>
  );
}

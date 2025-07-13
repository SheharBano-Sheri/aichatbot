import { ChatContainer } from "@/components/chat-container";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden flex flex-col p-4">
      
      <div className="flex justify-end gap-2 mb-4">
        <Button variant="outline">Signup</Button>
        <Button>Login</Button>
      </div>
      
      <main className="h-full w-full max-w-2xl mx-auto">
        <ChatContainer />
      </main>
    </div>
  );
}

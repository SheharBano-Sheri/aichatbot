import { ChatContainer } from "@/components/chat-container";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col items-center">
      
      <div className="flex justify-end gap-2 mb-4 w-full p-4">
        <Button variant="outline">Signup</Button>
        <Button>Login</Button>
      </div>
      
      <main className="h-full w-full">
        <ChatContainer />
      </main>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BrushCleaning } from "lucide-react";
import ChatMessage from "@/components/chat-message";
import ChatInput from "@/components/chat-input";
export function ChatContainer() {
  return (
    <Card className="p-0 h-full flex flex-col gap-0">
      <div className="flex justify-between items-center p-3 border-b">
        <div className="flex items-center gap-3">
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=SB"
            alt="myavatarr"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-xl font-semibold">Chat</p>
        </div>
        <Button variant="outline">
          <BrushCleaning />
        </Button>
      </div>

      <ChatMessage />
      <ChatInput />
    </Card>
  );
}

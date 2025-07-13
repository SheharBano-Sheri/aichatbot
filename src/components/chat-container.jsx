import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BrushCleaning } from "lucide-react";

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

      <div className="overflow-auto p-3 flex-1 flex flex-col gap-4">
        <div className="flex justify-end mb-4">
          <Card className="p-3 max-w-[80%] bg-muted">
            <div className="text-sm whitespace-pre-wrap">Hi, my name is abd</div>
          </Card>
        </div>
        <div className="flex justify-start mb-4">
          <Card className="p-3 max-w-[80%] bg-primary text-primary-foreground">
            <div className="text-sm whitespace-pre-wrap">Hello abd, how are you</div>
          </Card>
        </div>
      </div>

      <form className="p-3 border-t">
        <div className="flex gap-2">
          <Input placeholder="Type your message here..." />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </Card>
  );
}

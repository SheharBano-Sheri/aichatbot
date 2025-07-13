import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function ChatInput() {
  return (
    <form className="p-3 border-t">
      <div className="flex gap-2">
        <Input placeholder="Type your message here..." />
        <Button type="submit">Send</Button>
      </div>
    </form>
  );
}

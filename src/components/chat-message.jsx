import { Card } from "@/components/ui/card";

export default function ChatMessage() {
  return (
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
  );
}

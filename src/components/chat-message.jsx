import { Card } from "@/components/ui/card";

export function ChatMessage({ content, isUser }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <Card className={`p-3 max-w-[80%] ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
        <div className="text-sm whitespace-pre-wrap">{content}</div>
      </Card>
    </div>
  );
}

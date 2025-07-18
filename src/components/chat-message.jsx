import { Card } from "@/components/ui/card";
import MarkdownRenderer from "@/components/markdown-renderer";

export function ChatMessage({ content, isUser }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <Card className={`p-3 max-w-[80%] ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
        <div className="text-sm">{isUser ? content : <MarkdownRenderer content={content} />}</div>
      </Card>
    </div>
  );
}

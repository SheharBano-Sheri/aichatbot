import { Card } from "@/components/ui/card";
import MarkdownRenderer from "@/components/markdown-renderer";

export function ChatMessage({ content, isUser }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 w-full`}>
      <Card className={`p-3 max-w-[80%] min-w-0 ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
        <div className="text-sm break-words overflow-hidden">
          {isUser ? content : <MarkdownRenderer content={content} />}
        </div>
      </Card>
    </div>
  );
}

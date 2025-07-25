import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

const MarkdownRenderer = ({ content, className }) => {
  return (
    <div className={cn("prose prose-sm dark:prose-invert max-w-none break-words", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-xl font-bold mb-4 mt-6 first:mt-0 break-words">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-bold mb-3 mt-5 first:mt-0 break-words">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-bold mb-2 mt-4 first:mt-0 break-words">{children}</h3>,
          p: ({ children }) => <p className="mb-3 last:mb-0 leading-normal break-words">{children}</p>,
          ul: ({ children }) => <ul className="list-disc ml-4 mb-3 last:mb-0">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal ml-4 mb-3 last:mb-0">{children}</ol>,
          li: ({ children }) => <li className="mb-1 last:mb-0 break-words">{children}</li>,
          pre: ({ children }) => <pre className="bg-background/50 p-3 rounded-lg mb-3 last:mb-0 overflow-x-auto text-sm max-w-full [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-wrap [&_code]:break-all">{children}</pre>,
          code: ({ children }) => <code className="bg-background/30 p-1 rounded text-sm font-mono break-all">{children}</code>,
          blockquote: ({ children }) => <blockquote className="border-l-2 border-muted-foreground/20 pl-4 italic mb-3 last:mb-0 break-words">{children}</blockquote>,
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:text-primary/80 break-all">
              {children}
            </a>
          ),
          img: ({ src, alt }) => <img src={src} alt={alt} className="rounded-lg max-w-full h-auto my-2" />,
          table: ({ children }) => (
            <div className="overflow-x-auto mb-3 last:mb-0 max-w-full">
              <table className="min-w-full divide-y divide-border">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="px-3 py-2 text-left text-sm font-medium bg-muted break-words">{children}</th>,
          td: ({ children }) => <td className="px-3 py-2 text-sm break-words">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

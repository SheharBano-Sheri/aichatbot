import { Card } from "@/components/ui/card";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CopyIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
);

const CheckIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const PythonIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.83 13.83c.38-1.04.38-2.62 0-3.66M10.17 10.17c-1.04-.38-2.62-.38-3.66 0M14 10.17a2.5 2.5 0 0 0-3.83-3.83M10 13.83a2.5 2.5 0 0 0 3.83 3.83M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z"></path><path d="M12 12v-2a1 1 0 0 0-1-1H9.5a1 1 0 0 1-1-1V7.5a1 1 0 0 0-1-1H6"></path><path d="M12 12v2a1 1 0 0 1 1 1h1.5a1 1 0 0 0 1 1v1.5a1 1 0 0 1 1 1H18"></path></svg>
);

const FileCodeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="m10 13-2 2 2 2"></path><path d="m14 17 2-2-2-2"></path></svg>
);


export function ChatMessage({ content, isUser }) {

  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const [isCopied, setIsCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || '');
    const codeLanguage = match ? match[1] : 'bash';
    const codeString = String(children).replace(/\n$/, '');

    const handleCopy = () => {
      navigator.clipboard.writeText(codeString).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      });
    };

    const LanguageIcon = ({ lang }) => {
      const langMap = {
        python: PythonIcon,
        bash: FileCodeIcon,
      };
      const IconComponent = langMap[lang] || FileCodeIcon;
      return <IconComponent className="h-4 w-4" />;
    };

    if (inline) {
      return <code className="bg-gray-200 dark:bg-gray-700 rounded-md px-1.5 py-0.5 font-mono text-sm">{children}</code>;
    }

    return match ? (
      <div className="not-prose my-4 bg-black rounded-lg overflow-hidden border border-gray-700/50 shadow-lg">
        <div className="flex justify-between items-center px-4 py-1.5 bg-[#2a2d35] border-b border-gray-700/50">
          <div className="flex items-center gap-2 text-gray-300">
            <LanguageIcon lang={codeLanguage} />
            <span className="font-sans text-xs font-medium tracking-wide">{codeLanguage}</span>
          </div>
          <button onClick={handleCopy} className="group flex items-center gap-1.5 text-xs font-medium text-gray-300 hover:text-white transition-colors duration-200">
            {isCopied ? <CheckIcon className="h-4 w-4 text-emerald-400" /> : <CopyIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />}
            {isCopied ? 'Copied!' : 'Copy code'}
          </button>
        </div>
        <div className="overflow-x-auto code-block-scroller">
          <SyntaxHighlighter {...props} style={vscDarkPlus} language={codeLanguage} PreTag="div" customStyle={{ margin: 0, padding: '1rem', backgroundColor: 'transparent' }}>
            {codeString}
          </SyntaxHighlighter>
        </div>
      </div>
    ) : (
      <code className={className} {...props}>{children}</code>
    );
  };

  const markdownComponents = {
    code: CodeBlock,
    blockquote: (props) => (
      <blockquote
        className="my-4 border-l-4 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800/20 p-4"
        style={{ overflowWrap: 'break-word' }} // <-- The direct fix
        {...props}
      />
    ),
    h3: props => <h3 className="mt-6 mb-2 text-lg font-semibold" {...props} />,
    h4: props => <h4 className="mt-4 mb-2 text-base font-semibold" {...props} />,
    ul: props => <ul className="my-4 ml-6 list-disc space-y-2" {...props} />,
    li: props => <li style={{ overflowWrap: 'break-word' }} {...props} />,
    p: props => <p className="leading-relaxed" style={{ overflowWrap: 'break-word' }} {...props} />,
    a: props => <a className="font-medium underline underline-offset-4 hover:no-underline" {...props} />
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <Card className={`p-4 max-w-[85%] text-sm ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {content}
        </ReactMarkdown>
      </Card>
    </div>
  );
}
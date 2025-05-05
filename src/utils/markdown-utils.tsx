
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';
import { Copy, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  const { theme } = useTheme();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const syntaxTheme = isDark ? vscDarkPlus : oneLight;

  return (
    <div className={cn("prose prose-lg dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        components={{
          code({className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            
            if (!match) {
              return (
                <code className={cn("bg-muted px-1.5 py-0.5 rounded text-sm", className)} {...props}>
                  {children}
                </code>
              );
            }
            
            return (
              <div className="relative group my-6">
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-md bg-primary/10 hover:bg-primary/20"
                    onClick={() => copyToClipboard(codeString)}
                  >
                    {copiedCode === codeString ? (
                      <CheckCheck className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy code</span>
                  </Button>
                </div>
                {/* Fix language indicator positioning */}
                <div className="absolute top-0 left-4 z-10 -translate-y-1/2">
                  <span className="text-xs font-mono px-2 py-1 rounded-sm bg-background border text-primary">
                    {match[1]}
                  </span>
                </div>
                <SyntaxHighlighter
                  style={syntaxTheme}
                  language={match[1]}
                  PreTag="div"
                  className="!bg-muted !mt-0 rounded-lg border overflow-hidden"
                  showLineNumbers
                  wrapLines
                  lineProps={() => ({
                    style: {
                      wordBreak: 'break-all',
                      whiteSpace: 'pre-wrap',
                      backgroundColor: 'transparent',
                      lineHeight: '1.5'
                    }
                  })}
                  customStyle={{
                    margin: 0,
                    padding: '2rem 0 1.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: isDark ? '#1A1F2C' : '#f8f8f8',
                  }}
                  codeTagProps={{
                    style: {
                      backgroundColor: 'transparent',
                    }
                  }}
                  {...props}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            );
          },
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 scroll-m-20" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 scroll-m-20" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3 scroll-m-20" {...props} />,
          p: ({node, ...props}) => <p className="my-4" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4" {...props} />,
          li: ({node, ...props}) => <li className="my-1" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-muted-foreground pl-4 py-1 my-4 italic" {...props} />,
          a: ({node, ...props}) => <a className="text-primary underline underline-offset-2 hover:text-primary/80" {...props} />,
          table: ({node, ...props}) => <div className="overflow-x-auto my-6"><table className="w-full border-collapse" {...props} /></div>,
          img: ({node, src, alt, ...props}) => <img src={src} alt={alt} className="my-6 rounded-md" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

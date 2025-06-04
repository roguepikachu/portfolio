
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
                <code className={cn("bg-muted/60 px-2 py-1 rounded-md text-sm font-mono border", className)} {...props}>
                  {children}
                </code>
              );
            }
            
            return (
              <div className="relative group my-8">
                {/* Copy button */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg bg-background/80 hover:bg-background border backdrop-blur-sm"
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

                {/* Language badge */}
                <div className="absolute top-0 left-4 z-10 -translate-y-1/2">
                  <span className="text-xs font-mono font-medium px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary uppercase tracking-wide">
                    {match[1]}
                  </span>
                </div>

                {/* Code block */}
                <div className="rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden shadow-lg">
                  <SyntaxHighlighter
                    style={syntaxTheme}
                    language={match[1]}
                    PreTag="div"
                    className="!bg-transparent !mt-0"
                    showLineNumbers
                    wrapLines
                    lineNumberStyle={{
                      color: isDark ? '#6b7280' : '#9ca3af',
                      fontSize: '0.875rem',
                      fontStyle: 'italic',
                      fontWeight: 'normal',
                      opacity: 0.8,
                      userSelect: 'none',
                      paddingRight: '1.5rem',
                      minWidth: '3rem',
                      textAlign: 'right'
                    }}
                    lineProps={() => ({
                      style: {
                        wordBreak: 'break-all',
                        whiteSpace: 'pre-wrap',
                        backgroundColor: 'transparent',
                        lineHeight: '1.6',
                        fontSize: '0.875rem',
                        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
                      }
                    })}
                    customStyle={{
                      margin: 0,
                      padding: '2rem 1.5rem 1.5rem',
                      borderRadius: 0,
                      backgroundColor: 'transparent',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                      fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
                    }}
                    codeTagProps={{
                      style: {
                        backgroundColor: 'transparent',
                        fontSize: 'inherit',
                        lineHeight: 'inherit',
                        fontFamily: 'inherit'
                      }
                    }}
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
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
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary/30 bg-muted/30 pl-6 py-4 my-6 italic rounded-r-lg" {...props} />,
          a: ({node, ...props}) => <a className="text-primary underline underline-offset-2 hover:text-primary/80 font-medium" {...props} />,
          table: ({node, ...props}) => <div className="overflow-x-auto my-6 rounded-lg border"><table className="w-full border-collapse" {...props} /></div>,
          img: ({node, src, alt, ...props}) => <img src={src} alt={alt} className="my-6 rounded-lg shadow-md" {...props} />,
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

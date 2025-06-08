import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';
import { Copy, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import mermaid from 'mermaid';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Clone and override comment style for both themes
const customVscDarkPlus = { ...vscDarkPlus, comment: { ...vscDarkPlus.comment, fontStyle: 'italic' } };
const customOneLight = { ...oneLight, comment: { ...oneLight.comment, fontStyle: 'italic' } };

const MermaidDiagram = ({ code, theme }: { code: string; theme: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!ref.current) return;

      try {
        // Configure mermaid
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'default',
          securityLevel: 'loose',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        });

        const { svg } = await mermaid.render(`mermaid-${Date.now()}`, code);
        ref.current.innerHTML = svg;
        setError(null);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('Failed to render diagram');
        ref.current.innerHTML = `<pre class="text-red-500 bg-red-50 dark:bg-red-950/20 p-4 rounded border">${code}</pre>`;
      }
    };

    renderDiagram();
  }, [code, theme]);

  if (error) {
    return (
      <div className="my-8 p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950/20">
        <p className="text-red-600 dark:text-red-400 font-medium mb-2">Mermaid Diagram Error</p>
        <pre className="text-sm text-red-500 whitespace-pre-wrap">{code}</pre>
      </div>
    );
  }

  return (
    <div className="my-8 flex justify-center">
      <div ref={ref} className="mermaid-diagram max-w-full overflow-auto p-4 bg-white dark:bg-gray-900 rounded-lg border shadow-sm" />
    </div>
  );
};

export const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  const { theme } = useTheme();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const syntaxTheme = isDark ? customVscDarkPlus : customOneLight;

  return (
    <div className={cn('prose prose-lg dark:prose-invert max-w-none', className)}>
      <ReactMarkdown
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            if (!match) {
              return (
                <code className={cn('bg-muted/80 px-2.5 py-1.5 rounded-md text-sm font-mono border', className)} {...props}>
                  {children}
                </code>
              );
            }

            // Handle Mermaid diagrams
            if (match[1] === 'mermaid') {
              return <MermaidDiagram code={codeString} theme={theme} />;
            }

            return (
              <div className="relative group my-8">
                {/* Copy button */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg bg-background/95 hover:bg-background border backdrop-blur-sm shadow-sm"
                    onClick={() => copyToClipboard(codeString)}
                  >
                    {copiedCode === codeString ? <CheckCheck className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    <span className="sr-only">Copy code</span>
                  </Button>
                </div>

                {/* Language badge */}
                <div className="absolute top-0 left-6 z-20 -translate-y-1/2">
                  <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-full bg-blue-500 text-white border border-blue-600 shadow-md uppercase tracking-wide">
                    {match[1]}
                  </span>
                </div>

                {/* Code block */}
                <div className="rounded-xl border bg-card/60 backdrop-blur-sm overflow-hidden shadow-lg">
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
                      opacity: 0.7,
                      userSelect: 'none',
                      paddingRight: '1.5rem',
                      minWidth: '3rem',
                      textAlign: 'right',
                    }}
                    lineProps={() => ({
                      style: {
                        wordBreak: 'break-all',
                        whiteSpace: 'pre-wrap',
                        backgroundColor: 'transparent',
                        lineHeight: '1.7',
                        fontSize: '0.875rem',
                        fontFamily:
                          'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      },
                    })}
                    customStyle={{
                      margin: 0,
                      padding: '2.5rem 1.5rem 1.5rem',
                      borderRadius: 0,
                      backgroundColor: 'transparent',
                      fontSize: '0.875rem',
                      lineHeight: '1.7',
                      fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      '& .comment': {
                        fontStyle: 'italic',
                      },
                    }}
                    codeTagProps={{
                      style: {
                        backgroundColor: 'transparent',
                        fontSize: 'inherit',
                        lineHeight: 'inherit',
                        fontFamily: 'inherit',
                      },
                    }}
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              </div>
            );
          },
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-10 mb-6 scroll-m-20 leading-tight" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-10 mb-5 scroll-m-20 leading-tight" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-8 mb-4 scroll-m-20 leading-tight" {...props} />,
          p: ({ node, ...props }) => <p className="my-5 leading-relaxed text-foreground/90" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-5 space-y-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-5 space-y-2" {...props} />,
          li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary/40 bg-muted/50 pl-6 py-5 my-8 italic rounded-r-xl relative" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-primary underline underline-offset-2 hover:text-primary/80 font-medium" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-8 rounded-lg border shadow-sm">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          img: ({ node, src, alt, ...props }) => <img src={src} alt={alt} className="my-8 rounded-lg shadow-md" {...props} />,
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

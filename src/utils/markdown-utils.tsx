
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      className={cn("prose prose-lg dark:prose-invert max-w-none", className)}
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={cn("bg-muted px-1.5 py-0.5 rounded text-sm", className)} {...props}>
              {children}
            </code>
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
  );
};

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

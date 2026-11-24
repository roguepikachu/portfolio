import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';
import { CodeBlock } from '@/components/blog/CodeBlock';
import mermaid from 'mermaid';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}


const MermaidDiagram = ({ code, theme }: { code: string; theme: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Detect diagram type and determine appropriate container size
  const getDiagramSize = (code: string): string => {
    const trimmedCode = code.trim().toLowerCase();

    // Simple vertical diagrams (like Architecture at a Glance)
    // Check for simple diagrams with basic elements
    if ((trimmedCode.includes('graph tb') || trimmedCode.includes('graph td')) &&
        (trimmedCode.includes('http client') ||
         trimmedCode.includes('gin http') ||
         trimmedCode.includes('middleware layer') ||
         trimmedCode.includes('bonsai api server') ||
         trimmedCode.length < 500)) {
      return 'max-w-md'; // 448px - much smaller for simple architecture diagrams
    }

    // Sequence diagrams need more width
    if (trimmedCode.includes('sequencediagram')) {
      return 'max-w-5xl'; // 1024px
    }

    // Graph LR (horizontal) diagrams need more width
    if (trimmedCode.includes('graph lr')) {
      // Clean Architecture diagram needs extra width for all the layers
      if (trimmedCode.includes('http layer') ||
          trimmedCode.includes('business layer') ||
          trimmedCode.includes('data layer') ||
          trimmedCode.includes('repository interface')) {
        return 'max-w-5xl'; // 1024px for Clean Architecture diagram
      }
      return 'max-w-4xl'; // 896px - standard for other graph LR
    }

    // Graph TD/TB (vertical) diagrams with subgraphs
    if ((trimmedCode.includes('graph td') || trimmedCode.includes('graph tb')) &&
        trimmedCode.includes('subgraph')) {
      // Test Pyramid diagram should be smaller
      if (trimmedCode.includes('test pyramid') ||
          trimmedCode.includes('acceptance tests') ||
          trimmedCode.includes('unit tests')) {
        return 'custom-pyramid'; // Custom small size for Test Pyramid
      }
      return 'max-w-3xl'; // 768px - standard for other subgraph diagrams
    }

    // Flowcharts
    if (trimmedCode.includes('flowchart')) {
      return 'max-w-4xl'; // 896px
    }

    // Default for other diagram types
    return 'max-w-3xl'; // 768px
  };

  const containerSize = getDiagramSize(code);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!ref.current) return;

      try {
        // Configure mermaid
        const currentTheme: 'dark' | 'default' = theme === 'dark' ? 'dark' : 'default';

        // Use different config for pyramid
        const config = containerSize === 'custom-pyramid' ? {
          startOnLoad: false,
          theme: currentTheme,
          securityLevel: 'loose',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          flowchart: {
            useMaxWidth: false,
            htmlLabels: true,
            curve: 'basis',
            rankSpacing: 30,
            nodeSpacing: 20,
            padding: 10,
            diagramPadding: 10,
          },
        } : {
          startOnLoad: false,
          theme: currentTheme,
          securityLevel: 'loose',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis',
            rankSpacing: 60,
            nodeSpacing: 60,
          },
          sequence: {
            useMaxWidth: true,
          },
        };

        mermaid.initialize(config);

        const uniqueId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(uniqueId, code);

        if (!ref.current) return;

        ref.current.innerHTML = svg;
        setError(null);

        // Simple approach - just ensure SVG fits in container
        const svgElement = ref.current.querySelector('svg');
        if (svgElement) {
          svgElement.style.maxWidth = '100%';
          svgElement.style.height = 'auto';
        }
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('Failed to render diagram');
        if (ref.current) {
          ref.current.innerHTML = `<pre class="text-red-500 bg-red-50 dark:bg-red-950/20 p-4 rounded border text-xs">${code}</pre>`;
        }
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

  // Special handling for Test Pyramid - small container
  if (containerSize === 'custom-pyramid') {
    return (
      <div className="my-8 flex justify-center w-full">
        <div
          ref={ref}
          className="mermaid-diagram overflow-hidden p-2 bg-white dark:bg-gray-900 rounded-lg border shadow-sm"
          style={{
            width: '300px',
            maxWidth: '300px',
            fontSize: '12px',
            transform: 'scale(0.7)',
            transformOrigin: 'top center'
          }}
        />
      </div>
    );
  }

  return (
    <div className="my-8 flex justify-center w-full">
      <div ref={ref} className={`mermaid-diagram w-full ${containerSize} overflow-x-auto p-4 bg-white dark:bg-gray-900 rounded-lg border shadow-sm`} />
    </div>
  );
};

type CodeElementProps = { className?: string; children?: React.ReactNode };

export const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  const { theme } = useTheme();
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className={cn('prose prose-lg dark:prose-invert max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Fenced code blocks arrive as <pre><code class="language-x">. Handle the whole
          // block here so it never inherits <pre> or inline-code styles, with or without a language.
          pre({ children }) {
            const child = React.Children.toArray(children)[0];
            if (!React.isValidElement<CodeElementProps>(child)) {
              return <pre>{children}</pre>;
            }
            const language = /language-([\w+-]+)/.exec(child.props.className || '')?.[1]?.toLowerCase() ?? '';
            const code = String(child.props.children ?? '').replace(/\n$/, '');

            if (language === 'mermaid') {
              return <MermaidDiagram code={code} theme={isDark ? 'dark' : 'light'} />;
            }
            return <CodeBlock code={code} language={language} isDark={isDark} />;
          },
          // Only inline code reaches here.
          code({ className, children, ...props }) {
            return (
              <code
                className={cn(
                  'rounded-md border bg-muted/80 px-1.5 py-0.5 font-mono text-[0.85em] break-words',
                  className,
                )}
                {...props}
              >
                {children}
              </code>
            );
          },
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-10 mb-6 scroll-m-20 leading-tight" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-12 mb-5 scroll-m-20 leading-tight" {...props} />,
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
            <div className="not-prose my-8 overflow-x-auto rounded-xl border shadow-sm">
              <table className="w-full border-collapse text-sm" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-muted/60" {...props} />,
          tr: ({ node, ...props }) => <tr className="border-b last:border-b-0" {...props} />,
          th: ({ node, ...props }) => (
            <th className="px-4 py-2.5 text-left font-semibold text-foreground" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-2.5 align-top leading-relaxed text-foreground/90" {...props} />
          ),
          img: ({ node, src, alt, ...props }) => (
            <img src={src} alt={alt} loading="lazy" className="my-8 w-full rounded-xl border shadow-sm" {...props} />
          ),
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

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const darkTheme = { ...vscDarkPlus, comment: { ...vscDarkPlus.comment, fontStyle: 'italic' } };
const lightTheme = { ...oneLight, comment: { ...oneLight.comment, fontStyle: 'italic' } };

const MONO_FONT =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", monospace';

// Languages that show program output or a shell session: no line numbers.
const PLAIN_LANGUAGES = new Set(['text', 'txt', 'plain', 'console', 'output', 'shell-session']);

const LANGUAGE_LABELS: Record<string, string> = {
  sh: 'shell',
  yml: 'yaml',
  ts: 'typescript',
  js: 'javascript',
  py: 'python',
  text: 'output',
  txt: 'output',
};

const languageLabel = (language: string) => LANGUAGE_LABELS[language] ?? language;

const useCopy = () => {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return { copied, copy };
};

export const CopyButton = ({ text }: { text: string }) => {
  const { copied, copy } = useCopy();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
      onClick={() => copy(text)}
      aria-label="Copy code"
    >
      {copied ? <CheckCheck className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copied' : 'Copy'}
    </Button>
  );
};

interface HighlightedCodeProps {
  code: string;
  language: string;
  isDark: boolean;
  maxHeight?: string;
}

/** Syntax-highlighted code with no frame. Long lines scroll instead of wrapping. */
export const HighlightedCode = ({ code, language, isDark, maxHeight }: HighlightedCodeProps) => {
  const plain = PLAIN_LANGUAGES.has(language);
  const showLineNumbers = !plain && code.split('\n').length > 5;

  return (
    <SyntaxHighlighter
      style={isDark ? darkTheme : lightTheme}
      language={plain || !language ? 'text' : language}
      PreTag="pre"
      showLineNumbers={showLineNumbers}
      lineNumberStyle={{
        minWidth: '2.25em',
        paddingRight: '1.25em',
        textAlign: 'right',
        color: isDark ? '#6b7280' : '#9ca3af',
        userSelect: 'none',
      }}
      customStyle={{
        margin: 0,
        padding: '1rem 1.25rem',
        background: 'transparent',
        fontSize: '0.85rem',
        lineHeight: 1.65,
        fontFamily: MONO_FONT,
        overflow: 'auto',
        whiteSpace: 'pre',
        maxHeight,
      }}
      codeTagProps={{
        style: { fontFamily: MONO_FONT, background: 'transparent', whiteSpace: 'pre' },
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

interface CodeBlockProps {
  code: string;
  language: string;
  isDark: boolean;
  className?: string;
}

/** A fenced code block: header with the language and a copy button, then the code. */
export const CodeBlock = ({ code, language, isDark, className }: CodeBlockProps) => (
  <figure className={cn('not-prose my-8 overflow-hidden rounded-xl border bg-muted/40 shadow-sm', className)}>
    <div className="flex items-center justify-between border-b bg-muted/60 px-4 py-1.5">
      <span className="font-mono text-xs font-medium lowercase tracking-wide text-muted-foreground">
        {languageLabel(language) || 'code'}
      </span>
      <CopyButton text={code} />
    </div>
    <HighlightedCode code={code} language={language} isDark={isDark} />
  </figure>
);

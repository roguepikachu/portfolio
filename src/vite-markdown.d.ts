
declare module '*.md' {
  const attributes: {
    id: string;
    title: string;
    date: string;
    excerpt?: string;
    summary?: string;
    tags: string[];
    pinned?: boolean;
    release?: boolean;
    featured?: boolean;
    link?: string;
    description?: string;
    githubUrl?: string;
    demoUrl?: string;
    image?: string;
  };
  const html: string;
  const toc: { level: number; content: string }[];

  export { attributes, html, toc };
}

declare module '*.mdx' {
  import React from 'react';
  const MDXComponent: React.ComponentType;
  export default MDXComponent;
}

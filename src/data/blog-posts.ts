
import { loadBlogPosts } from '@/utils/markdown-loader';
import { BlogPost } from '@/types/blog';

export const blogPosts = loadBlogPosts();

// Fallback data in case no markdown files are found
export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "understanding-javascript-closures",
    title: "Understanding JavaScript Closures",
    date: "2023-05-01",
    excerpt: "A deep dive into closures and lexical scope in JavaScript.",
    tags: ["JavaScript", "Functional Programming"],
    pinned: true,
    release: true,
    content: `
# Understanding JavaScript Closures

A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment).
    `
  },
  {
    id: "getting-started-with-react-hooks",
    title: "Getting Started with React Hooks",
    date: "2023-04-20",
    excerpt: "Learn how to use React Hooks to manage state and side effects in functional components.",
    tags: ["React", "JavaScript", "Web Development"],
    pinned: false,
    release: true,
    content: `# Getting Started with React Hooks

## Introduction
React Hooks were introduced in React 16.8 to allow developers to use state and other React features without writing a class.
    `
  },
  {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices for Large-Scale Applications",
    date: "2023-03-15",
    excerpt: "Discover how to structure and maintain large TypeScript codebases with best practices and patterns.",
    tags: ["TypeScript", "Software Architecture", "Best Practices"],
    pinned: false,
    release: true,
    content: `# TypeScript Best Practices for Large-Scale Applications

## Introduction
TypeScript has become the language of choice for developing large-scale JavaScript applications.
    `
  },
  {
    id: "tailwind-css-tips",
    title: "10 Tailwind CSS Tips to Supercharge Your Workflow",
    date: "2023-02-28",
    excerpt: "Level up your Tailwind CSS skills with these practical tips and tricks for faster development.",
    tags: ["CSS", "Tailwind", "Web Development"],
    pinned: false,
    release: true,
    content: `# 10 Tailwind CSS Tips to Supercharge Your Workflow

## Introduction
Tailwind CSS has revolutionized the way we write CSS by providing utility-first classes.
    `
  }
];

// If no markdown files are found, use the fallback data
if (blogPosts.length === 0) {
  // Use the fallback data
  blogPosts.push(...fallbackBlogPosts);
}

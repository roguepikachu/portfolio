
import { loadBlogPosts } from '@/utils/markdown-loader';

export const blogPosts = loadBlogPosts();

// Fallback data in case no markdown files are found
export const fallbackBlogPosts = [
  {
    id: "understanding-javascript-closures",
    title: "Understanding JavaScript Closures",
    date: "2025-05-01",
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
    date: "2025-04-20",
    excerpt: "Learn how to use React Hooks to manage state and side effects in functional components.",
    tags: ["React", "JavaScript", "Web Development"],
    content: `# Getting Started with React Hooks`
  }
];

// If no markdown files are found, use the fallback data
if (blogPosts.length === 0) {
  // @ts-ignore - This is intentional to provide fallback data
  blogPosts.push(...fallbackBlogPosts);
}

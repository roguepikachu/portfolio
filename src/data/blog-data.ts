
import { BlogPost } from "@/types/blog";

// Blog posts referencing markdown files
export const blogPosts: BlogPost[] = [
  {
    id: "getting-started-with-react",
    title: "Getting Started with React in 2024",
    date: "2024-04-15",
    excerpt: "React continues to dominate the frontend landscape in 2024, but getting started can be overwhelming with the ecosystem's constant evolution. This guide will help you navigate the current best practices for beginning your React journey.",
    tags: ["React", "JavaScript", "Frontend"],
    pinned: true,
    markdownFile: "getting-started-with-react.md"
  },
  {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices for 2024",
    date: "2024-03-20",
    excerpt: "TypeScript continues to gain adoption among JavaScript developers, and with good reason. Its type system helps catch errors during development rather than runtime, improves IDE support, and serves as living documentation.",
    tags: ["TypeScript", "JavaScript", "Development"],
    release: true,
    markdownFile: "typescript-best-practices.md"
  }
];

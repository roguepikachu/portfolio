
import { Publication } from "@/types/publication";

// Publications referencing markdown files
export const publications: Publication[] = [
  {
    id: "machine-learning-trends",
    title: "Machine Learning Trends for 2024",
    date: "2024-01-15",
    summary: "An overview of emerging trends in machine learning and their potential impact on various industries.",
    link: "https://example.com/publications/machine-learning-trends",
    tags: ["Machine Learning", "AI", "Technology Trends"],
    featured: true,
    markdownFile: "machine-learning-trends.md"
  },
  {
    id: "web-accessibility",
    title: "Web Accessibility Guidelines for Modern Applications",
    date: "2023-11-28",
    summary: "A comprehensive guide to implementing accessibility features in web applications, focusing on compliance with WCAG 2.2 standards.",
    link: "https://example.com/publications/web-accessibility",
    tags: ["Accessibility", "Web Development", "Frontend"],
    markdownFile: "web-accessibility.md"
  }
];

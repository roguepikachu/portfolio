
import { Project } from "@/types/project";

// Transformed data structure to reference markdown files
export const projects: Project[] = [
  {
    id: 1,
    title: "Personal Portfolio",
    description: "A modern developer portfolio built with React, TypeScript, and Tailwind CSS.",
    tags: ["React", "TypeScript", "Tailwind"],
    githubUrl: "https://github.com/",
    demoUrl: "https://example.com",
    featured: true,
    markdownFile: "personal-portfolio.md"
  },
  {
    id: 2,
    title: "Blog Platform",
    description: "A full-featured blog platform with markdown support and comment system.",
    tags: ["Next.js", "React", "MDX"],
    githubUrl: "https://github.com/",
    featured: true,
    markdownFile: "blog-platform.md"
  },
  {
    id: 3,
    title: "E-Commerce Dashboard",
    description: "An admin dashboard for managing e-commerce products and orders.",
    tags: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/",
    demoUrl: "https://example.com",
    markdownFile: "ecommerce-dashboard.md"
  },
  {
    id: 4,
    title: "Weather App",
    description: "A simple weather application that shows current conditions and forecasts.",
    tags: ["JavaScript", "React", "API"],
    githubUrl: "https://github.com/",
    demoUrl: "https://example.com",
    markdownFile: "weather-app.md"
  },
  {
    id: 5,
    title: "Task Manager",
    description: "A productivity tool for managing tasks and projects with drag-and-drop functionality.",
    tags: ["React", "Redux", "Firebase"],
    githubUrl: "https://github.com/",
    markdownFile: "task-manager.md"
  },
  {
    id: 6,
    title: "Recipe Finder",
    description: "An application to search for recipes based on ingredients you have.",
    tags: ["JavaScript", "API", "CSS"],
    githubUrl: "https://github.com/",
    demoUrl: "https://example.com",
    markdownFile: "recipe-finder.md"
  },
];

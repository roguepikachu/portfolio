
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Github, Search, ExternalLink, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  image?: string;
  featured?: boolean;
  readme?: string;
}

// Sample project data with README content
const projects: Project[] = [
  {
    id: 1,
    title: "Personal Portfolio",
    description: "A modern developer portfolio built with React, TypeScript, and Tailwind CSS.",
    tags: ["React", "TypeScript", "Tailwind"],
    githubUrl: "https://github.com/",
    demoUrl: "https://example.com",
    featured: true,
    readme: `# Personal Portfolio

A modern developer portfolio built with React, TypeScript, and Tailwind CSS.

## Features

- Responsive design for all device sizes
- Dark and light mode
- Project showcase
- Contact form
- Blog integration

## Installation

\`\`\`bash
npm install
npm start
\`\`\`

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
`
  },
  {
    id: 2,
    title: "Blog Platform",
    description: "A full-featured blog platform with markdown support and comment system.",
    tags: ["Next.js", "React", "MDX"],
    githubUrl: "https://github.com/",
    featured: true,
    readme: `# Blog Platform

A full-featured blog platform with markdown support and comment system.

## Features

- Markdown content editing
- Comment system with threaded replies
- Tags and categories
- SEO optimized
- Image uploads

## Tech Stack

- Next.js
- React
- MDX
- MongoDB
`
  },
  {
    id: 3,
    title: "E-Commerce Dashboard",
    description: "An admin dashboard for managing e-commerce products and orders.",
    tags: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/",
    demoUrl: "https://example.com",
  },
  {
    id: 4,
    title: "Weather App",
    description: "A simple weather application that shows current conditions and forecasts.",
    tags: ["JavaScript", "React", "API"],
    githubUrl: "https://github.com/",
    demoUrl: "https://example.com",
  },
  {
    id: 5,
    title: "Task Manager",
    description: "A productivity tool for managing tasks and projects with drag-and-drop functionality.",
    tags: ["React", "Redux", "Firebase"],
    githubUrl: "https://github.com/",
  },
  {
    id: 6,
    title: "Recipe Finder",
    description: "An application to search for recipes based on ingredients you have.",
    tags: ["JavaScript", "API", "CSS"],
    githubUrl: "https://github.com/",
    demoUrl: "https://example.com",
  },
];

// Get unique tags from projects
const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [readmeOpen, setReadmeOpen] = useState(false);
  
  // Filter projects based on search query and selected tag
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === "all" || project.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            A collection of my personal and professional projects.
          </p>
        </div>
        
        {/* Filters */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Project Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className={`group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md ${
                project.featured ? "ring-2 ring-primary/20" : ""
              }`}
            >
              <div className="p-6 flex flex-col h-full">
                {project.featured && (
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary mb-4 self-start">
                    Featured
                  </div>
                )}
                <h2 className="text-xl font-bold">{project.title}</h2>
                <p className="mt-2 text-muted-foreground text-sm flex-grow">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <div 
                      key={tag} 
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t flex items-center gap-3">
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-1 h-3 w-3" />
                      Code
                    </a>
                  </Button>
                  {project.demoUrl && (
                    <Button size="sm" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.readme && (
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => {
                        setSelectedProject(project);
                        setReadmeOpen(true);
                      }}
                    >
                      <FileText className="mr-1 h-3 w-3" />
                      README
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">No projects found matching your criteria.</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
        
        {/* README Dialog */}
        {selectedProject && (
          <Dialog open={readmeOpen} onOpenChange={setReadmeOpen}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedProject.title} - README</DialogTitle>
                <DialogDescription>
                  Project documentation and setup instructions
                </DialogDescription>
              </DialogHeader>
              <div className="prose dark:prose-invert max-w-none mt-4">
                <ReactMarkdown>
                  {selectedProject.readme || "No README available for this project."}
                </ReactMarkdown>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={() => setReadmeOpen(false)}>
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

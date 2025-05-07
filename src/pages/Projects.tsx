
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Github, Search, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";

// Get unique tags from projects
const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay for markdown files
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
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
          {isLoading ? (
            // Skeleton loading state
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-lg border bg-card p-6 h-72 flex flex-col">
                <div className="loading-placeholder h-4 w-1/4 rounded mb-4"></div>
                <div className="loading-placeholder h-6 w-3/4 rounded mb-4"></div>
                <div className="loading-placeholder h-4 w-full rounded mb-3"></div>
                <div className="loading-placeholder h-4 w-5/6 rounded mb-6"></div>
                <div className="flex gap-2 mt-2">
                  <div className="loading-placeholder h-5 w-16 rounded"></div>
                  <div className="loading-placeholder h-5 w-16 rounded"></div>
                </div>
                <div className="mt-auto pt-4 border-t flex items-center gap-3">
                  <div className="loading-placeholder h-8 w-16 rounded"></div>
                  <div className="loading-placeholder h-8 w-16 rounded"></div>
                </div>
              </div>
            ))
          ) : filteredProjects.map((project) => (
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
                <Link to={`/projects/${project.id}`}>
                  <h2 className="project-title text-xl font-bold hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                </Link>
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
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!isLoading && filteredProjects.length === 0 && (
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
      </div>
    </div>
  );
}

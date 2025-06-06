
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Github, Search, ExternalLink, Folder, Code2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '@/types/project';
import { loadProjects } from '@/utils/content-loader';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  useEffect(() => {
    const loadProjectsData = async () => {
      try {
        const projectsData = await loadProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjectsData();
  }, []);

  // Get unique tags from projects
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === 'all' || project.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  if (loading) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <Folder className="h-16 w-16 text-primary animate-pulse" />
              <Code2 className="absolute -bottom-2 -right-2 h-8 w-8 text-muted-foreground animate-bounce" />
              <Loader2 className="absolute -top-2 -left-2 h-6 w-6 animate-spin text-accent" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Building something awesome...</h2>
              <p className="text-muted-foreground">Compiling the latest projects and innovations</p>
            </div>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse [animation-delay:0s]"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse [animation-delay:0.6s]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Project Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className={`group overflow-hidden rounded-lg border bg-card hover:shadow-md ${
                project.featured ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              <div className="p-6 flex flex-col h-full">
                {/* Featured label (or placeholder) above the title for alignment */}
                {project.featured ? (
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary mb-4 self-start" style={{ minHeight: '24px' }}>
                    Featured
                  </div>
                ) : (
                  <div className="mb-4" style={{ minHeight: '24px' }}></div>
                )}
                <Link to={`/projects/${project.id}`}>
                  <h2 className="project-title text-xl font-bold hover:text-primary">{project.title}</h2>
                </Link>
                <p className="mt-2 text-muted-foreground text-sm flex-grow">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <div key={tag} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
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

        {filteredProjects.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">No projects found matching your criteria.</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('all');
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

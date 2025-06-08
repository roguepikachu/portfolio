import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Github, Search, ExternalLink, Folder, Code2, Loader2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '@/types/project';
import { loadProjects } from '@/utils/content-loader';
import { LoadingDots } from '../components/ui/LoadingDots';
import { delay } from '../utils/delay';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const loadProjectsData = async () => {
      try {
        const projectsData = await loadProjects();
        setProjects(projectsData);
        await delay(); // Use default delay
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
      !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.readme && project.readme.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => project.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  // Sort projects by featured status first, then by date or alphabetically
  const sortedProjects = filteredProjects.sort((a, b) => {
    // First sort by featured status (featured items first)
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // Then sort alphabetically by title
    return a.title.localeCompare(b.title);
  });

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Handle tag selection from dropdown
  const handleTagSelect = (value: string) => {
    if (value === 'all') {
      setSelectedTags([]);
    } else {
      toggleTag(value);
    }
  };

  // Helper to strip markdown formatting
  function stripMarkdown(text: string) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
      .replace(/\*(.*?)\*/g, '$1')     // Italic
      .replace(/`(.*?)`/g, '$1')       // Code
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
      .replace(/#{1,6}\s/g, '')        // Headers
      .replace(/>\s(.*)/g, '$1')       // Blockquotes
      .replace(/\n/g, ' ')             // Newlines
      .replace(/\s+/g, ' ')            // Multiple spaces
      .trim();
  }

  // Helper to get a snippet with highlighted match
  function getSnippet(text: string, query: string) {
    if (!text || !query) return null;
    const plainText = stripMarkdown(text);
    const lower = plainText.toLowerCase();
    const idx = lower.indexOf(query.toLowerCase());
    if (idx === -1) return null;
    const start = Math.max(0, idx - 30);
    const end = Math.min(plainText.length, idx + query.length + 30);
    const before = plainText.slice(start, idx);
    const match = plainText.slice(idx, idx + query.length);
    const after = plainText.slice(idx + query.length, end);
    return (
      <span className="block text-xs mt-1 text-muted-foreground">
        ...{before}
        <mark className="px-1 rounded bg-primary/20 text-primary dark:bg-primary/40 dark:text-primary font-semibold">{match}</mark>
        {after}...
      </span>
    );
  }

  if (loading) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <Folder className="h-16 w-16 text-primary animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Building something awesome...</h2>
              <p className="text-muted-foreground">Compiling the latest projects and innovations</p>
            </div>
            <LoadingDots size="md" />
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
        <div className="mt-8 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="pl-8"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>
            <div className="w-full sm:w-[180px]">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium sm:hidden">Filter by tag</h3>
                {selectedTags.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs hover:bg-transparent hover:underline sm:hidden"
                    onClick={() => setSelectedTags([])}
                  >
                    Clear ({selectedTags.length})
                  </Button>
                )}
              </div>
              <Select onValueChange={handleTagSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>
                      {tag} {selectedTags.includes(tag) && '✓'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Selected tags */}
          {selectedTags.length > 0 && (
            <div>
              <div className="hidden sm:flex items-center justify-between">
                <h3 className="text-sm font-medium">Selected tags</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs hover:bg-transparent hover:underline"
                  onClick={() => setSelectedTags([])}
                >
                  Clear ({selectedTags.length})
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedTags.map(tag => (
                  <Badge
                    key={tag}
                    variant="default"
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProjects.map(project => {
            let snippet = null;
            if (searchQuery) {
              if (project.readme && project.readme.toLowerCase().includes(searchQuery.toLowerCase())) {
                snippet = getSnippet(project.readme, searchQuery);
              } else if (project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                snippet = getSnippet(project.description, searchQuery);
              }
            }
            return (
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
                  {snippet}
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
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">No projects found matching your criteria.</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery('');
                setSelectedTags([]);
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

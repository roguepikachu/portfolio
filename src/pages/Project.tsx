
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { MarkdownRenderer } from '@/utils/markdown-utils';

// Using the type but importing from Projects page for now
// In a real app, this would come from a dedicated data file
import { Project as ProjectType } from '@/types/project';

export default function Project() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<ProjectType[]>([]);
  
  useEffect(() => {
    // Importing projects from the Projects page
    // In a real app, we would use an API or a dedicated data file
    import('../pages/Projects').then(module => {
      const projects: ProjectType[] = module.projects;
      
      if (!id) return;
      
      // Find current project
      const currentProject = projects.find(p => String(p.id) === id);
      if (!currentProject) return;
      
      setProject(currentProject);
      
      // Find related projects based on tags
      const related = projects
        .filter(p => String(p.id) !== id && p.tags.some(tag => currentProject.tags.includes(tag)))
        .slice(0, 2);
      setRelatedProjects(related);
      
      // Scroll to top
      window.scrollTo(0, 0);
    });
  }, [id]);
  
  if (!project) {
    return (
      <div className="container py-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Project not found</p>
          <Button variant="link" asChild className="mt-4">
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Back to projects link */}
        <Link 
          to="/projects" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all projects
        </Link>
        
        {/* Project header */}
        <article>
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {project.featured && (
                <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/10">
                  Featured
                </Badge>
              )}
            </div>
            
            <h1 className="project-title text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {project.title}
            </h1>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="hover:bg-secondary/80">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
              
              {project.demoUrl && (
                <Button asChild variant="outline">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </header>
          
          {/* Project content */}
          {project.readme ? (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MarkdownRenderer content={project.readme} />
            </div>
          ) : (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground">{project.description}</p>
              <p className="mt-4">
                For more details about this project, check out the GitHub repository.
              </p>
            </div>
          )}
        </article>
        
        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="project-title text-2xl font-bold mb-8">Related Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedProjects.map(proj => (
                <Link 
                  to={`/projects/${proj.id}`} 
                  key={proj.id}
                  className="block group rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-muted"
                >
                  <h3 className="project-title font-medium group-hover:text-primary transition-colors">{proj.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{proj.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {proj.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                    {proj.tags.length > 2 && <span className="text-xs text-muted-foreground">+{proj.tags.length - 2}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

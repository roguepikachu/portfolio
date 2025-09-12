import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Github, Code2 } from 'lucide-react';
import { MarkdownRenderer } from '@/utils/markdown-utils';
import { VotingButtons } from '@/components/VotingButtons';
import { loadProjects } from '@/utils/content-loader';
import { Project as ProjectType } from '@/types/project';
import { LoadingDots } from '@/components/ui/LoadingDots';
import { delay } from '@/utils/delay';
import styles from './Project.module.css';
import badgeStyles from '@/styles/badges.module.css';

export default function Project() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjectData = async () => {
      if (!id) return;

      try {
        const projects = await loadProjects();

        // Find current project
        const currentProject = projects.find(p => p.id === id);
        if (!currentProject) {
          setLoading(false);
          return;
        }

        setProject(currentProject);

        // Find related projects based on tags
        const related = projects.filter(p => p.id !== id && p.tags.some(tag => currentProject.tags.includes(tag))).slice(0, 2);
        setRelatedProjects(related);

        // Scroll to top
        window.scrollTo(0, 0);
        
        await delay(); // Use default delay
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjectData();
  }, [id]);

  if (loading) {
    return (
      <div className={`container ${styles.loadingContainer}`}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingIconWrapper}>
            <Code2 className={styles.loadingIcon} />
          </div>
          <div className={styles.loadingTextWrapper}>
            <h2 className={styles.loadingTitle}>Compiling project...</h2>
            <p className={styles.loadingMessage}>Executing code and loading features</p>
          </div>
          <LoadingDots size="lg" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={`container ${styles.notFoundContainer}`}>
        <div className={styles.notFoundContent}>
          <p className={styles.notFoundTitle}>Project not found</p>
          <Button variant="link" asChild className={styles.backToProjectsButton}>
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.wrapper}>
        {/* Back to projects link */}
        <Link
          to="/projects"
          className={styles.backLink}
        >
          <ArrowLeft className={styles.backIcon} />
          Back to all projects
        </Link>

        {/* Project header */}
        <article>
          <header className={styles.projectHeader}>
            <div className={styles.badgesWrapper}>
              {project.featured && (
                <Badge variant="outline" className={badgeStyles.featured}>
                  Featured
                </Badge>
              )}
            </div>

            <h1 className={styles.projectTitle}>{project.title}</h1>

            <div className={styles.tagsWrapper}>
              {project.tags.map(tag => (
                <Badge key={tag} variant="secondary" className={styles.tagLink}>
                  {tag}
                </Badge>
              ))}
            </div>

            <div className={styles.buttonWrapper}>
              <Button asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.buttonInner}>
                  <Github className={styles.buttonIcon} />
                  View on GitHub
                </a>
              </Button>

              {project.demoUrl && (
                <Button asChild variant="outline">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={styles.buttonInner}>
                    <ExternalLink className={styles.buttonIcon} />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>

            {/* Voting buttons */}
            <div className={styles.votingWrapper}>
              <VotingButtons itemId={String(project.id)} itemType="project" />
            </div>
          </header>

          {/* Project content */}
          {project.readme ? (
            <div className={`prose prose-lg dark:prose-invert ${styles.projectContent}`}>
              <MarkdownRenderer content={project.readme} />
            </div>
          ) : (
            <div className={`prose prose-lg dark:prose-invert ${styles.projectContent}`}>
              <p className={styles.contentPlaceholder}>{project.description}</p>
              <p className={styles.contentExtra}>For more details about this project, check out the GitHub repository.</p>
            </div>
          )}
        </article>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <div className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>Related Projects</h2>
            <div className={styles.relatedGrid}>
              {relatedProjects.map(proj => (
                <Link
                  to={`/projects/${proj.id}`}
                  key={proj.id}
                  className={`group ${styles.relatedProjectCard}`}
                >
                  <h3 className={styles.relatedProjectTitle}>{proj.title}</h3>
                  <p className={styles.relatedProjectDescription}>{proj.description}</p>
                  <div className={styles.relatedProjectTags}>
                    {proj.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className={styles.relatedProjectTag}>
                        {tag}
                      </Badge>
                    ))}
                    {proj.tags.length > 2 && <span className={styles.relatedProjectTagsMore}>+{proj.tags.length - 2}</span>}
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

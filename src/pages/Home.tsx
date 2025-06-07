import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { ContactModal } from '@/components/contact-modal';
import { Link } from 'react-router-dom';
import { loadBlogPosts, loadProjects, loadPublications } from '@/utils/content-loader';
import { PublicationCard } from '@/components/publication-card';
import { LoadingDots } from '../components/ui/LoadingDots';
import { delay } from '../utils/delay';
import { BlogPostCard } from '@/components/blog-post-card';

export default function Home() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [postsData, projectsData, publicationsData] = await Promise.all([
          loadBlogPosts(),
          loadProjects(),
          loadPublications(),
        ]);
        setPosts(postsData);
        setProjects(projectsData);
        setPublications(publicationsData);
        await delay(); // Use default delay
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const featuredPublications = publications.filter((publication: any) => publication.featured).slice(0, 2);

  // Add sectionConfig definition
  const sectionConfig = {
    blog: true,
    publications: true,
    projects: true,
  };

  if (loading) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <Sparkles className="h-16 w-16 text-primary animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Crafting digital experiences...</h2>
              <p className="text-muted-foreground">Loading the portfolio with passion, creativity, and a touch of magic</p>
            </div>
            <LoadingDots size="md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex items-center relative overflow-hidden">
        <div className="container px-4 md:px-6 space-y-10 py-16 md:py-24">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Developer, Designer, Writer
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Hi, I'm Ayush Kumar. I build accessible, responsive web applications and write about web development, design, and tech.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild className="inline-flex items-center">
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub Profile
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="secondary" onClick={() => setContactModalOpen(true)}>
                  Contact Me
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-8 border-background shadow-xl">
                {/* Replace with your profile image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center text-6xl font-bold text-primary">
                  AK
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(var(--primary-rgb),0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
      </section>

      {/* Blog Posts Section */}
      {sectionConfig.blog && (
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Recent Blog Posts</h2>
                <p className="text-muted-foreground">Thoughts, ideas, and tutorials</p>
              </div>
              <Button asChild variant="secondary">
                <Link to="/blog" className="inline-flex items-center">
                  View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 3).map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Publications Section - Conditional based on sectionConfig */}
      {sectionConfig.publications && (
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured Publications</h2>
                <p className="text-muted-foreground">Academic papers and research articles</p>
              </div>
              <Button asChild variant="secondary">
                <Link to="/publications" className="inline-flex items-center">
                  View All Publications <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPublications.map(publication => (
                <PublicationCard key={publication.id} publication={publication} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Section - Conditional based on sectionConfig */}
      {sectionConfig.projects && (
        <section className="bg-muted/50 py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured Projects</h2>
                <p className="text-muted-foreground">Check out some of my latest work</p>
              </div>
              <Button asChild variant="secondary">
                <Link to="/projects" className="inline-flex items-center">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter(p => p.featured)
                .slice(0, 3)
                .map(project => (
                  <div key={project.id} className="group rounded-lg border bg-card shadow-sm hover:shadow-md">
                    <div className="p-6 flex flex-col h-full">
                      {/* Featured label */}
                      <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary mb-4 self-start">
                        Featured
                      </div>
                      {/* Make the project title a clickable Link */}
                      <Link to={`/projects/${project.id}`}>
                        <h3 className="text-xl font-bold mb-2 hover:text-primary">{project.title}</h3>
                      </Link>
                      <p className="text-muted-foreground text-sm flex-grow">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <div key={tag} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                            {tag}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-1 h-3 w-3" />
                            Code
                          </a>
                        </Button>
                        {project.demoUrl && (
                          <Button size="sm" asChild>
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </div>
  );
}

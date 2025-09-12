import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { ContactModal } from "@/components/contact-modal";
import { Link } from "react-router-dom";
import {
  loadBlogPosts,
  loadProjects,
  loadPublications,
} from "@/utils/content-loader";
import { PublicationCard } from "@/components/publication-card";
import { LoadingDots } from "../components/ui/LoadingDots";
import { delay } from "../utils/delay";
import { BlogPostCard } from "@/components/blog-post-card";
import { ProfileSlideshow } from "@/components/ProfileSlideshow";

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
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const featuredPublications = publications
    .filter((publication: any) => publication.featured)
    .slice(0, 2);

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
              <h2 className="text-2xl font-semibold">
                Crafting digital experiences...
              </h2>
              <p className="text-muted-foreground">
                Loading the portfolio with passion, creativity, and a touch of
                magic
              </p>
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
                  Researcher, Developer, Writer
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Hey there, I see you’ve stumbled across my portfolio. Since
                  you’re here, I’m Ayush. I’m a software engineer who likes
                  building backend systems that actually hold up under pressure:
                  scalable, resilient, and clean. I’ve got a bias for
                  minimalism, so I keep things simple and straightforward
                  wherever I can. Most of the time I’m experimenting with new
                  tech, hacking together projects, or diving deep into cloud
                  infrastructure and distributed systems. I’m also trying to
                  pick up some guitar skills (slowly but surely), and when I
                  need a break, fictional story-driven games have me hooked.
                  Uncharted in particular — man, that’s some serious
                  storytelling and adventure.
                </p>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
                  Pretty much always down to chat about code, cloud
                  architectures, or why AI is either going to save us all or
                  make us completely obsolete — haven’t decided which yet! What
                  brings you here?
                </p>
              </div>
              <br />
              <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild className="inline-flex items-center">
                  <a
                    href="https://github.com/roguepikachu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub Profile
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href="https://www.linkedin.com/in/cs-ayush-kumar/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setContactModalOpen(true)}
                >
                  Contact Me
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ProfileSlideshow />
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
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Recent Blog Posts
                </h2>
                <p className="text-muted-foreground">
                  Thoughts, ideas, and tutorials
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link to="/blog" className="inline-flex items-center">
                  View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
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
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Featured Publications
                </h2>
                <p className="text-muted-foreground">
                  Academic papers and research articles
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link to="/publications" className="inline-flex items-center">
                  View All Publications <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPublications.map((publication) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* My Talks Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">
              My Talks & Presentations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sharing knowledge and insights with the community through talks, workshops, and presentations
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            {/* Video Embed */}
            <div className="group">
              <div className="relative overflow-hidden rounded-xl border shadow-lg bg-card hover:shadow-xl transition-all duration-300">
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/MOkPoKh0-hA?si=DSxFyJUbzf3PMt9g" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    className="rounded-t-xl"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Featured Talk</h3>
                  <p className="text-muted-foreground text-sm">
                    Deep dive into modern development practices and cloud architecture
                  </p>
                </div>
              </div>
            </div>

            {/* Meetup Event */}
            <div className="space-y-6">
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl border bg-card shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                  <div className="absolute top-4 right-4">
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Live Event
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Collabnix Meetup</h3>
                        <p className="text-muted-foreground text-sm">Community Event</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">
                      Engaged with the developer community to share insights on scalable systems, 
                      cloud architecture, and modern development practices.
                    </p>
                    
                    <Button asChild variant="outline" className="w-full">
                      <a 
                        href="https://www.meetup.com/collabnix/events/300163572/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center"
                      >
                        View Event Details <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Additional Talk Placeholder */}
              <div className="relative overflow-hidden rounded-xl border bg-card/50 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">More Talks Coming Soon</h3>
                  <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                    Coming Soon
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  Stay tuned for upcoming presentations and workshop sessions on 
                  distributed systems, AI/ML implementations, and cloud-native architectures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section - Conditional based on sectionConfig */}
      {sectionConfig.projects && (
        <section className="bg-muted/50 py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Featured Projects
                </h2>
                <p className="text-muted-foreground">
                  Check out some of my latest work
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link to="/projects" className="inline-flex items-center">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.featured)
                .slice(0, 3)
                .map((project) => (
                  <div
                    key={project.id}
                    className="group rounded-lg border bg-card shadow-sm hover:shadow-md"
                  >
                    <div className="p-6 flex flex-col h-full">
                      {/* Featured label */}
                      <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary mb-4 self-start">
                        Featured
                      </div>
                      {/* Make the project title a clickable Link */}
                      <Link to={`/projects/${project.id}`}>
                        <h3 className="text-xl font-bold mb-2 hover:text-primary">
                          {project.title}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-sm flex-grow">
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
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-1 h-3 w-3" />
                            Code
                          </a>
                        </Button>
                        {project.demoUrl && (
                          <Button size="sm" asChild>
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
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

      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </div>
  );
}

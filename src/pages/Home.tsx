import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, ArrowRight, Sparkles, Loader2, Play } from "lucide-react";
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
import { siteConfig } from "@/config";
import { homeStyles } from "./home.styles";

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
      <div className={homeStyles.loading.container}>
        <div className={homeStyles.loading.wrapper}>
          <div className={homeStyles.loading.content}>
            <div className={homeStyles.loading.iconWrapper}>
              <Sparkles className={homeStyles.loading.icon} />
            </div>
            <div className={homeStyles.loading.textWrapper}>
              <h2 className={homeStyles.loading.title}>
                {siteConfig.loading.home.title}
              </h2>
              <p className={homeStyles.loading.message}>
                {siteConfig.loading.home.message}
              </p>
            </div>
            <LoadingDots size="md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={homeStyles.main}>
      {/* Hero Section */}
      <section className={homeStyles.hero.section}>
        <div className={homeStyles.hero.container}>
          <div className={homeStyles.hero.grid}>
            <div className={homeStyles.hero.content}>
              <div className={homeStyles.hero.textWrapper}>
                <h1 className={homeStyles.hero.title}>
                  {siteConfig.personal.role}
                </h1>
                <p className={homeStyles.hero.bio}>
                  {siteConfig.personal.fullBio}
                </p>
              </div>
              <br />
              <div className={homeStyles.hero.buttons}>
                <Button asChild className={homeStyles.hero.button}>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className={homeStyles.hero.buttonIcon} />
                    {siteConfig.ui.buttons.githubProfile}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className={homeStyles.hero.buttonIcon} />
                    {siteConfig.ui.buttons.linkedin}
                  </a>
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setContactModalOpen(true)}
                >
                  {siteConfig.ui.buttons.contactMe}
                </Button>
              </div>
            </div>
            <div className={homeStyles.hero.imageWrapper}>
              <ProfileSlideshow />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className={homeStyles.hero.decorativeBg}></div>
      </section>

      {/* My Talks Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">
              {siteConfig.sections.talks.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {siteConfig.sections.talks.description}
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            {/* Featured Talk */}
            <div className="space-y-6">
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl border bg-card shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                  <div className="absolute top-4 right-4">
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Featured
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{siteConfig.sections.featuredTalk.title}</h3>
                        <p className="text-muted-foreground text-sm">{siteConfig.sections.featuredTalk.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={siteConfig.external.featuredVideoUrl} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Meetup Event */}
            <div className="space-y-6">
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl border bg-card shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                  <div className="absolute top-4 right-4">
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {siteConfig.ui.badges.liveEvent}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{siteConfig.sections.collabnixMeetup.title}</h3>
                        <p className="text-muted-foreground text-sm">{siteConfig.sections.collabnixMeetup.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">
                      {siteConfig.sections.collabnixMeetup.description}
                    </p>
                    
                    <Button asChild variant="outline" className="w-full">
                      <a 
                        href={siteConfig.external.meetupEventUrl} 
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

      {/* Blog Posts Section */}
      {sectionConfig.blog && (
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {siteConfig.sections.recentPosts.title}
                </h2>
                <p className="text-muted-foreground">
                  Thoughts, ideas, and tutorials
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link to="/blog" className="inline-flex items-center">
                  {siteConfig.sections.recentPosts.viewAllText} <ArrowRight className="ml-2 h-4 w-4" />
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
                  {siteConfig.sections.featuredPublications.title}
                </h2>
                <p className="text-muted-foreground">
                  Academic papers and research articles
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link to="/publications" className="inline-flex items-center">
                  {siteConfig.sections.featuredPublications.viewAllText} <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* Featured Projects Section - Conditional based on sectionConfig */}
      {sectionConfig.projects && (
        <section className="bg-muted/50 py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {siteConfig.sections.featuredProjects.title}
                </h2>
                <p className="text-muted-foreground">
                  {siteConfig.sections.featuredProjects.description}
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link to="/projects" className="inline-flex items-center">
                  {siteConfig.sections.featuredProjects.viewAllText} <ArrowRight className="ml-2 h-4 w-4" />
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
                        {siteConfig.ui.badges.featured}
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
                            {siteConfig.ui.buttons.code}
                          </a>
                        </Button>
                        {project.demoUrl && (
                          <Button size="sm" asChild>
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {siteConfig.ui.buttons.liveDemo}
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

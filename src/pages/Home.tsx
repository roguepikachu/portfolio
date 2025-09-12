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
import styles from "./Home.module.css";

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
      <div className={styles.loadingContainer}>
        <div className={styles.loadingWrapper}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingIconWrapper}>
              <Sparkles className={styles.loadingIcon} />
            </div>
            <div className={styles.loadingTextWrapper}>
              <h2 className={styles.loadingTitle}>
                {siteConfig.loading.home.title}
              </h2>
              <p className={styles.loadingMessage}>
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
    <div className={styles.mainContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroTextWrapper}>
                <h1 className={styles.heroTitle}>
                  {siteConfig.personal.role}
                </h1>
                <p className={styles.heroBio}>
                  {siteConfig.personal.fullBio}
                </p>
              </div>
              <br />
              <div className={styles.heroButtons}>
                <Button asChild className={styles.heroButton}>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    {siteConfig.ui.buttons.githubProfile}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
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
            <div className={styles.heroImageWrapper}>
              <ProfileSlideshow />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(var(--primary-rgb),0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
      </section>

      {/* My Talks Section */}
      <section className={styles.talksSection}>
        <div className={styles.talksContainer}>
          <div className={styles.talksHeader}>
            <h2 className={styles.talksTitle}>
              {siteConfig.sections.talks.title}
            </h2>
            <p className={styles.talksDescription}>
              {siteConfig.sections.talks.description}
            </p>
          </div>
          
          <div className={styles.talksGrid}>
            {/* Featured Talk */}
            <div className={styles.talksColumn}>
              <div className={styles.talkCard}>
                <div className={styles.talkCardInner}>
                  <div className={styles.talkBadgeWrapper}>
                    <div className={styles.talkBadge}>
                      Featured
                    </div>
                  </div>
                  
                  <div className={styles.talkContent}>
                    <div className={styles.talkHeader}>
                      <div className={styles.talkIconCircle}>
                        <Play className={styles.talkIcon} />
                      </div>
                      <div>
                        <h3 className={styles.talkTitle}>{siteConfig.sections.featuredTalk.title}</h3>
                        <p className={styles.talkSubtitle}>{siteConfig.sections.featuredTalk.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className={styles.videoWrapper}>
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={siteConfig.external.featuredVideoUrl} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                        className={styles.videoIframe}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Meetup Event */}
            <div className={styles.talksColumn}>
              <div className={styles.talkCard}>
                <div className={styles.talkCardInner}>
                  <div className={styles.talkBadgeWrapper}>
                    <div className={styles.talkBadge}>
                      {siteConfig.ui.badges.liveEvent}
                    </div>
                  </div>
                  
                  <div className={styles.talkContent}>
                    <div className={styles.talkHeader}>
                      <div className={styles.talkIconCircle}>
                        <Sparkles className={styles.talkIcon} />
                      </div>
                      <div>
                        <h3 className={styles.talkTitle}>{siteConfig.sections.collabnixMeetup.title}</h3>
                        <p className={styles.talkSubtitle}>{siteConfig.sections.collabnixMeetup.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className={styles.talkDescription}>
                      {siteConfig.sections.collabnixMeetup.description}
                    </p>
                    
                    <Button asChild variant="outline" className={styles.eventButton}>
                      <a 
                        href={siteConfig.external.meetupEventUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.eventButtonInner}
                      >
                        View Event Details <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Additional Talk Placeholder */}
              <div className={styles.comingSoonCard}>
                <div className={styles.comingSoonHeader}>
                  <h3 className={styles.comingSoonTitle}>More Talks Coming Soon</h3>
                  <div className={styles.comingSoonBadge}>
                    Coming Soon
                  </div>
                </div>
                <p className={styles.comingSoonText}>
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
        <section className={styles.blogSection}>
          <div className={styles.talksContainer}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>
                  {siteConfig.sections.recentPosts.title}
                </h2>
                <p className={styles.sectionDescription}>
                  Thoughts, ideas, and tutorials
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link to="/blog" className="inline-flex items-center">
                  {siteConfig.sections.recentPosts.viewAllText} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className={styles.blogGrid}>
              {posts.slice(0, 3).map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Publications Section - Conditional based on sectionConfig */}
      {sectionConfig.publications && (
        <section className={styles.publicationsSection}>
          <div className={styles.talksContainer}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>
                  {siteConfig.sections.featuredPublications.title}
                </h2>
                <p className={styles.sectionDescription}>
                  Academic papers and research articles
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link to="/publications" className="inline-flex items-center">
                  {siteConfig.sections.featuredPublications.viewAllText} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className={styles.publicationsGrid}>
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
        <section className={styles.projectsSection}>
          <div className={styles.talksContainer}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>
                  {siteConfig.sections.featuredProjects.title}
                </h2>
                <p className={styles.sectionDescription}>
                  {siteConfig.sections.featuredProjects.description}
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link to="/projects" className="inline-flex items-center">
                  {siteConfig.sections.featuredProjects.viewAllText} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className={styles.projectsGrid}>
              {projects
                .filter((p) => p.featured)
                .slice(0, 3)
                .map((project) => (
                  <div
                    key={project.id}
                    className={styles.projectCard}
                  >
                    <div className={styles.projectCardInner}>
                      {/* Featured label */}
                      <div className={styles.projectBadge}>
                        {siteConfig.ui.badges.featured}
                      </div>
                      {/* Make the project title a clickable Link */}
                      <Link to={`/projects/${project.id}`}>
                        <h3 className={styles.projectTitle}>
                          {project.title}
                        </h3>
                      </Link>
                      <p className={styles.projectDescription}>
                        {project.description}
                      </p>
                      <div className={styles.projectTags}>
                        {project.tags.map((tag) => (
                          <div
                            key={tag}
                            className={styles.projectTag}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                      <div className={styles.projectActions}>
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

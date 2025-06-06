import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Search as SearchIcon } from "lucide-react";
import { ContactModal } from "./contact-modal";
import { sectionConfig } from "@/config/sectionConfig";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator
} from '@/components/ui/command';
import { useEffect } from 'react';
import { loadBlogPosts, loadProjects, loadPublications } from '@/utils/content-loader';

// Base navigation items
const baseNavItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects", configKey: "projects" },
  { name: "Publications", href: "/publications", configKey: "publications" },
  { name: "Blog", href: "/blog", configKey: "blog" },
  { name: "About", href: "/about" },
];

// Filter nav items based on section config
const navItems = baseNavItems.filter(item => 
  !item.configKey || sectionConfig[item.configKey as keyof typeof sectionConfig]
);

// Helper to get a snippet with highlighted match
function getSnippet(text: string, query: string) {
  if (!text || !query) return null;
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return null;
  const start = Math.max(0, idx - 30);
  const end = Math.min(text.length, idx + query.length + 30);
  const before = text.slice(start, idx);
  const match = text.slice(idx, idx + query.length);
  const after = text.slice(idx + query.length, end);
  return (
    <span className="block text-xs mt-1 text-muted-foreground">
      ...{before}
      <mark className="px-1 rounded bg-primary/20 text-primary dark:bg-primary/40 dark:text-primary font-semibold">{match}</mark>
      {after}...
    </span>
  );
}

export function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>({ posts: [], projects: [], publications: [] });
  const [loading, setLoading] = useState(false);
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  // Check if we're on the Home or About page to hide the contact button
  const hideContactButton = location.pathname === "/" || location.pathname === "/about";

  // Load all content for search
  useEffect(() => {
    if (!searchOpen) return;
    setLoading(true);
    Promise.all([
      loadBlogPosts(),
      loadProjects(),
      loadPublications()
    ]).then(([posts, projects, publications]) => {
      setSearchResults({ posts, projects, publications });
      setLoading(false);
    });
  }, [searchOpen]);

  // Filtered results
  const filteredPosts = searchQuery
    ? searchResults.posts.filter((p: any) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.tags && p.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (p.content && p.content.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];
  const filteredProjects = searchQuery
    ? searchResults.projects.filter((p: any) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.tags && p.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (p.readme && p.readme.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];
  const filteredPublications = searchQuery
    ? searchResults.publications.filter((p: any) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.summary && p.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.tags && p.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (p.content && p.content.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight">Ayush Kumar</span>
            </Link>
            <nav className="hidden md:flex md:gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "animated-underline text-sm font-medium transition-colors hover:text-foreground/80",
                    isActiveRoute(item.href)
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Search site">
              <SearchIcon className="h-5 w-5" />
            </Button>
            {!hideContactButton && (
              <div className="hidden md:block">
                <Button onClick={() => setContactModalOpen(true)}>
                  Contact
                </Button>
              </div>
            )}
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-xs">
                <div className="flex flex-col gap-6 pt-6">
                  <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                      <span className="text-xl font-bold">Ayush Kumar</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <div className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          "text-foreground/60 hover:text-foreground text-sm font-medium transition-colors",
                          isActiveRoute(item.href) && "text-foreground"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {!hideContactButton && (
                      <Button 
                        className="w-full mt-4" 
                        onClick={() => {
                          setContactModalOpen(true);
                          setMobileMenuOpen(false);
                        }}
                      >
                        Contact
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput
          placeholder="Search blog posts, projects, publications..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          autoFocus
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Blog Posts">
            {filteredPosts.map((post: any) => {
              let snippet = null;
              if (searchQuery && post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase())) {
                snippet = getSnippet(post.content, searchQuery);
              } else if (searchQuery && post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) {
                snippet = getSnippet(post.excerpt, searchQuery);
              }
              return (
                <CommandItem
                  key={post.id}
                  onSelect={() => {
                    setSearchOpen(false);
                    navigate(`/blog/${post.id}`);
                  }}
                >
                  <div>
                    <span className="font-medium">{post.title}</span>
                    <span className="ml-2 text-xs text-muted-foreground">Blog</span>
                    {snippet}
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {filteredProjects.map((project: any) => {
              let snippet = null;
              if (searchQuery && project.readme && project.readme.toLowerCase().includes(searchQuery.toLowerCase())) {
                snippet = getSnippet(project.readme, searchQuery);
              } else if (searchQuery && project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                snippet = getSnippet(project.description, searchQuery);
              }
              return (
                <CommandItem
                  key={project.id}
                  onSelect={() => {
                    setSearchOpen(false);
                    navigate(`/projects/${project.id}`);
                  }}
                >
                  <div>
                    <span className="font-medium">{project.title}</span>
                    <span className="ml-2 text-xs text-muted-foreground">Project</span>
                    {snippet}
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Publications">
            {filteredPublications.map((pub: any) => {
              let snippet = null;
              if (searchQuery && pub.content && pub.content.toLowerCase().includes(searchQuery.toLowerCase())) {
                snippet = getSnippet(pub.content, searchQuery);
              } else if (searchQuery && pub.summary && pub.summary.toLowerCase().includes(searchQuery.toLowerCase())) {
                snippet = getSnippet(pub.summary, searchQuery);
              }
              return (
                <CommandItem
                  key={pub.id}
                  onSelect={() => {
                    setSearchOpen(false);
                    navigate(`/publications/${pub.id}`);
                  }}
                >
                  <div>
                    <span className="font-medium">{pub.title}</span>
                    <span className="ml-2 text-xs text-muted-foreground">Publication</span>
                    {snippet}
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </>
  );
}

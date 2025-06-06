import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Search } from "lucide-react";
import { ContactModal } from "./contact-modal";
import { sectionConfig } from "@/config/sectionConfig";
import { AuthButton } from "./auth/AuthButton";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator
} from '@/components/ui/command';
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

// Custom styles for a beautiful, floating, minimal search experience
// - Modal background is transparent
// - Search bar is long, centered, pill-shaped, with soft shadow
// - Dropdown is a floating, rounded, minimal card below the bar
// - All colors are theme-aware

// Custom minimal search bar for empty state
function MinimalSearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="relative w-full max-w-2xl mx-auto">
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary">
          <Search className="h-6 w-6" />
        </span>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Search blog posts, projects, publications..."
          className="w-full pl-14 pr-4 py-5 rounded-full border-none bg-background/90 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all shadow-xl placeholder:text-muted-foreground"
          autoFocus
          style={{ boxShadow: '0 6px 32px 0 rgb(0 0 0 / 0.10)' }}
        />
      </div>
    </div>
  );
}

// Custom CommandList wrapper for beautiful dropdown
function PrettyCommandList({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-2xl mt-2 rounded-2xl bg-background/95 shadow-2xl border border-border overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>({ posts: [], projects: [], publications: [] });
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  // Check if we're on the Home or About page to hide the contact button
  const hideContactButton = location.pathname === "/" || location.pathname === "/about";

  // Load all content for search (on mount)
  useEffect(() => {
    setLoading(true);
    Promise.all([
      loadBlogPosts(),
      loadProjects(),
      loadPublications()
    ]).then(([posts, projects, publications]) => {
      setSearchResults({ posts, projects, publications });
      setLoading(false);
    });
  }, []);

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

  // Dropdown open/close logic
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchQuery]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
          <div className="flex items-center gap-2 w-full max-w-xl mx-4">
            <div className="relative w-full">
              {location.pathname === "/" && (
                <>
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-primary">
                    <Search className="h-5 w-5" />
                  </span>
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search blog posts, projects, publications..."
                    className="w-full pl-12 pr-4 py-2 rounded-full border border-border bg-background text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all shadow placeholder:text-muted-foreground"
                    onFocus={() => searchQuery && setShowDropdown(true)}
                  />
                  {showDropdown && (
                    <div
                      ref={dropdownRef}
                      className="absolute left-0 right-0 mt-2 z-50 rounded-2xl bg-background/95 shadow-2xl border border-border overflow-hidden"
                    >
                      <div className="max-h-96 overflow-y-auto">
                        {filteredPosts.length === 0 && filteredProjects.length === 0 && filteredPublications.length === 0 ? (
                          <div className="p-6 text-center text-muted-foreground">No results found.</div>
                        ) : (
                          <>
                            {filteredPosts.length > 0 && (
                              <div>
                                <div className="px-6 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase">Blog Posts</div>
                                {filteredPosts.map((post: any) => {
                                  let snippet = null;
                                  if (searchQuery && post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase())) {
                                    snippet = getSnippet(post.content, searchQuery);
                                  } else if (searchQuery && post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) {
                                    snippet = getSnippet(post.excerpt, searchQuery);
                                  }
                                  return (
                                    <button
                                      key={post.id}
                                      className="w-full text-left px-6 py-3 hover:bg-accent/40 transition-colors"
                                      onClick={() => {
                                        setShowDropdown(false);
                                        setSearchQuery('');
                                        navigate(`/blog/${post.id}`);
                                      }}
                                    >
                                      <div>
                                        <span className="font-medium">{post.title}</span>
                                        <span className="ml-2 text-xs text-muted-foreground">Blog Post</span>
                                        {snippet}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                            {filteredProjects.length > 0 && (
                              <div>
                                <div className="px-6 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase">Projects</div>
                                {filteredProjects.map((project: any) => {
                                  let snippet = null;
                                  if (searchQuery && project.content && project.content.toLowerCase().includes(searchQuery.toLowerCase())) {
                                    snippet = getSnippet(project.content, searchQuery);
                                  } else if (searchQuery && project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                                    snippet = getSnippet(project.description, searchQuery);
                                  }
                                  return (
                                    <button
                                      key={project.id}
                                      className="w-full text-left px-6 py-3 hover:bg-accent/40 transition-colors"
                                      onClick={() => {
                                        setShowDropdown(false);
                                        setSearchQuery('');
                                        navigate(`/projects/${project.id}`);
                                      }}
                                    >
                                      <div>
                                        <span className="font-medium">{project.title}</span>
                                        <span className="ml-2 text-xs text-muted-foreground">Project</span>
                                        {snippet}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                            {filteredPublications.length > 0 && (
                              <div>
                                <div className="px-6 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase">Publications</div>
                                {filteredPublications.map((pub: any) => {
                                  let snippet = null;
                                  if (searchQuery && pub.content && pub.content.toLowerCase().includes(searchQuery.toLowerCase())) {
                                    snippet = getSnippet(pub.content, searchQuery);
                                  } else if (searchQuery && pub.summary && pub.summary.toLowerCase().includes(searchQuery.toLowerCase())) {
                                    snippet = getSnippet(pub.summary, searchQuery);
                                  }
                                  return (
                                    <button
                                      key={pub.id}
                                      className="w-full text-left px-6 py-3 hover:bg-accent/40 transition-colors"
                                      onClick={() => {
                                        setShowDropdown(false);
                                        setSearchQuery('');
                                        navigate(`/publications/${pub.id}`);
                                      }}
                                    >
                                      <div>
                                        <span className="font-medium">{pub.title}</span>
                                        <span className="ml-2 text-xs text-muted-foreground">Publication</span>
                                        {snippet}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <AuthButton currentUser={currentUser} onUserChange={setCurrentUser} />
              {!hideContactButton && (
                <div className="hidden md:block">
                  <Button onClick={() => setContactModalOpen(true)}>
                    Contact
                  </Button>
                </div>
              )}
            </div>
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
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </>
  );
}

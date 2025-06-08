import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogPostCard } from "@/components/blog-post-card";
import { loadBlogPosts } from "@/utils/content-loader";
import { BlogPost } from "@/types/blog";
import { Search, X, BookOpen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingDots } from '../components/ui/LoadingDots';
import { delay } from '../utils/delay';
import { Link } from "react-router-dom";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await loadBlogPosts();
        setBlogPosts(posts);
        await delay(); // Use default delay
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, []);
  
  // Extract unique tags from all blog posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [blogPosts]);
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => post.tags.includes(tag));

    return matchesSearch && matchesTags;
  });
  
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      // First sort by featured status (featured items first)
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then sort by date (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [filteredPosts]);
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagSelect = (value: string) => {
    if (value === "all") {
      setSelectedTags([]);
    } else {
      toggleTag(value);
    }
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  if (loading) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <BookOpen className="h-16 w-16 text-primary animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Loading amazing content...</h2>
              <p className="text-muted-foreground">Just a moment while we fetch the latest blog posts</p>
            </div>
            <LoadingDots size="md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blog</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Sharing ideas, insights, and lessons learned from navigating the tech world.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
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
                  <Badge key={tag} variant="default" className="cursor-pointer" onClick={() => toggleTag(tag)}>
                    {tag}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Blog posts grid */}
        <div className="mt-12">
          {sortedPosts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {sortedPosts.map(post => (
                <div key={post.id} className="h-full">
                  <BlogPostCard post={post} className="h-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No posts found matching your criteria.</p>
              <Button variant="link" onClick={clearFilters} className="mt-2">
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

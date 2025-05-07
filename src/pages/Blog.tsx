
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogPostCard } from "@/components/blog-post-card";
import { blogPosts } from "@/data/blog-posts";
import { Search, X, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  
  // Extract unique tags from all blog posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);
  
  // Filter and sort posts based on search query, selected tags, and pinned status
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      // Search filter
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Tag filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => post.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);
  
  // Sort posts: pinned first, then by date (newest first)
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [filteredPosts]);
  
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
    if (value === "all") {
      setSelectedTags([]);
    } else {
      toggleTag(value);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blog</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Thoughts, insights, and technical guides on web development
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="mt-8 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Filter by tag</h3>
              {selectedTags.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs hover:bg-transparent hover:underline"
                  onClick={() => setSelectedTags([])}
                >
                  Clear ({selectedTags.length})
                </Button>
              )}
            </div>
            
            {/* Tag dropdown */}
            <div className="mt-2">
              <Select onValueChange={handleTagSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a tag to filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Tags</SelectItem>
                    {allTags.map(tag => (
                      <SelectItem key={tag} value={tag}>
                        {tag} {selectedTags.includes(tag) && "✓"}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Selected tags */}
            {selectedTags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
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
            )}
          </div>
        </div>
        
        {/* Blog posts grid */}
        <div className="mt-12 space-y-10">
          {sortedPosts.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                {sortedPosts.map(post => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No posts found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={clearFilters}
                className="mt-2"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

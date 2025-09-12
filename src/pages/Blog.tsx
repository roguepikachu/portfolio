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
import styles from './Blog.module.css';

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
      <div className={`container ${styles.loadingContainer}`}>
        <div className={styles.loadingWrapper}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingIconWrapper}>
              <BookOpen className={styles.loadingIcon} />
            </div>
            <div className={styles.loadingTextWrapper}>
              <h2 className={styles.loadingTitle}>Loading amazing content...</h2>
              <p className={styles.loadingMessage}>Just a moment while we fetch the latest blog posts</p>
            </div>
            <LoadingDots size="md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.wrapper}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>
            Sharing ideas, insights, and lessons learned from navigating the tech world.
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filtersSection}>
          <div className={styles.filtersRow}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} />
              <Input
                type="search"
                placeholder="Search posts..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={styles.clearButton}
                  onClick={() => setSearchQuery('')}
                >
                  <X className={styles.clearIcon} />
                  <span className={styles.screenReaderOnly}>Clear search</span>
                </Button>
              )}
            </div>
            <div className={styles.selectWrapper}>
              <div className={styles.selectHeader}>
                <h3 className={styles.selectTitle}>Filter by tag</h3>
                {selectedTags.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className={styles.clearButtonSmall}
                    onClick={() => setSelectedTags([])}
                  >
                    Clear ({selectedTags.length})
                  </Button>
                )}
              </div>
              <Select onValueChange={handleTagSelect}>
                <SelectTrigger className={styles.selectTrigger}>
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
              <div className={styles.selectedTagsHeader}>
                <h3 className={styles.selectedTagsTitle}>Selected tags</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className={styles.selectedTagsClear}
                  onClick={() => setSelectedTags([])}
                >
                  Clear ({selectedTags.length})
                </Button>
              </div>
              <div className={styles.selectedTagsContainer}>
                {selectedTags.map(tag => (
                  <Badge key={tag} variant="default" className={styles.selectedTag} onClick={() => toggleTag(tag)}>
                    {tag}
                    <X className={styles.selectedTagIcon} />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Blog posts grid */}
        <div className={styles.postsSection}>
          {sortedPosts.length > 0 ? (
            <div className={styles.postsGrid}>
              {sortedPosts.map(post => (
                <div key={post.id} className={styles.postWrapper}>
                  <BlogPostCard post={post} className={styles.postCard} />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <p className={styles.noResultsText}>No posts found matching your criteria.</p>
              <Button variant="link" onClick={clearFilters} className={styles.clearFiltersButton}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

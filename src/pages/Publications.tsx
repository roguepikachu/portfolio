
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { publications } from "@/data/publications-data";
import { PublicationCard } from "@/components/publication-card";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Publications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay for markdown files
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Extract unique tags from all publications
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    publications.forEach(pub => {
      pub.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);
  
  // Extract unique years from all publications
  const allYears = useMemo(() => {
    const years = new Set<string>();
    publications.forEach(pub => {
      const year = new Date(pub.date).getFullYear().toString();
      years.add(year);
    });
    return Array.from(years).sort((a, b) => b.localeCompare(a)); // Sort descending
  }, []);
  
  // Filter publications based on search query, selected tags, and selected year
  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      // Search filter
      const matchesSearch = !searchQuery || 
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        pub.summary.toLowerCase().includes(searchQuery.toLowerCase()) || 
        pub.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Tag filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => pub.tags.includes(tag));
      
      // Year filter
      const pubYear = new Date(pub.date).getFullYear().toString();
      const matchesYear = !selectedYear || pubYear === selectedYear;
      
      return matchesSearch && matchesTags && matchesYear;
    });
  }, [searchQuery, selectedTags, selectedYear]);
  
  // Sort publications by date (newest first)
  const sortedPublications = useMemo(() => {
    return [...filteredPublications].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [filteredPublications]);
  
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

  // Handle year selection
  const handleYearSelect = (value: string) => {
    if (value === "all") {
      setSelectedYear(null);
    } else {
      setSelectedYear(value);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedYear(null);
  };

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Publications</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Academic papers, articles, and research publications
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="mt-8 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search publications..."
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
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Tags filter */}
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
              
              {/* Tags dropdown */}
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
            
            {/* Years filter */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Filter by year</h3>
                {selectedYear && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs hover:bg-transparent hover:underline"
                    onClick={() => setSelectedYear(null)}
                  >
                    Clear
                  </Button>
                )}
              </div>
              
              {/* Year dropdown */}
              <div className="mt-2">
                <Select onValueChange={handleYearSelect} value={selectedYear || "all"}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {allYears.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Publications grid */}
        <div className="mt-12">
          {isLoading ? (
            // Skeleton loading state
            <div className="grid gap-6 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-lg border bg-card p-6">
                  <div className="loading-placeholder h-6 w-3/4 rounded mb-4"></div>
                  <div className="loading-placeholder h-4 w-full rounded mb-3"></div>
                  <div className="loading-placeholder h-4 w-5/6 rounded mb-6"></div>
                  <div className="flex gap-2">
                    <div className="loading-placeholder h-5 w-16 rounded"></div>
                    <div className="loading-placeholder h-5 w-16 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedPublications.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {sortedPublications.map(publication => (
                <PublicationCard key={publication.id} publication={publication} showFullSummary />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No publications found matching your criteria.</p>
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

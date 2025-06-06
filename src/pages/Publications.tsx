import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { loadPublications } from '@/utils/content-loader';
import { PublicationCard } from '@/components/publication-card';
import { ScrollText, Search, X } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingDots } from '../components/ui/LoadingDots';
import { delay } from '../utils/delay';
import { Link } from 'react-router-dom';
import { FileText, ExternalLink } from 'lucide-react';

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // Fetch publications on component mount
  useEffect(() => {
    const fetchPubs = async () => {
      try {
        const publications = await loadPublications();
        setPublications(publications);
        await delay(); // Use default delay
      } catch (error) {
        console.error('Error loading publications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPubs();
  }, []);

  // Extract unique tags from all publications
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    publications.forEach(pub => {
      pub.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [publications]);

  // Extract unique years from all publications
  const allYears = useMemo(() => {
    const years = new Set<string>();
    publications.forEach(pub => {
      const year = new Date(pub.date).getFullYear().toString();
      years.add(year);
    });
    return Array.from(years).sort((a, b) => b.localeCompare(a)); // Sort descending
  }, [publications]);

  // Filter publications based on search query, selected tags, and selected year
  const filteredPublications = publications.filter(publication => {
    const matchesSearch =
      !searchQuery ||
      publication.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      publication.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (publication.content && publication.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      publication.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => publication.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  // Sort publications by date (newest first)
  const sortedPublications = useMemo(() => {
    return [...filteredPublications].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
    if (value === 'all') {
      setSelectedTags([]);
    } else {
      toggleTag(value);
    }
  };

  // Handle year selection
  const handleYearSelect = (value: string) => {
    if (value === 'all') {
      setSelectedYear(null);
    } else {
      setSelectedYear(value);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedYear(null);
  };

  // Helper to strip markdown formatting
  function stripMarkdown(text: string) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
      .replace(/\*(.*?)\*/g, '$1')     // Italic
      .replace(/`(.*?)`/g, '$1')       // Code
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
      .replace(/#{1,6}\s/g, '')        // Headers
      .replace(/>\s(.*)/g, '$1')       // Blockquotes
      .replace(/\n/g, ' ')             // Newlines
      .replace(/\s+/g, ' ')            // Multiple spaces
      .trim();
  }

  // Helper to get a snippet with highlighted match
  function getSnippet(text: string, query: string) {
    if (!text || !query) return null;
    const plainText = stripMarkdown(text);
    const lower = plainText.toLowerCase();
    const idx = lower.indexOf(query.toLowerCase());
    if (idx === -1) return null;
    const start = Math.max(0, idx - 30);
    const end = Math.min(plainText.length, idx + query.length + 30);
    const before = plainText.slice(start, idx);
    const match = plainText.slice(idx, idx + query.length);
    const after = plainText.slice(idx + query.length, end);
    return (
      <span className="block text-xs mt-1 text-muted-foreground">
        ...{before}
        <mark className="px-1 rounded bg-primary/20 text-primary dark:bg-primary/40 dark:text-primary font-semibold">{match}</mark>
        {after}...
      </span>
    );
  }

  if (loading) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <ScrollText className="h-16 w-16 text-primary animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Curating knowledge...</h2>
              <p className="text-muted-foreground">Gathering the latest publications and research</p>
            </div>
            <LoadingDots size="md" />
          </div>
        </div>
      </div>
    );
  }

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
                          {tag} {selectedTags.includes(tag) && '✓'}
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
                    <Badge key={tag} variant="default" className="cursor-pointer" onClick={() => toggleTag(tag)}>
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
                <Select onValueChange={handleYearSelect} value={selectedYear || 'all'}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {allYears.map(year => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Publications grid */}
        <div className="mt-12">
          {sortedPublications.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {sortedPublications.map(publication => {
                let snippet = null;
                if (searchQuery) {
                  if (publication.content && publication.content.toLowerCase().includes(searchQuery.toLowerCase())) {
                    snippet = getSnippet(publication.content, searchQuery);
                  } else if (publication.summary.toLowerCase().includes(searchQuery.toLowerCase())) {
                    snippet = getSnippet(publication.summary, searchQuery);
                  }
                }
                return (
                  <div
                    key={publication.id}
                    className={`group overflow-hidden rounded-lg border bg-card hover:shadow-md ${
                      publication.featured ? 'ring-2 ring-primary/20' : ''
                    }`}
                  >
                    <div className="p-6 flex flex-col h-full">
                      {/* Featured label (or placeholder) above the title for alignment */}
                      {publication.featured ? (
                        <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary mb-4 self-start" style={{ minHeight: '24px' }}>
                          Featured
                        </div>
                      ) : (
                        <div className="mb-4" style={{ minHeight: '24px' }}></div>
                      )}
                      <Link to={`/publications/${publication.id}`}>
                        <h2 className="publication-title text-xl font-bold hover:text-primary">{publication.title}</h2>
                      </Link>
                      <p className="mt-2 text-muted-foreground text-sm flex-grow">{publication.summary}</p>
                      {snippet}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {publication.tags.map(tag => (
                          <div key={tag} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                            {tag}
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t flex items-center gap-3">
                        <Button size="sm" asChild>
                          <a href={publication.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Publication
                          </a>
                        </Button>
                        {publication.doiUrl && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={publication.doiUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 h-3 w-3" />
                              DOI
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No publications found matching your criteria.</p>
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

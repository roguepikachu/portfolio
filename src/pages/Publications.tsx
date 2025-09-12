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
import styles from './Publications.module.css';

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

    const matchesYear = !selectedYear || new Date(publication.date).getFullYear().toString() === selectedYear;

    return matchesSearch && matchesTags && matchesYear;
  });

  // Sort publications by featured status first, then by date (newest first)
  const sortedPublications = useMemo(() => {
    return [...filteredPublications].sort((a, b) => {
      // First sort by featured status (featured items first)
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then sort by date (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
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
      <span className={styles.snippetText}>
        ...{before}
        <mark className={styles.highlightMatch}>{match}</mark>
        {after}...
      </span>
    );
  }

  if (loading) {
    return (
      <div className={`container ${styles.loadingContainer}`}>
        <div className={styles.loadingWrapper}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingIconWrapper}>
              <ScrollText className={styles.loadingIcon} />
            </div>
            <div className={styles.loadingTextWrapper}>
              <h2 className={styles.loadingTitle}>Curating knowledge...</h2>
              <p className={styles.loadingMessage}>Gathering the latest publications and research</p>
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
          <h1 className={styles.title}>Publications</h1>
          <p className={styles.subtitle}>
            Academic papers, articles, and research publications
          </p>
        </div>

        {/* Search and filters */}
        <div className={styles.filtersSection}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <Input
              type="search"
              placeholder="Search publications..."
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

          <div className={styles.filtersGrid}>
            {/* Tags filter */}
            <div>
              <div className={styles.filterHeader}>
                <h3 className={styles.filterTitle}>Filter by tag</h3>
                {selectedTags.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className={styles.clearFilterButton}
                    onClick={() => setSelectedTags([])}
                  >
                    Clear ({selectedTags.length})
                  </Button>
                )}
              </div>

              {/* Tags dropdown */}
              <div className={styles.filterDropdown}>
                <Select onValueChange={handleTagSelect}>
                  <SelectTrigger className={styles.selectTrigger}>
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
                <div className={styles.selectedTagsContainer}>
                  {selectedTags.map(tag => (
                    <Badge key={tag} variant="default" className={styles.selectedTag} onClick={() => toggleTag(tag)}>
                      {tag}
                      <X className={styles.selectedTagIcon} />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Years filter */}
            <div>
              <div className={styles.filterHeader}>
                <h3 className={styles.filterTitle}>Filter by year</h3>
                {selectedYear && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className={styles.clearFilterButton}
                    onClick={() => setSelectedYear(null)}
                  >
                    Clear
                  </Button>
                )}
              </div>

              {/* Year dropdown */}
              <div className={styles.filterDropdown}>
                <Select onValueChange={handleYearSelect} value={selectedYear || 'all'}>
                  <SelectTrigger className={styles.selectTrigger}>
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
        <div className={styles.publicationsSection}>
          {sortedPublications.length > 0 ? (
            <div className={styles.publicationsGrid}>
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
                    className={publication.featured ? styles.publicationCardFeatured : styles.publicationCard}
                  >
                    <div className={styles.publicationCardInner}>
                      {/* Featured label (or placeholder) above the title for alignment */}
                      {publication.featured ? (
                        <div className={styles.featuredBadge} style={{ minHeight: '24px' }}>
                          Featured
                        </div>
                      ) : (
                        <div className={styles.featuredSpacer} style={{ minHeight: '24px' }}></div>
                      )}
                      <Link to={`/publications/${publication.id}`}>
                        <h2 className={styles.publicationTitle}>{publication.title}</h2>
                      </Link>
                      <p className={styles.publicationSummary}>{publication.summary}</p>
                      {snippet}
                      <div className={styles.publicationTags}>
                        {publication.tags.map(tag => (
                          <div key={tag} className={styles.publicationTag}>
                            {tag}
                          </div>
                        ))}
                      </div>
                      <div className={styles.publicationActions}>
                        <Button size="sm" asChild>
                          <a href={publication.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className={styles.actionIcon} />
                            View Publication
                          </a>
                        </Button>
                        {publication.doiUrl && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={publication.doiUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className={styles.actionIconSmall} />
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
            <div className={styles.noResults}>
              <p className={styles.noResultsText}>No publications found matching your criteria.</p>
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

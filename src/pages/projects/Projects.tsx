import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Github, Search, ExternalLink, Folder, Code2, Loader2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '@/types/project';
import { loadProjects } from '@/utils/content-loader';
import { LoadingDots } from '@/components/ui/LoadingDots';
import { delay } from '@/utils/delay';
import styles from './Projects.module.css';
import { siteConfig } from '@/config';
import badgeStyles from '@/styles/badges.module.css';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const loadProjectsData = async () => {
      try {
        const projectsData = await loadProjects();
        setProjects(projectsData);
        await delay(); // Use default delay
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjectsData();
  }, []);

  // Get unique tags from projects
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.readme && project.readme.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => project.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  // Sort projects by featured status first, then by date or alphabetically
  const sortedProjects = filteredProjects.sort((a, b) => {
    // First sort by featured status (featured items first)
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // Then sort alphabetically by title
    return a.title.localeCompare(b.title);
  });

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
              <Folder className={styles.loadingIcon} />
            </div>
            <div className={styles.loadingTextWrapper}>
              <h2 className={styles.loadingTitle}>Building something awesome...</h2>
              <p className={styles.loadingMessage}>Compiling the latest projects and innovations</p>
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
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>
            A collection of my personal and professional projects.
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filtersSection}>
          <div className={styles.filtersRow}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} />
              <Input
                type="search"
                placeholder="Search projects..."
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
                  <Badge
                    key={tag}
                    variant="default"
                    className={styles.selectedTag}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    <X className={styles.selectedTagIcon} />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project Grid */}
        <div className={styles.projectGrid}>
          {sortedProjects.map(project => {
            let snippet = null;
            if (searchQuery) {
              if (project.readme && project.readme.toLowerCase().includes(searchQuery.toLowerCase())) {
                snippet = getSnippet(project.readme, searchQuery);
              } else if (project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                snippet = getSnippet(project.description, searchQuery);
              }
            }
            return (
              <div
                key={project.id}
                className={project.featured ? styles.projectCardFeatured : styles.projectCard}
              >
                <div className={styles.projectCardInner}>
                  {/* Featured label (or placeholder) above the title for alignment */}
                  {project.featured ? (
                    <div className={`${badgeStyles.featuredDiv} ${styles.featuredBadge}`} style={{ minHeight: '24px' }}>
                      Featured
                    </div>
                  ) : (
                    <div className={styles.featuredSpacer} style={{ minHeight: '24px' }}></div>
                  )}
                  <Link to={`/projects/${project.id}`}>
                    <h2 className={styles.projectTitle}>{project.title}</h2>
                  </Link>
                  <p className={styles.projectDescription}>{project.description}</p>
                  {snippet}
                  <div className={styles.projectTags}>
                    {project.tags.map(tag => (
                      <div key={tag} className={styles.projectTag}>
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className={styles.projectActions}>
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className={styles.actionIcon} />
                        Code
                      </a>
                    </Button>
                    {project.demoUrl && (
                      <Button size="sm" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className={styles.actionIcon} />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className={styles.noResults}>
            <p className={styles.noResultsText}>No projects found matching your criteria.</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery('');
                setSelectedTags([]);
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

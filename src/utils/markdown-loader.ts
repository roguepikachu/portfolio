
import { BlogPost } from '@/types/blog';
import { Publication } from '@/types/publication';
import { Project } from '@/types/project';

// Import all markdown files from the content directories
const blogImports = import.meta.glob('../content/blog/*.md', { eager: true });
const publicationImports = import.meta.glob('../content/publications/*.md', { eager: true });
const projectImports = import.meta.glob('../content/projects/*.md', { eager: true });

// Helper function to validate date
function isValidDate(dateString: string): boolean {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

// Helper function to format date if needed
function formatDate(dateString: string): string {
  if (!dateString) return new Date().toISOString().split('T')[0]; // Default to today
  
  // If the date is already in YYYY-MM-DD format and valid, return it
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString) && isValidDate(dateString)) {
    return dateString;
  }
  
  // Try to parse different date formats
  const formats = [
    /(\d{4})-(\d{2})-(\d{2})/, // YYYY-MM-DD
    /(\d{2})\/(\d{2})\/(\d{4})/, // MM/DD/YYYY
    /(\d{2})-(\d{2})-(\d{4})/ // DD-MM-YYYY
  ];
  
  for (const format of formats) {
    if (format.test(dateString)) {
      const match = dateString.match(format);
      if (match) {
        if (format === formats[0]) return dateString; // Already YYYY-MM-DD
        if (format === formats[1]) return `${match[3]}-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`; // MM/DD/YYYY to YYYY-MM-DD
        if (format === formats[2]) return `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`; // DD-MM-YYYY to YYYY-MM-DD
      }
    }
  }
  
  // Try to create a date object directly
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  
  // If we can't parse it, return a fallback date
  console.warn(`Invalid date format: ${dateString}, using current date as fallback`);
  return new Date().toISOString().split('T')[0];
}

export function loadBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  
  try {
    for (const path in blogImports) {
      const file = blogImports[path] as any;
      
      if (file && file.attributes) {
        const formattedDate = formatDate(file.attributes.date);
        posts.push({
          id: file.attributes.id || path.split('/').pop()?.replace('.md', ''),
          title: file.attributes.title,
          date: formattedDate,
          excerpt: file.attributes.excerpt || '',
          tags: file.attributes.tags || [],
          content: file.html,
          pinned: file.attributes.pinned || false,
          release: file.attributes.release || false,
        });
      }
    }
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
  
  // Sort by date, newest first
  return posts.sort((a, b) => {
    try {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return isNaN(dateA) || isNaN(dateB) ? 0 : dateB - dateA;
    } catch (error) {
      console.error('Error sorting blog posts:', error);
      return 0;
    }
  });
}

export function loadPublications(): Publication[] {
  const publications: Publication[] = [];
  
  try {
    for (const path in publicationImports) {
      const file = publicationImports[path] as any;
      
      if (file && file.attributes) {
        const formattedDate = formatDate(file.attributes.date);
        publications.push({
          id: file.attributes.id || path.split('/').pop()?.replace('.md', ''),
          title: file.attributes.title,
          date: formattedDate,
          summary: file.attributes.summary || '',
          link: file.attributes.link || '',
          tags: file.attributes.tags || [],
          featured: file.attributes.featured || false,
          content: file.html,
        });
      }
    }
  } catch (error) {
    console.error('Error loading publications:', error);
  }
  
  // Sort by date, newest first
  return publications.sort((a, b) => {
    try {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return isNaN(dateA) || isNaN(dateB) ? 0 : dateB - dateA;
    } catch (error) {
      console.error('Error sorting publications:', error);
      return 0;
    }
  });
}

export function loadProjects(): Project[] {
  const projects: Project[] = [];
  
  try {
    for (const path in projectImports) {
      const file = projectImports[path] as any;
      
      if (file && file.attributes) {
        projects.push({
          id: file.attributes.id || path.split('/').pop()?.replace('.md', ''),
          title: file.attributes.title,
          description: file.attributes.description || '',
          tags: file.attributes.tags || [],
          githubUrl: file.attributes.githubUrl || '',
          demoUrl: file.attributes.demoUrl || '',
          image: file.attributes.image || '',
          featured: file.attributes.featured || false,
          readme: file.html,
        });
      }
    }
  } catch (error) {
    console.error('Error loading projects:', error);
  }
  
  return projects;
}

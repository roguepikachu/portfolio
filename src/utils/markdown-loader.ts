
import { BlogPost } from '@/types/blog';
import { Publication } from '@/types/publication';
import { Project } from '@/types/project';

// Import all markdown files from the content directories
const blogImports = import.meta.glob('../content/blog/*.md', { eager: true });
const publicationImports = import.meta.glob('../content/publications/*.md', { eager: true });
const projectImports = import.meta.glob('../content/projects/*.md', { eager: true });

// Helper function to validate date
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

// Helper function to format date if needed
function formatDate(dateString: string): string {
  if (!dateString) return new Date().toISOString().split('T')[0]; // Default to today
  
  if (isValidDate(dateString)) {
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
        if (format === formats[1]) return `${match[3]}-${match[1]}-${match[2]}`; // MM/DD/YYYY to YYYY-MM-DD
        if (format === formats[2]) return `${match[3]}-${match[2]}-${match[1]}`; // DD-MM-YYYY to YYYY-MM-DD
      }
    }
  }
  
  // If we can't parse it, return a fallback date
  return new Date().toISOString().split('T')[0];
}

export function loadBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  
  for (const path in blogImports) {
    const file = blogImports[path] as any;
    
    if (file && file.attributes) {
      posts.push({
        id: file.attributes.id || path.split('/').pop()?.replace('.md', ''),
        title: file.attributes.title,
        date: formatDate(file.attributes.date),
        excerpt: file.attributes.excerpt || '',
        tags: file.attributes.tags || [],
        content: file.html,
        pinned: file.attributes.pinned || false,
        release: file.attributes.release || false,
      });
    }
  }
  
  // Sort by date, newest first
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return isNaN(dateA) || isNaN(dateB) ? 0 : dateB - dateA;
  });
}

export function loadPublications(): Publication[] {
  const publications: Publication[] = [];
  
  for (const path in publicationImports) {
    const file = publicationImports[path] as any;
    
    if (file && file.attributes) {
      publications.push({
        id: file.attributes.id || path.split('/').pop()?.replace('.md', ''),
        title: file.attributes.title,
        date: formatDate(file.attributes.date),
        summary: file.attributes.summary || '',
        link: file.attributes.link || '',
        tags: file.attributes.tags || [],
        featured: file.attributes.featured || false,
        content: file.html,
      });
    }
  }
  
  // Sort by date, newest first
  return publications.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return isNaN(dateA) || isNaN(dateB) ? 0 : dateB - dateA;
  });
}

export function loadProjects(): Project[] {
  const projects: Project[] = [];
  
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
  
  return projects;
}

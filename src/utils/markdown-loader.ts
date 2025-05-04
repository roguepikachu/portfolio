
import { BlogPost } from '@/types/blog';
import { Publication } from '@/types/publication';
import { Project } from '@/types/project';

// Import all markdown files from the content directories
const blogImports = import.meta.glob('../content/blog/*.md', { eager: true });
const publicationImports = import.meta.glob('../content/publications/*.md', { eager: true });
const projectImports = import.meta.glob('../content/projects/*.md', { eager: true });

export function loadBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  
  for (const path in blogImports) {
    const file = blogImports[path] as any;
    
    if (file && file.attributes) {
      posts.push({
        id: file.attributes.id || path.split('/').pop()?.replace('.md', ''),
        title: file.attributes.title,
        date: file.attributes.date,
        excerpt: file.attributes.excerpt,
        tags: file.attributes.tags || [],
        content: file.html,
        pinned: file.attributes.pinned || false,
        release: file.attributes.release || false,
      });
    }
  }
  
  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function loadPublications(): Publication[] {
  const publications: Publication[] = [];
  
  for (const path in publicationImports) {
    const file = publicationImports[path] as any;
    
    if (file && file.attributes) {
      publications.push({
        id: file.attributes.id || path.split('/').pop()?.replace('.md', ''),
        title: file.attributes.title,
        date: file.attributes.date,
        summary: file.attributes.summary,
        link: file.attributes.link,
        tags: file.attributes.tags || [],
        featured: file.attributes.featured || false,
        content: file.html,
      });
    }
  }
  
  // Sort by date, newest first
  return publications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function loadProjects(): Project[] {
  const projects: Project[] = [];
  
  for (const path in projectImports) {
    const file = projectImports[path] as any;
    
    if (file && file.attributes) {
      projects.push({
        id: file.attributes.id || path.split('/').pop()?.replace('.md', ''),
        title: file.attributes.title,
        description: file.attributes.description,
        tags: file.attributes.tags || [],
        githubUrl: file.attributes.githubUrl,
        demoUrl: file.attributes.demoUrl,
        image: file.attributes.image,
        featured: file.attributes.featured || false,
        readme: file.html,
      });
    }
  }
  
  return projects;
}

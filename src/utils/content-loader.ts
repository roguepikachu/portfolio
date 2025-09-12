import { getSortedBlogs, getSortedProjects, getSortedPublications } from '@/config/content-registry';

interface FrontMatter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface ContentItem {
  frontMatter: FrontMatter;
  content: string;
}

export async function loadMarkdownFile(path: string): Promise<ContentItem | null> {
  try {
    const fullPath = `/portfolio/content${path}`;
    const response = await fetch(fullPath);
    if (!response.ok) {
      throw new Error(`Failed to load ${fullPath}`);
    }

    const text = await response.text();
    return parseMarkdown(text);
  } catch (error) {
    console.error(`Error loading markdown file ${path}:`, error);
    return null;
  }
}

export function parseMarkdown(content: string): ContentItem {
  // More robust regex that handles different line endings and spacing
  const frontMatterRegex = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    // Try alternative format without trailing newlines
    const altRegex = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*([\s\S]*)$/;
    const altMatch = content.match(altRegex);

    if (!altMatch) {
      console.log('No front matter found, treating entire content as markdown');
      return {
        frontMatter: {},
        content: content.trim(),
      };
    }

    return {
      frontMatter: parseFrontMatter(altMatch[1]),
      content: altMatch[2].trim(),
    };
  }

  const frontMatterText = match[1];
  const markdownContent = match[2];

  return {
    frontMatter: parseFrontMatter(frontMatterText),
    content: markdownContent.trim(),
  };
}

function parseFrontMatter(frontMatterText: string): FrontMatter {
  const frontMatter: FrontMatter = {};
  const lines = frontMatterText.split(/\r?\n/).filter(line => line.trim());

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim();

    if (!key || !value) continue;

    // Handle arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1);
      if (arrayContent.trim()) {
        frontMatter[key] = arrayContent.split(',').map(item => item.trim().replace(/['"]/g, ''));
      } else {
        frontMatter[key] = [];
      }
    }
    // Handle booleans
    else if (value === 'true' || value === 'false') {
      frontMatter[key] = value === 'true';
    }
    // Handle numbers
    else if (!isNaN(Number(value)) && value !== '') {
      frontMatter[key] = Number(value);
    }
    // Handle strings
    else {
      frontMatter[key] = value.replace(/^['"]|['"]$/g, '');
    }
  }

  return frontMatter;
}

export async function loadBlogPosts() {
  const blogRegistry = getSortedBlogs();
  const posts = [];

  // Default fallback image if no image is specified in registry
  const defaultImage = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80';

  for (const blogEntry of blogRegistry) {
    const contentItem = await loadMarkdownFile(`/blog/${blogEntry.id}.md`);
    
    // Use registry data as primary source, fallback to markdown frontMatter
    posts.push({
      id: blogEntry.id,
      title: blogEntry.title,
      excerpt: blogEntry.excerpt,
      date: blogEntry.date,
      tags: blogEntry.tags,
      pinned: blogEntry.pinned || false,
      release: blogEntry.release || false,
      featured: blogEntry.featured || false,
      image: blogEntry.image || defaultImage,
      content: contentItem?.content || '',
      // Keep any additional frontMatter from markdown
      ...(contentItem?.frontMatter || {}),
    });
  }

  return posts;
}

export async function loadProjects() {
  const projectRegistry = getSortedProjects();
  const projects = [];

  for (const projectEntry of projectRegistry) {
    const contentItem = await loadMarkdownFile(`/projects/${projectEntry.id}.md`);
    
    // Use registry data as primary source, fallback to markdown frontMatter
    projects.push({
      id: projectEntry.id,
      title: projectEntry.title,
      description: projectEntry.description,
      tags: projectEntry.tags,
      githubUrl: projectEntry.githubUrl,
      demoUrl: projectEntry.demoUrl || '',
      featured: projectEntry.featured || false,
      readme: contentItem?.content || '',
      // Keep any additional frontMatter from markdown
      ...(contentItem?.frontMatter || {}),
    });
  }

  return projects;
}

export async function loadPublications() {
  const publicationRegistry = getSortedPublications();
  const publications = [];

  for (const pubEntry of publicationRegistry) {
    const contentItem = await loadMarkdownFile(`/publications/${pubEntry.id}.md`);
    
    // Use registry data as primary source, fallback to markdown frontMatter
    publications.push({
      id: pubEntry.id,
      title: pubEntry.title,
      date: pubEntry.date,
      summary: pubEntry.summary,
      link: pubEntry.link,
      tags: pubEntry.tags,
      featured: pubEntry.featured || false,
      content: contentItem?.content || '',
      // Keep any additional frontMatter from markdown
      ...(contentItem?.frontMatter || {}),
    });
  }

  return publications;
}

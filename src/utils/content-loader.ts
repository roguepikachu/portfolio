interface FrontMatter {
  [key: string]: any;
}

interface ContentItem {
  frontMatter: FrontMatter;
  content: string;
}

export async function loadMarkdownFile(path: string): Promise<ContentItem | null> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}`);
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
  const blogSlugs = [
    'understanding-javascript-closures',
    'building-responsive-layouts-with-tailwind-css',
    'getting-started-with-react-hooks',
  ];

  const posts = [];

  for (const slug of blogSlugs) {
    const contentItem = await loadMarkdownFile(`/content/blog/${slug}.md`);
    if (contentItem) {
      posts.push({
        id: contentItem.frontMatter.id || slug,
        title: contentItem.frontMatter.title || 'Untitled',
        excerpt: contentItem.frontMatter.excerpt || '',
        date: contentItem.frontMatter.date || new Date().toISOString(),
        tags: contentItem.frontMatter.tags || [],
        pinned: contentItem.frontMatter.pinned || false,
        release: contentItem.frontMatter.release || false,
        content: contentItem.content,
      });
    }
  }

  return posts;
}

export async function loadProjects() {
  const projectSlugs = ['personal-portfolio', 'blog-platform', 'ecommerce-dashboard', 'weather-app', 'task-manager', 'recipe-finder'];

  const projects = [];

  for (const slug of projectSlugs) {
    const contentItem = await loadMarkdownFile(`/content/projects/${slug}.md`);
    if (contentItem) {
      projects.push({
        id: slug,
        title: contentItem.frontMatter.title || 'Untitled',
        description: contentItem.frontMatter.description || '',
        tags: contentItem.frontMatter.tags || [],
        githubUrl: contentItem.frontMatter.githubUrl || '',
        demoUrl: contentItem.frontMatter.demoUrl || '',
        featured: contentItem.frontMatter.featured || false,
        readme: contentItem.content,
      });
    }
  }

  return projects;
}

export async function loadPublications() {
  const publicationSlugs = [
    'machine-learning-models-optimization',
    'distributed-systems-reliability',
    'secure-api-design',
    'quantum-computing-algorithms',
    'cognitive-load-ui-design',
  ];

  const publications = [];

  for (const slug of publicationSlugs) {
    const contentItem = await loadMarkdownFile(`/content/publications/${slug}.md`);
    if (contentItem) {
      publications.push({
        id: contentItem.frontMatter.id || slug,
        title: contentItem.frontMatter.title || 'Untitled',
        date: contentItem.frontMatter.date || new Date().toISOString(),
        summary: contentItem.frontMatter.summary || '',
        link: contentItem.frontMatter.link || '',
        tags: contentItem.frontMatter.tags || [],
        featured: contentItem.frontMatter.featured || false,
        content: contentItem.content,
      });
    }
  }

  return publications;
}

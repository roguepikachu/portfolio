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
  const blogSlugs = [
    'understanding-javascript-closures',
    'building-responsive-layouts-with-tailwind-css',
    'getting-started-with-react-hooks',
  ];

  const posts = [];

  const sampleImages = [
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  ];

  for (const [i, slug] of blogSlugs.entries()) {
    const contentItem = await loadMarkdownFile(`/blog/${slug}.md`);
    if (contentItem) {
      posts.push({
        id: contentItem.frontMatter.id || slug,
        title: contentItem.frontMatter.title || 'Untitled',
        excerpt: contentItem.frontMatter.excerpt || '',
        date: contentItem.frontMatter.date || new Date().toISOString(),
        tags: contentItem.frontMatter.tags || [],
        pinned: contentItem.frontMatter.pinned || false,
        release: contentItem.frontMatter.release || false,
        image: contentItem.frontMatter.image || sampleImages[i % sampleImages.length],
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
    const contentItem = await loadMarkdownFile(`/projects/${slug}.md`);
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
    const contentItem = await loadMarkdownFile(`/publications/${slug}.md`);
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

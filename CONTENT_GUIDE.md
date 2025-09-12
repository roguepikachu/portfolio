# Content Management Guide

## Centralized Content Management System

You now have a **single place** to manage all your content! No more managing titles and metadata in multiple places.

## Quick Start - Adding New Content

### 1. Adding a New Blog Post

**Step 1:** Add entry to `/src/config/content-registry.ts` in the `BLOG_REGISTRY` array:

```typescript
{
  id: 'my-new-blog-post',
  title: 'My Amazing New Blog Post',
  excerpt: 'A brief description of what this post is about',
  date: '2024-01-20',
  tags: ['React', 'TypeScript', 'Web Development'],
  order: 4, // This determines the display order
  featured: true, // Will show on homepage if true
  pinned: false, // Optional: pin to top
  image: 'https://example.com/image.jpg' // Optional: custom image
}
```

**Step 2:** Create your markdown file at `/public/content/blog/my-new-blog-post.md`:

```markdown
# My Amazing New Blog Post

Your blog content goes here. You can write in markdown format.

## Subheading

More content...
```

**That's it!** Your blog post will automatically appear in the correct order.

### 2. Adding a New Project

**Step 1:** Add entry to the `PROJECT_REGISTRY` array:

```typescript
{
  id: 'my-awesome-project',
  title: 'My Awesome Project',
  description: 'A brief description of your project',
  tags: ['React', 'Node.js', 'MongoDB'],
  githubUrl: 'https://github.com/yourusername/project',
  demoUrl: 'https://your-project-demo.com', // Optional
  order: 7,
  featured: true, // Will show on homepage if true
}
```

**Step 2:** Create your project markdown file at `/public/content/projects/my-awesome-project.md`:

```markdown
# My Awesome Project

Detailed description of your project, installation instructions, usage, etc.

## Features

- Feature 1
- Feature 2

## Getting Started

Installation and setup instructions...
```

### 3. Adding a New Publication

**Step 1:** Add entry to the `PUBLICATION_REGISTRY` array:

```typescript
{
  id: 'my-research-paper',
  title: 'My Research Paper Title',
  date: '2024-01-15',
  summary: 'A brief summary of your research findings',
  link: 'https://arxiv.org/abs/your-paper',
  tags: ['Machine Learning', 'Deep Learning', 'Computer Vision'],
  order: 5,
  featured: true, // Will show on homepage if true
}
```

**Step 2:** Create your publication markdown file at `/public/content/publications/my-research-paper.md`:

```markdown
# My Research Paper Title

## Abstract

Your abstract goes here...

## Introduction

Your paper content...
```

## Key Benefits

1. **Single Source of Truth**: All titles, order, and metadata in one file
2. **Automatic Ordering**: Content displays in the order you specify
3. **Featured Control**: Easy toggle for homepage display
4. **Type Safety**: TypeScript ensures all required fields are present
5. **Fallback Support**: Markdown frontMatter still works as backup

## Important Notes

- **Order numbers** determine display sequence (1, 2, 3, etc.)
- **Featured items** appear on the homepage
- **IDs** must match your markdown filenames exactly
- **Markdown files** are optional - content can be empty if you only want the registry metadata

## File Structure

```
/public/content/
├── blog/
│   ├── my-blog-post.md
│   └── another-post.md
├── projects/
│   ├── my-project.md
│   └── another-project.md
└── publications/
    ├── my-paper.md
    └── another-paper.md
```

## Migration from Old System

Your existing content will continue to work! The new system:
- Uses registry data as the primary source
- Falls back to markdown frontMatter if registry entry is missing
- Maintains backward compatibility

Now you can manage everything from one place! 🎉
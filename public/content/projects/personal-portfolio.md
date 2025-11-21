---
id: personal-portfolio
title: Personal Portfolio
description: A modern, full-featured personal portfolio with blog system, career timeline, and interactive social features. Built with React, TypeScript, Shadcn/ui, and Supabase.
tags: [React, TypeScript, Vite, Tailwind CSS, Shadcn/ui, Supabase, React Query, Markdown, GitHub Pages]
githubUrl: https://github.com/roguepikachu/portfolio
demoUrl: https://roguepikachu.github.io/portfolio
featured: true
---

## Why This Exists

The internet is flooded with articles, lengthy profiles, and scattered information. I wanted something different, a personal space that's truly mine. A cozy corner of knowledge where I can showcase my work, share my thoughts, and tell my story in my own way.

This portfolio isn't just another static site thrown together from a template. It's a reflection of how I think about software engineering: thoughtful architecture, clean code, and features that actually matter. It's where I experiment with new technologies, document my journey, and share what I've learned along the way.

Think of it as my digital home on the internet, a place where my professional work, technical talks, blog posts, and research all come together in one cohesive experience.

**Live at:** [https://roguepikachu.github.io/portfolio](https://roguepikachu.github.io/portfolio)

## What Makes This Different

This portfolio goes beyond the typical "name, photo, and contact form" formula. It's a full featured web application with dynamic capabilities that blur the line between portfolio and platform. Visual storytelling meets interactive media through carefully crafted components that showcase professional journey and achievements without simply listing credentials.

The technical architecture supports real time social features like voting, commenting, threaded discussions bringing community engagement to what's traditionally a static medium. Every section is designed for interaction rather than passive consumption, with seamless authentication flows and data persistence that elevate the experience from presentation to participation.

From immersive visual experiences to content management systems, each feature demonstrates how modern web technologies can transform personal branding into something genuinely dynamic. It's not just about displaying information; it's about creating an environment where visitors become participants in the narrative.

## The Tech Stack

I built this with modern web technologies that I enjoy working with:

**Frontend:** React 18 with TypeScript for type safety, Vite for blazing-fast builds and hot module replacement, and React Router for client-side navigation. The UI is built with Shadcn/ui components (50+ accessible, customizable components built on Radix UI primitives) and styled with Tailwind CSS. There's a dark/light theme toggle that respects system preferences and persists your choice.

**Backend & Database:** Supabase handles everything on the backend PostgreSQL database with Row Level Security, authentication (magic links and OAuth), real-time subscriptions, and CDN storage for images. TanStack React Query manages data fetching, caching, and state synchronization.

**Content Management:** All blog posts, projects, and publications are written in Markdown and stored in the repo. But I built a centralized content registry system where all the metadata lives in one TypeScript file (`content-registry.ts`). This gives you type safety, makes reordering content trivial, and lets you control featured/pinned status easily. It's way better than managing everything through frontmatter alone.

**Deployment:** It's hosted on GitHub Pages with a custom configuration that makes single-page app routing work seamlessly. The build process is handled by Vite, and the whole thing is completely static after build no server needed.

## How to Set This Up

Want to run this locally or use it as a starting point for your own portfolio? Here's how:

### Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/roguepikachu/portfolio.git
cd portfolio
npm install
```

### Configure Supabase

The interactive features (voting, comments, authentication) require a Supabase project. If you just want to explore the site without these features, you can skip this the site will work, you just won't have auth or social features.

To set up Supabase:

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Run the SQL script from `supabase-setup.sql` in your Supabase SQL editor to create the necessary tables (comments, votes, comment_likes)
4. Grab your project URL and anon key from the project settings

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Customize the Content

Open `src/config/site.config.ts` and make it yours:

```typescript
export const siteConfig = {
  name: "Your Name",
  email: "your.email@example.com",
  role: "Your Role / Title",
  bio: "Your bio here...",
  // ... and so on
}
```

This file is the central hub for all site-wide settings personal info, social links, navigation structure, page metadata, everything. Change it once, and it updates everywhere.

### Add Your Content

Content lives in three places:

**For blog posts:** Create a markdown file in `public/content/blog/` and add an entry to `BLOG_REGISTRY` in `src/config/content-registry.ts`:

```typescript
{
  id: 'my-new-post',
  title: 'My New Post',
  excerpt: 'A brief description...',
  date: '2024-01-20',
  tags: ['JavaScript', 'React'],
  order: 1,
  featured: true,
  image: 'https://...'
}
```

**For projects:** Create a markdown file in `public/content/projects/` and add to `PROJECT_REGISTRY`:

```typescript
{
  id: 'my-project',
  title: 'My Project',
  description: 'What it does...',
  tags: ['React', 'TypeScript'],
  githubUrl: 'https://github.com/...',
  demoUrl: 'https://...',
  order: 1,
  featured: true
}
```

**For publications:** Create a markdown file in `public/content/publications/` and add to `PUBLICATION_REGISTRY`:

```typescript
{
  id: 'my-paper',
  title: 'My Research Paper',
  date: '2024-01-15',
  summary: 'What it\'s about...',
  link: 'https://arxiv.org/...',
  tags: ['Machine Learning', 'NLP'],
  order: 1,
  featured: true
}
```

The ID in the registry must match the markdown filename. The registry takes precedence over frontmatter, so you control everything from one place.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:8080/portfolio](http://localhost:8080/portfolio) and you're running locally.

### Build for Production

```bash
npm run build
```

The built site goes into the `dist/` directory, ready to deploy anywhere GitHub Pages, Vercel, Netlify, or your own server.

## Project Architecture

The codebase is organized into clear layers:

**Components** (`src/components/`) contain all React components. The `ui/` subfolder has 50+ Shadcn/ui components, while custom components like `ProfileSlideshow`, `CareerTimeline`, and `VotingButtons` live at the root level.

**Pages** (`src/pages/`) are route-level components one folder per page. Each page handles its own data loading and state management.

**Config** (`src/config/`) is where all configuration lives. `site.config.ts` has site-wide settings, `career.config.ts` has the career timeline data, `content-registry.ts` is the content metadata hub, and `sectionConfig.ts` has feature toggles.

**Utils** (`src/utils/`) contains helper functions. `content-loader.ts` fetches and parses markdown files, `markdown-utils.tsx` handles rendering with syntax highlighting.

**Types** (`src/types/`) defines TypeScript interfaces for blog posts, projects, publications, and other data structures.

The content management system is the interesting part. Instead of relying solely on markdown frontmatter (which isn't type-safe), there's a centralized registry that serves as the single source of truth. When you load content, it fetches the markdown file but prioritizes registry metadata. This gives you type safety, easy reordering (just change the `order` property), and control over featured/pinned status all in one TypeScript file.

## Key Features Explained

### ProfileSlideshow

A custom-built 3D carousel using CSS transforms and React state management. It auto-advances every 4 seconds but pauses when you interact with it. The 3D stacked card effect is achieved through careful z-index management and rotation transforms. Images are lazy-loaded and served from Supabase Storage.

### Interactive Voting & Comments

Every blog post, project, and publication can be upvoted or downvoted. Blog posts also support comments with nested replies you can reply to comments and have threaded conversations. Comments can be liked, and you can delete your own comments. All of this requires authentication, which is handled through Supabase Auth with magic links or OAuth (GitHub, Google, Facebook).

The data flows through React Query for caching and optimistic updates, so the UI feels instant even though it's hitting a database. Row Level Security policies in Supabase ensure users can only modify their own data.

### Theme System

Dark and light modes are implemented using `next-themes`, which detects system preferences and persists your choice in localStorage. The entire color scheme is controlled through CSS variables defined in `src/styles/globals.css`, making theme changes straightforward.

### Content Loading

When a page loads, the content loader fetches the markdown file from `public/content/`, parses frontmatter and content separately, then merges it with registry metadata. The registry always wins in case of conflicts. This means you can keep detailed metadata in the frontmatter if you want, but the registry is your control panel.

### Section Toggles

Don't want to show the blog section? Disable it in `sectionConfig.ts`. The navigation automatically hides it, and routes redirect to the home page. Same for projects and publications. This makes it easy to gradually build out your portfolio or hide sections you're not ready to publish.

## Deployment to GitHub Pages

The portfolio is configured for GitHub Pages out of the box. The Vite config sets the base path to `/portfolio`, and there's a custom `404.html` that handles client-side routing (since GitHub Pages doesn't natively support SPAs).

To deploy:

1. Build the project: `npm run build`
2. Push the `dist/` directory to the `gh-pages` branch
3. Enable GitHub Pages in your repository settings, pointing to the `gh-pages` branch

If you want to use a custom domain, add a `CNAME` file to the `public/` directory with your domain name.

## Performance Considerations

The site is fast because:

- **Code splitting:** React.lazy() splits routes into separate chunks loaded on demand
- **Image optimization:** The ProfileSlideshow lazy-loads images using native browser APIs
- **Caching:** React Query caches all data fetches, so repeat visits don't hit the network
- **Static generation:** After build, everything is static HTML/CSS/JS no server-side rendering overhead
- **Tree shaking:** Vite eliminates unused code during the build process

## What I Learned Building This

This project taught me a lot about architecting a real-world application from scratch. The centralized content registry approach was an experiment that paid off it makes content management so much easier than scattered frontmatter. Integrating Supabase showed me how powerful backend-as-a-service platforms can be for adding dynamic features without running your own server. And building the 3D ProfileSlideshow was a fun exercise in CSS transforms and animation timing.

Most importantly, I learned that even a "simple" portfolio can be a playground for trying new ideas and patterns. Every feature here was a learning opportunity.

## Future Ideas

Some things I'm thinking about adding:

- An RSS feed for blog posts so people can subscribe
- Full-text search across all content using a client-side search library
- Analytics integration to see what content resonates
- A newsletter signup form
- More sophisticated project filtering (by technology, date, etc.)
- Support for blog post series that link together
- Maybe a code playground for interactive tutorials

## Use It Yourself

This portfolio is open source under the MIT License. Feel free to fork it, customize it, and make it your own. If you find bugs or have ideas for improvements, open an issue on GitHub I'd love to hear from you.

The goal was to create something genuinely useful, not just another template. I hope it serves you well, whether you're using it as-is or as inspiration for your own project.

---

**Built by Ayush Kumar** | [GitHub](https://github.com/roguepikachu) | [LinkedIn](https://linkedin.com/in/ayush-kumar)

This is my cozy corner of the internet. Thanks for visiting.

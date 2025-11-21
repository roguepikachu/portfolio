---
id: personal-portfolio
title: Personal Portfolio Website
description: A modern, full-featured personal portfolio with 3D photo carousel, blog system, career timeline, and interactive social features. Built with React, TypeScript, Shadcn/ui, and Supabase.
tags: [React, TypeScript, Vite, Tailwind CSS, Shadcn/ui, Supabase, React Query, Markdown, GitHub Pages]
githubUrl: https://github.com/roguepikachu/portfolio
demoUrl: https://roguepikachu.github.io/portfolio
featured: true
---

# Personal Portfolio Website

A production-ready, full-featured personal portfolio website showcasing professional work, technical talks, blog posts, research publications, and career journey. This project goes beyond a typical static portfolio by integrating dynamic social features, sophisticated UI components, and a comprehensive content management system.

**Live Site:** [https://roguepikachu.github.io/portfolio](https://roguepikachu.github.io/portfolio)

## Overview

This portfolio serves as a comprehensive professional showcase for a Software Engineer specializing in backend systems, cloud infrastructure (Go, Kubernetes, AWS), and platform engineering. Built with modern web technologies, it combines static site performance with dynamic, interactive features typically found in full-stack web applications.

**Key Statistics:**
- ~11,000+ lines of TypeScript/React code
- 50+ UI components from Shadcn/ui
- 25+ professional photos in 3D carousel
- Supports blog posts, projects, and research publications
- Full authentication and social interaction features

## Technology Stack

### Core Framework & Build
- **React 18.3** - Modern component-based UI framework
- **TypeScript 5.5** - Type-safe development throughout
- **Vite 5.4** - Ultra-fast build tool with SWC compiler
- **React Router v6** - Client-side routing with GitHub Pages support

### UI Framework & Design System
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Shadcn/ui** - Comprehensive, accessible component library (50+ components)
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, consistent icon library
- **next-themes** - Dark/light mode with system preference detection
- **CSS Modules** - Component-scoped styling for custom components

### Backend & Database
- **Supabase** - Backend-as-a-Service providing:
  - PostgreSQL database with Row Level Security (RLS)
  - Magic link and OAuth authentication (GitHub, Google, Facebook)
  - Real-time subscriptions
  - CDN storage for images and assets
- **TanStack React Query v5** - Data fetching, caching, and state management

### Content Management
- **Markdown Files** - Content stored in `/public/content/` directory
- **Centralized Content Registry** - Single source of truth for all metadata
- **Custom Content Loader** - Markdown parser with frontmatter support
- **React Markdown** - Rich markdown rendering
- **React Syntax Highlighter** - Beautiful code block highlighting

### Additional Libraries
- **date-fns** - Modern date utility library
- **React Hook Form + Zod** - Form management with schema validation
- **embla-carousel-react** - Smooth, accessible carousel
- **Recharts** - Data visualization
- **Sonner** - Toast notifications

## Key Features

### 1. ProfileSlideshow - 3D Photo Carousel
The portfolio's standout feature is a sophisticated 3D card carousel showcasing 25+ professional photos organized by category:
- People photos (CEO meetings, networking events)
- Tech talks and presentations
- Office events and team celebrations
- Conferences and community engagement
- Awards and achievements

**Technical Highlights:**
- 3D stacked card effect with CSS transforms
- Auto-play with pause functionality (4-second intervals)
- Navigation controls (previous/next buttons, dot indicators)
- Responsive design for mobile and desktop
- Descriptive captions with dates
- Images hosted on Supabase Storage CDN

### 2. Comprehensive Career Timeline
Visual representation of professional journey featuring:
- Multiple companies and roles (Guidewire, Amazon, Cleareye.ai, Feynn Labs, TechByHeart)
- Detailed role progression within companies
- Specific achievements, responsibilities, and milestones
- Tech stack categorization (Frontend, Backend, DevOps)
- Education details (B.Tech from Amrita University - 9.1 CGPA)
- Open source contributions and speaking engagements

### 3. Tech Talks & Presentations
Dedicated showcase for professional speaking engagements:
- Embedded YouTube videos of technical presentations
- KubeVela Platform Engineering talk
- Collabnix Meetup - jsPolicy presentation
- Links to event pages and recordings

### 4. Blog System
Full-featured blog with:
- Markdown-based content with frontmatter metadata
- Featured/pinned post support
- Tag-based categorization and filtering
- Custom images per post
- Syntax-highlighted code blocks
- Full-text search capability
- **Interactive Features:**
  - Upvote/downvote system (requires authentication)
  - Comment system with nested replies
  - Comment likes
  - Author can delete own comments

### 5. Projects Showcase
Portfolio of technical projects featuring:
- Detailed project descriptions with markdown support
- GitHub repository links
- Live demo links
- Featured project highlighting
- Tag-based filtering
- Technical stack details
- Upvote/downvote system

### 6. Publications Section
Academic research papers and publications:
- Links to external publications (ArXiv, academic journals)
- Publication dates and detailed summaries
- Tag-based categorization
- Featured publication highlighting
- Full markdown content support
- Voting system

### 7. Authentication System
Powered by Supabase Auth:
- Magic link email authentication
- OAuth providers (GitHub, Google, Facebook)
- Persistent user sessions
- Protected routes for voting and commenting
- User profile management

### 8. Theme System
- Dark/light mode toggle
- System preference auto-detection
- Persistent theme preference (localStorage)
- Smooth transitions between themes
- CSS variables for dynamic theming

### 9. Responsive Navigation
- Desktop horizontal menu
- Mobile hamburger menu with smooth animations
- Active route highlighting
- Section-based navigation
- Conditionally rendered based on feature toggles

### 10. Contact System
- Email contact modal with form
- Copy email to clipboard functionality
- Accessible modal with keyboard controls

## Architecture

### Directory Structure

```
portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # 50+ Shadcn/ui components
│   │   ├── auth/           # Authentication components
│   │   ├── blog/           # Blog-specific components
│   │   ├── ProfileSlideshow.tsx
│   │   ├── CareerTimeline.tsx
│   │   ├── VotingButtons.tsx
│   │   └── main-nav.tsx
│   ├── pages/              # Route-level components
│   │   ├── home/           # Landing page
│   │   ├── about/          # About page
│   │   ├── blog/           # Blog listing
│   │   ├── blogpost/       # Blog post detail
│   │   ├── projects/       # Projects listing
│   │   ├── publications/   # Publications listing
│   │   └── notfound/       # 404 page
│   ├── config/             # Configuration files
│   │   ├── site.config.ts        # Site-wide settings
│   │   ├── career.config.ts      # Career timeline data
│   │   ├── content-registry.ts   # Content metadata registry
│   │   └── sectionConfig.ts      # Feature toggles
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   │   ├── utils.ts        # Helper functions
│   │   └── supabase.ts     # Supabase client
│   ├── utils/              # Content utilities
│   │   ├── content-loader.ts     # Markdown loader
│   │   └── markdown-utils.tsx    # Markdown renderer
│   └── types/              # TypeScript definitions
├── public/
│   ├── content/           # Markdown content
│   │   ├── blog/          # Blog posts
│   │   ├── projects/      # Project descriptions
│   │   └── publications/  # Research papers
│   ├── pikachu.jpeg       # Profile image
│   └── ak-favicon.svg     # Site favicon
├── components.json        # Shadcn/ui config
├── tailwind.config.ts     # Tailwind config
├── vite.config.ts         # Vite build config
├── supabase-setup.sql     # Database schema
└── CONTENT_GUIDE.md       # Content management guide
```

### Content Management System

**Philosophy:** Centralized Registry Approach

The portfolio uses a unique content management system with a centralized registry (`content-registry.ts`) as the single source of truth for all content metadata. This approach provides:

1. **Type-Safe Metadata** - All titles, dates, tags, and ordering in one TypeScript file
2. **Easy Content Management** - Reorder content by changing the `order` property
3. **Feature Flags** - Control featured, pinned, and release status
4. **Fallback Support** - Falls back to markdown frontmatter if needed

**Content Loading Flow:**
1. Registry provides metadata (title, excerpt, tags, order, featured status)
2. Content loader fetches corresponding markdown file from `/public/content/`
3. Markdown parser extracts frontmatter and content
4. Registry data takes precedence over frontmatter
5. Combined data returned to components

### Configuration System

**Centralized Configuration Hub (`site.config.ts`):**
- Personal information (name, email, role, bio)
- Social links (GitHub, LinkedIn)
- Navigation structure
- Page metadata and SEO
- UI labels and strings
- Loading states and error messages
- Auth settings
- Theme configuration

**Feature Toggles (`sectionConfig.ts`):**
- Enable/disable projects section
- Enable/disable publications section
- Enable/disable blog section
- Routes automatically redirect when sections are disabled

### Database Schema (Supabase)

**Tables:**

1. **comments** - Blog post comments with nested reply support
   - Fields: id, post_id, user_id, author, content, likes, parent_id, created_at
   - Row Level Security (RLS) enabled

2. **comment_likes** - Track comment likes by users
   - Fields: id, comment_id, user_id, post_id, created_at
   - Unique constraint on (comment_id, user_id)

3. **votes** - Upvote/downvote tracking for all content types
   - Fields: id, item_id, item_type, user_id, vote_type, created_at
   - Supports 'blog', 'project', 'publication' types
   - Unique constraint on (item_id, item_type, user_id)

**Security:**
- Row Level Security (RLS) policies on all tables
- Public read access for content viewing
- Authenticated-only writes for comments and votes
- Users can only modify their own data

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Supabase account (for backend features)
- Git

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/roguepikachu/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Supabase**

Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Set up the database:
```bash
# Run the SQL script in your Supabase SQL editor
# File: supabase-setup.sql
```

4. **Configure site settings**

Edit `src/config/site.config.ts` to customize:
- Personal information
- Social links
- Navigation structure
- Page metadata

5. **Run development server**
```bash
npm run dev
# Opens on http://localhost:8080
```

6. **Build for production**
```bash
npm run build
# Output to /dist directory
```

### Available Scripts

```bash
npm run dev         # Development server (port 8080)
npm run build       # Production build
npm run build:dev   # Development mode build
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## Deployment

### GitHub Pages

The portfolio is configured for GitHub Pages deployment:

1. **Build Configuration:**
   - Base path set to `/portfolio` in `vite.config.ts`
   - Custom 404.html for SPA routing support
   - Assets bundled to `/dist/assets`

2. **Deployment Steps:**
```bash
npm run build
# Deploy dist/ directory to gh-pages branch
```

3. **Custom Domain (Optional):**
   - Add CNAME file to public directory
   - Configure DNS settings with your domain provider

### Environment Variables for Production

Ensure Supabase credentials are configured in your deployment environment:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Unique Features & Innovations

### 1. Centralized Content Registry
Unlike typical markdown-based portfolios that rely solely on frontmatter, this project uses a centralized TypeScript registry for all content metadata. This provides type safety, easier maintenance, and powerful content management capabilities.

### 2. 3D ProfileSlideshow Carousel
A custom-built 3D photo carousel with 25+ professional photos, featuring advanced CSS transforms, auto-play, and intuitive navigation. This visual storytelling component is unique among portfolio sites.

### 3. Full Social Features
Implements upvoting, downvoting, commenting, and nested replies - features typically found in dynamic web applications, not static portfolios. All powered by Supabase with proper authentication and security.

### 4. Section Toggle System
Feature flags allow entire sections (blog, projects, publications) to be enabled/disabled, with automatic route handling and redirection.

### 5. GitHub Pages SPA Support
Custom routing solution using 404.html trick enables seamless single-page app navigation on GitHub Pages without server-side configuration.

### 6. Tech Talk Showcase
Dedicated section for professional presentations with embedded videos and event links, highlighting public speaking experience.

### 7. Academic Integration
Research publications are treated as first-class content alongside blog posts and projects, perfect for academics or researchers.

## Performance & Optimization

- **Code Splitting** - React.lazy for route-based code splitting
- **Image Optimization** - Lazy loading on carousel images
- **Vite + SWC** - Fast build times and hot module replacement
- **React Query Caching** - Efficient data fetching with automatic cache management
- **CSS Modules** - Scoped styles prevent global pollution
- **Tree Shaking** - Unused code eliminated in production

## Accessibility

- **Keyboard Navigation** - All interactive elements fully keyboard accessible
- **ARIA Labels** - Proper semantic labeling throughout
- **Color Contrast** - WCAG-compliant color schemes in both themes
- **Focus Management** - Clear focus indicators
- **Screen Reader Support** - Semantic HTML and ARIA attributes
- **Radix UI Primitives** - Built-in accessibility for complex components

## SEO & Meta Tags

- Comprehensive meta tags (title, description, author)
- Open Graph tags for social media sharing
- Twitter Card tags
- Semantic HTML structure
- robots.txt for search engine crawlers
- Custom favicon (SVG format)

## Content Management

### Adding New Content

**Blog Posts:**
1. Create markdown file in `public/content/blog/`
2. Add entry to `BLOG_REGISTRY` in `src/config/content-registry.ts`
3. Customize title, excerpt, tags, order, featured status

**Projects:**
1. Create markdown file in `public/content/projects/`
2. Add entry to `PROJECT_REGISTRY`
3. Include GitHub and demo URLs

**Publications:**
1. Create markdown file in `public/content/publications/`
2. Add entry to `PUBLICATION_REGISTRY`
3. Link to external publication URLs

See `CONTENT_GUIDE.md` for detailed instructions.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- RSS feed for blog posts
- Search functionality across all content
- Analytics integration
- Newsletter subscription
- Project filtering by technology
- Blog series support
- Code playground for tutorials

## Contributing

This is a personal portfolio project, but feel free to fork it for your own use. If you find bugs or have suggestions, please open an issue on GitHub.

## License

MIT License - feel free to use this project as a template for your own portfolio.

## Acknowledgments

- **UI Components:** Shadcn/ui by shadcn
- **Icons:** Lucide React
- **Backend:** Supabase
- **Hosting:** GitHub Pages
- **Design Inspiration:** Modern portfolio best practices

---

**Built with passion by Ayush Kumar** | [GitHub](https://github.com/roguepikachu) | [LinkedIn](https://linkedin.com/in/ayush-kumar)

This portfolio represents not just a showcase of work, but a demonstration of modern web development capabilities - combining beautiful design, robust architecture, and production-ready features into a comprehensive professional presence.

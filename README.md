Welcome to my personal portfolio repository! I'm Ayush, and this is where I showcase my work, share my thoughts through blog posts, and highlight my research contributions. This modern, responsive portfolio is built with React, TypeScript, and Tailwind CSS to provide an engaging way for visitors to learn about my projects and get in touch.

You can view the live website here: [https://roguepikachu.github.io/portfolio](https://roguepikachu.github.io/portfolio)

## About This Portfolio

This website serves as a comprehensive showcase of my professional work and interests, featuring:

- **Modern Design**: Clean, responsive interface with dark and light mode support
- **Mobile-First Approach**: Fully responsive design that works seamlessly on all devices
- **Blog Integration**: Dynamic blog posts with markdown support for sharing insights and tutorials
- **Project Showcase**: Featured projects with live demos and GitHub repository links
- **Publications Section**: Academic publications and research work display
- **Interactive Features**: Voting and commenting system powered by Supabase
- **SEO Optimized**: Built with best practices for search engine optimization
- **Fast Performance**: Optimized with Vite for lightning-fast loading and development

## Development Setup

To run this portfolio locally for development purposes, follow these steps:

### Prerequisites

- Node.js (version 16 or higher) - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or yarn package manager

### Local Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Available Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Technology Stack

This portfolio leverages modern web technologies for optimal performance and developer experience:

### Frontend Technologies
- **React 18** - Component-based UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript development for better code quality
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Shadcn/ui** - Beautiful, accessible UI component library

### Backend and Database
- **Supabase** - Backend-as-a-Service providing authentication and database functionality
- **PostgreSQL** - Robust relational database system (managed by Supabase)

### Supporting Libraries
- **React Router** - Declarative client-side routing
- **React Query** - Powerful data fetching and caching library
- **Lucide React** - Beautiful and consistent icon library
- **Date-fns** - Modern JavaScript date utility library
- **React Hook Form** - Performant form handling and validation

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── auth/           # Authentication components
│   └── blog/           # Blog-specific components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries and configurations
├── types/              # TypeScript type definitions
└── utils/              # Helper functions

public/
└── content/            # Markdown content files
    ├── blog/           # Blog posts
    ├── projects/       # Project descriptions
    └── publications/   # Academic publications
```

## Content Management

Content for the portfolio is organized through markdown files in the `public/content/` directory structure:

- **Blog Posts**: Create new blog entries by adding `.md` files to `public/content/blog/`
- **Project Descriptions**: Add detailed project information to `public/content/projects/`
- **Research Publications**: Document academic work in `public/content/publications/`

Each content file includes frontmatter with essential metadata such as titles, descriptions, tags, and relevant links for proper categorization and display.

## Deployment Options

This portfolio can be deployed to various static hosting platforms:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel automatically detects the Vite configuration
3. Deploy with a single click

### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deployment script to package.json
3. Run `npm run deploy`

## Environment Configuration

For local development, create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing to This Project

If you'd like to contribute improvements or suggestions:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/improvement-name`
3. Make your changes and commit: `git commit -m 'Add specific improvement'`
4. Push to the branch: `git push origin feature/improvement-name`
5. Submit a pull request for review

## License

This project is open source and available under the MIT License.

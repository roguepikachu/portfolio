// Centralized Content Registry
// Add all your content items here with order and metadata

export interface ContentEntry {
  id: string;
  title: string;
  order: number;
  featured?: boolean;
  pinned?: boolean;
  release?: boolean;
  // Additional metadata that varies by content type
  [key: string]: any;
}

export interface BlogEntry extends ContentEntry {
  excerpt: string;
  date: string;
  tags: string[];
  image?: string;
}

export interface ProjectEntry extends ContentEntry {
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
}

export interface PublicationEntry extends ContentEntry {
  date: string;
  summary: string;
  link: string;
  tags: string[];
}

// BLOG POSTS - Add new blog posts here
export const BLOG_REGISTRY: BlogEntry[] = [
  {
    id: 'understanding-javascript-closures',
    title: 'Understanding JavaScript Closures',
    excerpt: 'A deep dive into JavaScript closures and their practical applications',
    date: '2024-01-15',
    tags: ['JavaScript', 'Web Development', 'Programming'],
    order: 1,
    featured: true,
    pinned: false,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'building-responsive-layouts-with-tailwind-css',
    title: 'Building Responsive Layouts with Tailwind CSS',
    excerpt: 'Learn how to create beautiful, responsive layouts using Tailwind CSS utility classes',
    date: '2024-01-10',
    tags: ['CSS', 'Tailwind', 'Web Design', 'Responsive'],
    order: 2,
    featured: false,
  },
  {
    id: 'getting-started-with-react-hooks',
    title: 'Getting Started with React Hooks',
    excerpt: 'Master React Hooks and modern functional component patterns',
    date: '2024-01-05',
    tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
    order: 3,
    featured: true,
  }
];

// PROJECTS - Add new projects here
export const PROJECT_REGISTRY: ProjectEntry[] = [
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    description: 'A modern, responsive portfolio website built with React and TypeScript',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/roguepikachu/portfolio',
    demoUrl: 'https://ayushkumar.dev',
    order: 1,
    featured: true,
  },
  {
    id: 'blog-platform',
    title: 'Blog Platform',
    description: 'A full-stack blog platform with user authentication and content management',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    githubUrl: 'https://github.com/roguepikachu/blog-platform',
    demoUrl: 'https://blog-platform-demo.vercel.app',
    order: 2,
    featured: true,
  },
  {
    id: 'ecommerce-dashboard',
    title: 'E-commerce Dashboard',
    description: 'A comprehensive admin dashboard for e-commerce management',
    tags: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
    githubUrl: 'https://github.com/roguepikachu/ecommerce-dashboard',
    order: 3,
    featured: true,
  },
  {
    id: 'weather-app',
    title: 'Weather App',
    description: 'A beautiful weather application with location-based forecasts',
    tags: ['React', 'OpenWeather API', 'CSS3'],
    githubUrl: 'https://github.com/roguepikachu/weather-app',
    demoUrl: 'https://weather-app-demo.vercel.app',
    order: 4,
    featured: false,
  },
  {
    id: 'task-manager',
    title: 'Task Manager',
    description: 'A productivity app for managing tasks and projects efficiently',
    tags: ['Vue.js', 'Firebase', 'Vuetify'],
    githubUrl: 'https://github.com/roguepikachu/task-manager',
    order: 5,
    featured: false,
  },
  {
    id: 'recipe-finder',
    title: 'Recipe Finder',
    description: 'Find and save your favorite recipes with this intuitive app',
    tags: ['React Native', 'Recipe API', 'SQLite'],
    githubUrl: 'https://github.com/roguepikachu/recipe-finder',
    order: 6,
    featured: false,
  }
];

// PUBLICATIONS - Add new publications here
export const PUBLICATION_REGISTRY: PublicationEntry[] = [
  {
    id: 'aerial-vehicle-detection-pca-deep-learning',
    title: 'Aerial Vehicle Detection using PCA and Deep Learning',
    date: '2023-12-01',
    summary: 'A novel approach to aerial vehicle detection combining PCA dimensionality reduction with deep learning techniques',
    link: 'https://arxiv.org/abs/example1',
    tags: ['Deep Learning', 'Computer Vision', 'PCA', 'Aerial Detection'],
    order: 1,
    featured: true,
  },
  {
    id: 'bert-tamil-dependency-parsing',
    title: 'BERT for Tamil Dependency Parsing',
    date: '2023-11-15',
    summary: 'Implementing BERT-based models for improved Tamil language dependency parsing accuracy',
    link: 'https://arxiv.org/abs/example2',
    tags: ['NLP', 'BERT', 'Tamil Language', 'Dependency Parsing'],
    order: 2,
    featured: true,
  },
  {
    id: 'mosquito-classification-deep-learning',
    title: 'Mosquito Classification using Deep Learning',
    date: '2023-10-20',
    summary: 'Deep learning approaches for automated mosquito species classification from images',
    link: 'https://arxiv.org/abs/example3',
    tags: ['Deep Learning', 'Image Classification', 'Biology', 'CNN'],
    order: 3,
    featured: false,
  },
  {
    id: 'speech-emotion-recognition-using-cnn-lstm-vit',
    title: 'Speech Emotion Recognition using CNN, LSTM, and ViT',
    date: '2023-09-30',
    summary: 'A comprehensive study comparing CNN, LSTM, and Vision Transformer approaches for speech emotion recognition',
    link: 'https://arxiv.org/abs/example4',
    tags: ['Speech Recognition', 'Emotion Recognition', 'CNN', 'LSTM', 'Vision Transformer'],
    order: 4,
    featured: false,
  }
];

// Utility functions to get sorted content
export const getSortedBlogs = () => BLOG_REGISTRY.sort((a, b) => a.order - b.order);
export const getSortedProjects = () => PROJECT_REGISTRY.sort((a, b) => a.order - b.order);
export const getSortedPublications = () => PUBLICATION_REGISTRY.sort((a, b) => a.order - b.order);

export const getFeaturedBlogs = () => getSortedBlogs().filter(blog => blog.featured);
export const getFeaturedProjects = () => getSortedProjects().filter(project => project.featured);
export const getFeaturedPublications = () => getSortedPublications().filter(pub => pub.featured);
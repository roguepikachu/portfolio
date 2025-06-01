export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  image?: string;
  featured?: boolean;
  readme?: string;
}


export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content?: string;
  pinned?: boolean;
  release?: boolean;
}

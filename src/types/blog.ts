
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

export interface Comment {
  id: string;
  author: string;
  user_id: string;
  content: string;
  date: string;
  created_at?: string;
  likes: number;
  replies: Comment[];
  userHasLiked: boolean;
  parent_id?: string | null;
  post_id: string;
}


export interface Publication {
  id: string;
  title: string;
  date: string;
  summary: string;
  link: string;
  tags: string[];
  featured?: boolean;
  content?: string;
}

import { BlogPost } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPostCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogPostCard({ post, className = '' }: BlogPostCardProps) {
  // Format the date using the Date object
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article
      className={`group overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent/50 h-full flex flex-col ${className} ${
        post.pinned ? 'ring-2 ring-primary/20' : ''
      }`}
    >
      {post.image && (
        <div className="aspect-[2/1] w-full overflow-hidden bg-muted">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {post.pinned && (
            <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/10">
              Pinned
            </Badge>
          )}
          {post.release && (
            <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/10">
              New
            </Badge>
          )}
          <div className="flex items-center text-xs text-muted-foreground ml-auto">
            <Calendar className="mr-1 h-3 w-3" />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </div>

        <h3 className="text-xl font-bold hover:text-primary transition-colors line-clamp-2">
          <Link to={`/blog/${post.id}`} className="block">
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 text-muted-foreground line-clamp-3 flex-grow">{post.excerpt}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="hover:bg-secondary/80">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}

import { BlogPost } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './blog-post-card.module.css';
import badgeStyles from '@/styles/badges.module.css';

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
      className={`group ${styles.card} ${className} ${
        post.pinned ? styles.pinnedCard : ''
      }`}
    >
      {post.image && (
        <div className={styles.imageContainer}>
          <img
            src={post.image}
            alt={post.title}
            className={styles.image}
            loading="lazy"
          />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.badgeContainer}>
          {post.pinned && (
            <Badge variant="outline" className={badgeStyles.pinned}>
              Pinned
            </Badge>
          )}
          {post.release && (
            <Badge variant="outline" className={badgeStyles.new}>
              New
            </Badge>
          )}
          <div className={styles.dateContainer}>
            <Calendar className={styles.dateIcon} />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </div>

        <h3 className={styles.title}>
          <Link to={`/blog/${post.id}`} className={styles.titleLink}>
            {post.title}
          </Link>
        </h3>

        <p className={styles.excerpt}>{post.excerpt}</p>

        <div className={styles.tagsContainer}>
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary" className={styles.tag}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}

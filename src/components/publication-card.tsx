import { Publication } from '@/types/publication';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './publication-card.module.css';
import badgeStyles from '@/styles/badges.module.css';

interface PublicationCardProps {
  publication: Publication;
  showFullSummary?: boolean;
}

export function PublicationCard({ publication, showFullSummary = false }: PublicationCardProps) {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <div className={styles.badgeContainer}>
          {publication.featured && (
            <Badge variant="outline" className={badgeStyles.featured}>
              Featured
            </Badge>
          )}
        </div>
        <CardTitle className={styles.title}>
          <Link to={`/publications/${publication.id}`} className={styles.titleLink}>
            {publication.title}
          </Link>
        </CardTitle>
        <div className={styles.date}>
          {new Date(publication.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })}
        </div>
      </CardHeader>
      <CardContent className={styles.content}>
        <p className={showFullSummary ? styles.summaryFull : styles.summaryTruncated} title={publication.summary}>
          {publication.summary}
        </p>
      </CardContent>
      <CardFooter className={styles.footer}>
        <div className={styles.tagsContainer}>
          {publication.tags.map(tag => (
            <Badge key={tag} variant="secondary" className={styles.tag}>
              {tag}
            </Badge>
          ))}
        </div>
        <div className={styles.buttonsContainer}>
          <Button size="sm" asChild>
            <a href={publication.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className={styles.icon} />
              View Publication
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

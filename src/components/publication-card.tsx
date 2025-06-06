import { Publication } from '@/types/publication';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PublicationCardProps {
  publication: Publication;
  showFullSummary?: boolean;
}

export function PublicationCard({ publication, showFullSummary = false }: PublicationCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {publication.featured && (
            <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/10">
              Featured
            </Badge>
          )}
        </div>
        <CardTitle className="line-clamp-2">
          <Link to={`/publications/${publication.id}`} className="hover:text-primary transition-colors">
            {publication.title}
          </Link>
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          {new Date(publication.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className={showFullSummary ? '' : 'line-clamp-3'} title={publication.summary}>
          {publication.summary}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-4 pt-4">
        <div className="flex flex-wrap gap-2">
          {publication.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="hover:bg-secondary/80">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" asChild>
            <a href={publication.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Publication
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

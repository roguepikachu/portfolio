
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { publications } from '@/data/publications';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { Publication as PublicationType } from '@/types/publication';

// Function to convert markdown to HTML (basic implementation)
const markdownToHtml = (markdown?: string): string => {
  if (!markdown) return '';
  
  // This is a simplified implementation
  let html = markdown;
  
  // Handle code blocks
  html = html.replace(/```(.+?)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
  
  // Handle headers
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  
  // Handle bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Handle links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
  // Handle paragraphs
  html = html.replace(/^\s*(\n)?(.+)/gm, function(m) {
    return /^<(\/)?(h\d|pre|table|tr|td|th|tbody|ul|ol|li|blockquote)/.test(m) ? m : '<p>' + m + '</p>';
  });
  
  // Handle line breaks
  html = html.replace(/\n/g, '<br>');
  
  return html;
};

export default function Publication() {
  const { id } = useParams<{ id: string }>();
  const [publication, setPublication] = useState<PublicationType | null>(null);
  const [relatedPublications, setRelatedPublications] = useState<PublicationType[]>([]);
  
  useEffect(() => {
    if (!id) return;
    
    // Find current publication
    const currentPublication = publications.find(p => p.id === id);
    if (!currentPublication) return;
    
    setPublication(currentPublication);
    
    // Find related publications based on tags
    const related = publications
      .filter(p => p.id !== id && p.tags.some(tag => currentPublication.tags.includes(tag)))
      .slice(0, 2);
    setRelatedPublications(related);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!publication) {
    return (
      <div className="container py-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Publication not found</p>
          <Button variant="link" asChild className="mt-4">
            <Link to="/publications">Back to Publications</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const formattedDate = new Date(publication.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Back to publications link */}
        <Link 
          to="/publications" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all publications
        </Link>
        
        {/* Publication header */}
        <article>
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {publication.featured && (
                <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/10">
                  Featured
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {publication.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <time dateTime={publication.date}>{formattedDate}</time>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {publication.tags.map(tag => (
                <Link to={`/publications?tag=${tag}`} key={tag}>
                  <Badge variant="secondary" className="hover:bg-secondary/80">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
            
            <div className="mt-6">
              <Button asChild>
                <a href={publication.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Full Publication
                </a>
              </Button>
            </div>
          </header>
          
          {/* Publication content */}
          {publication.content ? (
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(publication.content) }}
            />
          ) : (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground">{publication.summary}</p>
              <p className="mt-4">
                For the complete publication, please visit the link above.
              </p>
            </div>
          )}
        </article>
        
        {/* Related publications */}
        {relatedPublications.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Publications</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedPublications.map(pub => (
                <Link 
                  to={`/publications/${pub.id}`} 
                  key={pub.id}
                  className="block group rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-muted"
                >
                  <h3 className="font-medium group-hover:text-primary transition-colors">{pub.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{pub.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pub.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                    {pub.tags.length > 2 && <span className="text-xs text-muted-foreground">+{pub.tags.length - 2}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

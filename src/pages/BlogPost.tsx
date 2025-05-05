import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { blogPosts } from '@/data/blog-posts';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar, Clock, Copy, Check, Facebook, Twitter } from 'lucide-react';
import { BlogPost as BlogPostType } from '@/types/blog';
import { BlogPostCard } from '@/components/blog-post-card';
import { MarkdownRenderer, calculateReadingTime } from '@/utils/markdown-utils';
import { toast } from 'sonner';
import { CommentSection } from '@/components/blog/CommentSection';
import { ContentLoader } from '@/components/ui/content-loader';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [nextPost, setNextPost] = useState<BlogPostType | null>(null);
  const [prevPost, setPrevPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    setIsLoading(true);
    
    // Simulate network delay to show loading state (remove in production)
    setTimeout(() => {
      // Find current post
      const currentPostIndex = blogPosts.findIndex(p => p.id === id);
      if (currentPostIndex === -1) {
        setIsLoading(false);
        return;
      }
      
      const currentPost = blogPosts[currentPostIndex];
      setPost(currentPost);
      
      // Find next and previous posts
      setPrevPost(currentPostIndex > 0 ? blogPosts[currentPostIndex - 1] : null);
      setNextPost(currentPostIndex < blogPosts.length - 1 ? blogPosts[currentPostIndex + 1] : null);
      
      // Find related posts based on tags
      const related = blogPosts
        .filter(p => p.id !== id && p.tags.some(tag => currentPost.tags.includes(tag)))
        .slice(0, 2);
      setRelatedPosts(related);
      
      // Scroll to top
      window.scrollTo(0, 0);
      setIsLoading(false);
    }, 800);
  }, [id]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
    toast.success('Link copied to clipboard');
  };
  
  const shareOnSocialMedia = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    // This is a simplified version - in a real app, you'd use proper share APIs
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title || 'Blog post');
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  if (isLoading) {
    return (
      <div className="container py-16">
        <ContentLoader message="Loading blog post..." />
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="container py-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Post not found</p>
          <Button variant="link" asChild className="mt-4">
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const readingTime = post.content ? calculateReadingTime(post.content) : 0;
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Back to blog link */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>
        
        {/* Post header */}
        <article>
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.pinned && (
                <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/10">
                  Pinned
                </Badge>
              )}
              {post.release && (
                <Badge variant="outline" className="bg-accent/10 hover:bg-accent/20 border-accent/10">
                  New
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <time dateTime={post.date}>{formattedDate}</time>
              </div>
              
              {!!readingTime && (
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{readingTime} min read</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link to={`/blog?tag=${tag}`} key={tag}>
                  <Badge variant="secondary" className="hover:bg-secondary/80">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </header>
          
          {/* Post content */}
          {post.content ? (
            <MarkdownRenderer content={post.content} />
          ) : (
            <p className="text-muted-foreground">No content available for this post.</p>
          )}

          {/* Share buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t pt-6">
            <span className="text-sm font-medium">Share this post:</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full" 
              onClick={() => shareOnSocialMedia('facebook')}
            >
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full" 
              onClick={() => shareOnSocialMedia('twitter')}
            >
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyToClipboard} 
              className="ml-auto"
            >
              {linkCopied ? (
                <>
                  <Check className="mr-1 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-4 w-4" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
          
          {/* Post navigation */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {prevPost && (
              <Link
                to={`/blog/${prevPost.id}`}
                className="group flex flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-muted"
              >
                <span className="text-sm text-muted-foreground flex items-center">
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  Previous post
                </span>
                <span className="font-medium group-hover:text-foreground/80">{prevPost.title}</span>
              </Link>
            )}
            {nextPost && (
              <Link
                to={`/blog/${nextPost.id}`}
                className={`group flex flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-muted ${
                  !prevPost ? "sm:col-start-2" : ""
                }`}
              >
                <span className="text-sm text-muted-foreground flex items-center justify-end">
                  Next post
                  <ArrowRight className="ml-1 h-3 w-3" />
                </span>
                <span className="font-medium text-right group-hover:text-foreground/80">{nextPost.title}</span>
              </Link>
            )}
          </div>

          {/* Comments section */}
          {id && <CommentSection postId={id} />}
          
        </article>
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <Separator className="my-8" />
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  
  );
}

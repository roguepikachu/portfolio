import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadBlogPosts } from '@/utils/content-loader';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar, Clock, Copy, Check, Facebook, Twitter, FileText, Loader2 } from 'lucide-react';
import { BlogPost as BlogPostType } from '@/types/blog';
import { BlogPostCard } from '@/components/blog-post-card';
import { MarkdownRenderer, calculateReadingTime } from '@/utils/markdown-utils';
import { toast } from 'sonner';
import { CommentSection } from '@/components/blog/CommentSection';
import { VotingButtons } from '@/components/VotingButtons';
import { LoadingDots } from '@/components/ui/LoadingDots';
import { delay } from '@/utils/delay';
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import styles from './BlogPost.module.css';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [nextPost, setNextPost] = useState<BlogPostType | null>(null);
  const [prevPost, setPrevPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const loadPostData = async () => {
      if (!id) return;
      try {
        const posts = await loadBlogPosts();
        const currentPost = posts.find(p => p.id === id);
        if (!currentPost) {
          setLoading(false);
          return;
        }
        setPost(currentPost);
        
        // Find related posts based on tags
        const related = posts
          .filter(p => p.id !== id && p.tags.some(tag => currentPost.tags.includes(tag)))
          .slice(0, 2);
        setRelatedPosts(related);
        
        // Find previous and next posts
        const currentIndex = posts.findIndex(p => p.id === id);
        setPrevPost(currentIndex > 0 ? posts[currentIndex - 1] : null);
        setNextPost(currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null);
        
        await delay(); // Use default delay
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    loadPostData();

    return () => {
      subscription.unsubscribe();
    };
  }, [id]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
    toast.success('Link copied to clipboard');
  };
  
  const shareOnSocialMedia = (platform: 'facebook' | 'twitter' | 'linkedin') => {
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
  
  if (loading) {
    return (
      <div className={`container ${styles.loadingContainer}`}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingIconWrapper}>
            <FileText className={styles.loadingIcon} />
          </div>
          <div className={styles.loadingTextWrapper}>
            <h2 className={styles.loadingTitle}>Reading between the lines...</h2>
            <p className={styles.loadingMessage}>Loading your article with care</p>
          </div>
          <LoadingDots size="sm" />
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className={`container ${styles.notFoundContainer}`}>
        <div className={styles.notFoundContent}>
          <p className={styles.notFoundTitle}>Post not found</p>
          <Button variant="link" asChild className={styles.backToBlogButton}>
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
    <div className={`container ${styles.container}`}>
      <div className={styles.wrapper}>
        {/* Back to blog link */}
        <Link 
          to="/blog" 
          className={styles.backLink}
        >
          <ArrowLeft className={styles.backIcon} />
          Back to all posts
        </Link>
        
        {/* Post header */}
        <article>
          <header className={styles.postHeader}>
            <div className={styles.badgesWrapper}>
              {post.pinned && (
                <Badge variant="outline" className={styles.pinnedBadge}>
                  Pinned
                </Badge>
              )}
              {post.release && (
                <Badge variant="outline" className={styles.newBadge}>
                  New
                </Badge>
              )}
            </div>
            
            <h1 className={styles.postTitle}>
              {post.title}
            </h1>
            
            <div className={styles.postMeta}>
              <div className={styles.metaItem}>
                <Calendar className={styles.metaIcon} />
                <time dateTime={post.date}>{formattedDate}</time>
              </div>
              
              {!!readingTime && (
                <div className={styles.metaItem}>
                  <Clock className={styles.metaIcon} />
                  <span>{readingTime} min read</span>
                </div>
              )}
            </div>
            
            <div className={styles.tagsWrapper}>
              {post.tags.map(tag => (
                <Link to={`/blog?tag=${tag}`} key={tag}>
                  <Badge variant="secondary" className={styles.tagLink}>
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Voting buttons */}
            <div className={styles.votingWrapper}>
              <VotingButtons itemId={post.id} itemType="blog" />
            </div>
          </header>
          
          {/* Post content */}
          {post.content ? (
            <MarkdownRenderer content={post.content} />
          ) : (
            <p className={styles.contentPlaceholder}>No content available for this post.</p>
          )}

          {/* Share buttons */}
          <div className={styles.shareSection}>
            <span className={styles.shareLabel}>Share this post:</span>
            <Button 
              variant="outline" 
              size="sm" 
              className={styles.shareButton} 
              onClick={() => shareOnSocialMedia('facebook')}
            >
              <Facebook className={styles.shareIcon} />
              <span className={styles.screenReaderOnly}>Share on Facebook</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={styles.shareButton} 
              onClick={() => shareOnSocialMedia('twitter')}
            >
              <Twitter className={styles.shareIcon} />
              <span className={styles.screenReaderOnly}>Share on Twitter</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyToClipboard} 
              className={styles.shareButtonCopy}
            >
              {linkCopied ? (
                <>
                  <Check className={styles.shareIconSmall} />
                  Copied
                </>
              ) : (
                <>
                  <Copy className={styles.shareIconSmall} />
                  Copy Link
                </>
              )}
            </Button>
          </div>
          
          {/* Post navigation */}
          <div className={styles.postNavigation}>
            {prevPost && (
              <Link
                to={`/blog/${prevPost.id}`}
                className={`group ${styles.navLink}`}
              >
                <span className={styles.navLabel}>
                  <ArrowLeft className={styles.navIcon} />
                  Previous post
                </span>
                <span className={styles.navTitle}>{prevPost.title}</span>
              </Link>
            )}
            {nextPost && (
              <Link
                to={`/blog/${nextPost.id}`}
                className={`group ${!prevPost ? styles.navLinkNextSingle : styles.navLinkNext}`}
              >
                <span className={styles.navLabelNext}>
                  Next post
                  <ArrowRight className={styles.navIconNext} />
                </span>
                <span className={styles.navTitleNext}>{nextPost.title}</span>
              </Link>
            )}
          </div>

          {/* Comments section */}
          {id && <CommentSection postId={id} currentUser={currentUser} />}
          
        </article>
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className={styles.relatedSection}>
            <Separator className={styles.relatedSeparator} />
            <h2 className={styles.relatedTitle}>Related Posts</h2>
            <div className={styles.relatedGrid}>
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

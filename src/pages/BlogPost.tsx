
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { blogPosts } from '@/data/blog-posts';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar, Clock, MessageCircle, ThumbsUp, Share, Copy, Check, Image, Paperclip, Facebook, Twitter, Linkedin } from 'lucide-react';
import { BlogPost as BlogPostType } from '@/types/blog';
import { BlogPostCard } from '@/components/blog-post-card';
import { MarkdownRenderer, calculateReadingTime } from '@/utils/markdown-utils';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Interfaces for comments and related features
interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  replies: Comment[];
  userHasLiked: boolean;
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [nextPost, setNextPost] = useState<BlogPostType | null>(null);
  const [prevPost, setPrevPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  
  // New state for comments and related features
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showAttachmentUpload, setShowAttachmentUpload] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    // Find current post
    const currentPostIndex = blogPosts.findIndex(p => p.id === id);
    if (currentPostIndex === -1) return;
    
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

    // Mock comments data - in a real app this would come from an API
    setComments([
      {
        id: '1',
        author: 'John Doe',
        content: 'This is a great article! I particularly liked the section about React hooks.',
        date: '2023-05-01T12:00:00Z',
        likes: 5,
        userHasLiked: false,
        replies: [
          {
            id: '1-1',
            author: 'Jane Smith',
            content: 'I agree, the hooks explanation was very clear.',
            date: '2023-05-01T14:30:00Z',
            likes: 2,
            userHasLiked: false,
            replies: []
          }
        ]
      },
      {
        id: '2',
        author: 'Alex Johnson',
        content: 'Here\'s an example of code formatting in comments:\n```javascript\nconst greeting = "Hello world";\nconsole.log(greeting);\n```',
        date: '2023-05-02T09:15:00Z',
        likes: 3,
        userHasLiked: true,
        replies: []
      }
    ]);
    
  }, [id]);
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // In a real app, you would send this to an API
    const newCommentObj: Comment = {
      id: `${Date.now()}`,
      author: 'Current User', // In a real app, this would be the logged-in user
      content: newComment,
      date: new Date().toISOString(),
      likes: 0,
      userHasLiked: false,
      replies: []
    };
    
    setComments(prev => [newCommentObj, ...prev]);
    setNewComment('');
    toast.success('Comment added successfully');
  };
  
  const handleReplySubmit = (commentId: string) => {
    if (!replyContent.trim()) return;
    
    // In a real app, you would send this to an API
    const newReply: Comment = {
      id: `${commentId}-${Date.now()}`,
      author: 'Current User', // In a real app, this would be the logged-in user
      content: replyContent,
      date: new Date().toISOString(),
      likes: 0,
      userHasLiked: false,
      replies: []
    };
    
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      }
      return comment;
    }));
    
    setReplyToId(null);
    setReplyContent('');
    toast.success('Reply added successfully');
  };
  
  const toggleLike = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(prev => prev.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                const userHasLiked = !reply.userHasLiked;
                return {
                  ...reply,
                  likes: userHasLiked ? reply.likes + 1 : reply.likes - 1,
                  userHasLiked
                };
              }
              return reply;
            })
          };
        }
        return comment;
      }));
    } else {
      setComments(prev => prev.map(comment => {
        if (comment.id === commentId) {
          const userHasLiked = !comment.userHasLiked;
          return {
            ...comment,
            likes: userHasLiked ? comment.likes + 1 : comment.likes - 1,
            userHasLiked
          };
        }
        return comment;
      }));
    }
  };
  
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
  
  const handleImageUpload = () => {
    // In a real app, this would trigger a file upload dialog
    toast.info('Image upload functionality would be implemented here');
    setShowImageUpload(false);
  };
  
  const handleAttachmentUpload = () => {
    // In a real app, this would trigger a file upload dialog
    toast.info('File attachment functionality would be implemented here');
    setShowAttachmentUpload(false);
  };
  
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
              className="rounded-full" 
              onClick={() => shareOnSocialMedia('linkedin')}
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">Share on LinkedIn</span>
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
          <section className="mt-16">
            <Separator className="my-8" />
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Comments ({comments.length})
            </h2>
            
            {/* Add comment form */}
            <form onSubmit={handleCommentSubmit} className="mt-6">
              <div className="space-y-4">
                <Textarea 
                  placeholder="Write a comment... Markdown and code blocks are supported."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowImageUpload(!showImageUpload)}
                    >
                      <Image className="h-4 w-4 mr-1" />
                      Add Image
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowAttachmentUpload(!showAttachmentUpload)}
                    >
                      <Paperclip className="h-4 w-4 mr-1" />
                      Attach File
                    </Button>
                  </div>
                  <Button type="submit" disabled={!newComment.trim()}>
                    Submit Comment
                  </Button>
                </div>
              </div>
              
              {showImageUpload && (
                <div className="mt-4 p-4 border rounded-md">
                  <p className="text-sm mb-2">Upload an image:</p>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                      placeholder="Image URL or upload" 
                    />
                    <Button size="sm" onClick={handleImageUpload}>Upload</Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowImageUpload(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="mt-2">
                    <label className="text-sm">Alt text (for accessibility):</label>
                    <input 
                      type="text" 
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                      placeholder="Describe this image" 
                    />
                  </div>
                </div>
              )}
              
              {showAttachmentUpload && (
                <div className="mt-4 p-4 border rounded-md">
                  <p className="text-sm mb-2">Attach a file (PDF, ZIP, etc.):</p>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                      placeholder="File URL or upload"
                    />
                    <Button size="sm" onClick={handleAttachmentUpload}>Upload</Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowAttachmentUpload(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </form>
            
            {/* Display comments */}
            <div className="mt-8 space-y-8">
              {comments.map((comment) => (
                <div key={comment.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <Button 
                      variant={comment.userHasLiked ? "secondary" : "ghost"} 
                      size="sm"
                      onClick={() => toggleLike(comment.id)}
                      className="gap-1"
                    >
                      <ThumbsUp className={`h-4 w-4 ${comment.userHasLiked ? "text-primary" : ""}`} />
                      {comment.likes}
                    </Button>
                  </div>
                  
                  {/* Parse comment content - in this demo, we're displaying the markdown */}
                  <div className="mt-2 text-sm">
                    <MarkdownRenderer content={comment.content} />
                  </div>
                  
                  {/* Reply actions */}
                  <div className="mt-2 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
                    >
                      {replyToId === comment.id ? "Cancel" : "Reply"}
                    </Button>
                  </div>
                  
                  {/* Reply form */}
                  {replyToId === comment.id && (
                    <div className="mt-4 pl-4 border-l-2">
                      <Textarea 
                        placeholder="Write a reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <div className="mt-2 flex justify-end">
                        <Button 
                          size="sm"
                          onClick={() => handleReplySubmit(comment.id)}
                          disabled={!replyContent.trim()}
                        >
                          Submit Reply
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Display replies */}
                  {comment.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="border-t pt-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">{reply.author}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(reply.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                            <Button 
                              variant={reply.userHasLiked ? "secondary" : "ghost"} 
                              size="sm"
                              onClick={() => toggleLike(reply.id, true, comment.id)}
                              className="gap-1"
                            >
                              <ThumbsUp className={`h-4 w-4 ${reply.userHasLiked ? "text-primary" : ""}`} />
                              {reply.likes}
                            </Button>
                          </div>
                          <div className="mt-2 text-sm">
                            <MarkdownRenderer content={reply.content} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
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

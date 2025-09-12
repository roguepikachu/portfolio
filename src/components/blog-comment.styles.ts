// Blog comment component style classes

export const blogCommentStyles = {
  comment: {
    wrapper: "space-y-3",
    
    header: {
      wrapper: "flex items-start justify-between",
      
      author: {
        wrapper: "flex items-center gap-2",
        avatar: "h-8 w-8 rounded-full",
        avatarFallback: "text-xs",
        name: "font-medium",
        date: "text-sm text-muted-foreground"
      }
    },
    
    content: "text-sm",
    
    actions: {
      wrapper: "flex items-center gap-4",
      
      likeButton: {
        base: "flex items-center gap-1 text-sm",
        default: "text-muted-foreground hover:text-foreground",
        liked: "text-primary"
      },
      
      replyButton: "text-sm text-muted-foreground hover:text-foreground"
    },
    
    replyForm: {
      wrapper: "mt-3 space-y-3 rounded-lg bg-muted/50 p-3",
      textarea: "min-h-[80px] resize-none text-sm",
      actions: "flex justify-end gap-2",
      button: "h-8 text-xs"
    }
  },
  
  replies: {
    wrapper: "ml-8 mt-3 space-y-3 border-l-2 pl-4"
  }
};
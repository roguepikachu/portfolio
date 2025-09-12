// Auth button component style classes

export const authButtonStyles = {
  // Button states
  button: {
    loading: "cursor-not-allowed opacity-50"
  },
  
  // User menu
  userMenu: {
    trigger: {
      wrapper: "flex items-center gap-2",
      avatar: "h-8 w-8",
      avatarFallback: "text-xs",
      name: "hidden sm:inline-block text-sm font-medium"
    },
    
    dropdown: {
      wrapper: "w-56",
      
      header: {
        wrapper: "flex items-center gap-3 p-2",
        avatar: "h-10 w-10",
        avatarFallback: "text-sm",
        info: {
          wrapper: "flex-1 space-y-1",
          name: "text-sm font-medium",
          email: "text-xs text-muted-foreground"
        }
      },
      
      separator: "my-1",
      
      item: {
        base: "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        default: "hover:bg-accent hover:text-accent-foreground",
        destructive: "text-destructive hover:bg-destructive/10"
      }
    }
  },
  
  // Auth dialog
  dialog: {
    content: {
      wrapper: "sm:max-w-md",
      
      header: {
        title: "",
        description: ""
      },
      
      providers: {
        wrapper: "space-y-3",
        
        button: {
          base: "w-full justify-start",
          icon: "mr-2 h-4 w-4"
        }
      },
      
      divider: {
        wrapper: "relative my-4",
        line: "absolute inset-0 flex items-center",
        border: "w-full border-t",
        text: {
          wrapper: "relative flex justify-center text-xs uppercase",
          background: "bg-background px-2 text-muted-foreground"
        }
      },
      
      emailForm: {
        wrapper: "space-y-4",
        input: "w-full",
        button: {
          base: "w-full",
          loading: "cursor-not-allowed opacity-50"
        }
      },
      
      success: {
        wrapper: "rounded-lg bg-green-50 p-4 dark:bg-green-900/20",
        text: "text-sm text-green-800 dark:text-green-200"
      }
    }
  }
};
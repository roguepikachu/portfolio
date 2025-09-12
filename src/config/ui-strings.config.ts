// UI Strings Configuration - Contains all user-facing text strings

export const uiStrings = {
  // Page-specific strings
  pages: {
    home: {
      loading: {
        title: "Crafting digital experiences...",
        message: "Loading the portfolio with passion, creativity, and a touch of magic"
      },
      sections: {
        moreTalks: {
          title: "More Talks Coming Soon",
          badge: "Coming Soon",
          description: "Stay tuned for upcoming presentations and workshop sessions on distributed systems, AI/ML implementations, and cloud-native architectures."
        },
        blogDescription: "Thoughts, ideas, and tutorials",
        publicationsDescription: "Academic papers and research articles"
      },
      errors: {
        loadingData: "Error loading data:"
      }
    },
    
    about: {
      careerTimeline: {
        defaultTitle: "Career Journey",
        keyAchievements: "Key Achievements",
        coreResponsibilities: "Core Responsibilities",
        keyMilestones: "Key Milestones",
        promoted: "Promoted",
        newOpportunity: "New Opportunity"
      },
      profileInitials: "AK",
      downloadResume: "Download Resume"
    },
    
    blog: {
      loading: {
        title: "Loading amazing content...",
        message: "Just a moment while we fetch the latest blog posts"
      },
      search: {
        placeholder: "Search posts...",
        clearLabel: "Clear search"
      },
      filters: {
        tagLabel: "Filter by tag",
        clearButton: "Clear",
        allTags: "All Tags",
        selectedTags: "Selected tags",
        clearAllFilters: "Clear all filters"
      },
      empty: "No posts found matching your criteria.",
      navigation: {
        backToBlog: "Back to Blog",
        backToAllPosts: "Back to all posts"
      }
    },
    
    blogPost: {
      loading: {
        title: "Reading between the lines...",
        message: "Loading your article with care"
      },
      notFound: "Post not found",
      badges: {
        pinned: "Pinned",
        new: "New"
      },
      readTime: "min read",
      share: {
        label: "Share this post:",
        facebook: "Share on Facebook",
        twitter: "Share on Twitter",
        copyLink: "Copy Link",
        copied: "Copied"
      },
      navigation: {
        previous: "Previous post",
        next: "Next post"
      },
      relatedPosts: "Related Posts"
    },
    
    projects: {
      loading: {
        title: "Building something awesome...",
        message: "Compiling the latest projects and innovations"
      },
      title: "Projects",
      description: "A collection of my personal and professional projects.",
      search: {
        placeholder: "Search projects...",
        clearLabel: "Clear search"
      },
      filters: {
        tagLabel: "Filter by tag",
        clearButton: "Clear",
        allTags: "All Tags",
        selectedTags: "Selected tags",
        clearFilters: "Clear filters"
      },
      empty: "No projects found matching your criteria.",
      navigation: {
        backToProjects: "Back to Projects",
        backToAllProjects: "Back to all projects"
      },
      buttons: {
        viewOnGithub: "View on GitHub",
        liveDemo: "Live Demo"
      },
      fallbackText: "For more details about this project, check out the GitHub repository.",
      relatedProjects: "Related Projects"
    },
    
    project: {
      loading: {
        title: "Compiling project...",
        message: "Executing code and loading features"
      },
      notFound: "Project not found"
    },
    
    publications: {
      loading: {
        title: "Curating knowledge...",
        message: "Gathering the latest publications and research"
      },
      title: "Publications",
      description: "Academic papers, articles, and research publications",
      search: {
        placeholder: "Search publications...",
        clearLabel: "Clear search"
      },
      filters: {
        tagLabel: "Filter by tag",
        yearLabel: "Filter by year",
        clearButton: "Clear",
        tagPlaceholder: "Select a tag to filter",
        yearPlaceholder: "Select a year",
        allTags: "All Tags",
        allYears: "All Years",
        clearAllFilters: "Clear all filters"
      },
      empty: "No publications found matching your criteria.",
      navigation: {
        backToPublications: "Back to Publications",
        backToAllPublications: "Back to all publications"
      },
      buttons: {
        viewPublication: "View Publication",
        doi: "DOI"
      },
      fallbackText: "For the complete publication, please visit the link above.",
      relatedPublications: "Related Publications"
    },
    
    publication: {
      loading: {
        title: "Loading publication...",
        message: "Preparing academic content and insights"
      },
      notFound: "Publication not found"
    },
    
    notFound: {
      code: "404",
      message: "Oops! Page not found",
      returnHome: "Return to Home"
    },
    
    index: {
      welcome: "Welcome to Your Blank App",
      description: "Start building your amazing project here!"
    },
    
    authCallback: {
      error: "Error handling auth callback:"
    }
  },
  
  // Component-specific strings
  components: {
    mainNav: {
      toggleMenu: "Toggle menu",
      noResults: "No results found.",
      searchCategories: {
        blogPosts: "Blog Posts",
        projects: "Projects",
        publications: "Publications"
      },
      typeLabels: {
        blogPost: "Blog Post",
        project: "Project",
        publication: "Publication"
      }
    },
    
    layout: {
      footer: {
        copyright: (year: number) => `© ${year} Ayush Kumar. All rights reserved.`,
        links: {
          github: "GitHub",
          linkedin: "LinkedIn"
        }
      }
    },
    
    contactModal: {
      title: "Contact Me",
      description: "Feel free to reach out via email.",
      emailLabel: "Email",
      copyEmailLabel: "Copy email",
      closeButton: "Close"
    },
    
    themeToggle: {
      label: "Toggle dark mode"
    },
    
    votingButtons: {
      errors: {
        signInRequired: "Please sign in to vote",
        voteFailed: "Failed to record vote"
      }
    },
    
    blogComment: {
      errors: {
        signInToLike: "Please sign in to like comments",
        likeFailed: "Failed to update like",
        signInToReply: "Please sign in to reply"
      },
      buttons: {
        cancel: "Cancel",
        reply: "Reply",
        submitReply: "Submit Reply"
      },
      replyPlaceholder: "Write a reply..."
    },
    
    commentSection: {
      title: "Comments",
      placeholder: "Write a comment...",
      buttons: {
        posting: "Posting...",
        postComment: "Post Comment"
      },
      signInPrompt: "Please sign in to leave a comment.",
      loading: "Loading comments...",
      empty: "No comments yet. Be the first to comment!"
    },
    
    profileSlideshow: {
      slides: [
        { caption: "Building the future", date: "2024" },
        { caption: "Deep in code", date: "2023" },
        { caption: "Innovation mindset", date: "2024" },
        { caption: "Crafting solutions", date: "2023" }
      ],
      status: {
        playing: "Playing",
        paused: "Paused"
      }
    },
    
    authButton: {
      loading: "Loading...",
      signIn: "Sign In",
      signOut: "Sign out",
      dialogTitle: "Sign in",
      dialogDescription: "Enter your email to receive a magic link for instant sign-in",
      providers: {
        google: "Google",
        github: "GitHub",
        facebook: "Facebook"
      },
      magicLink: {
        separator: "Or continue with magic link",
        placeholder: "name@example.com",
        sending: "Sending magic link...",
        sendButton: "Send Magic Link",
        successMessage: "🎉 Magic link sent! Check your email inbox and click the link to sign in."
      },
      errors: {
        authFailed: "Authentication failed",
        logoutFailed: "Failed to log out"
      },
      messages: {
        loggedOut: "You have been logged out"
      },
      fallbackName: "User"
    }
  },
  
  // Common UI elements
  common: {
    badges: {
      featured: "Featured",
      new: "New",
      pinned: "Pinned",
      liveEvent: "Live Event",
      comingSoon: "Coming Soon"
    },
    buttons: {
      code: "Code",
      demo: "Demo",
      liveDemo: "Live Demo",
      viewProject: "View Project",
      viewPublication: "View Publication",
      viewOnGithub: "View on GitHub",
      viewDetails: "View Details",
      readMore: "Read More",
      contact: "Contact",
      contactMe: "Contact Me",
      downloadResume: "Download Resume",
      close: "Close",
      cancel: "Cancel",
      submit: "Submit",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      back: "Back",
      next: "Next",
      previous: "Previous",
      clear: "Clear",
      clearAll: "Clear all",
      searchClear: "Clear search",
      filterClear: "Clear filters"
    }
  }
};

// Type-safe string getter functions
export type UIStrings = typeof uiStrings;

// Helper function to get nested string values
export const getString = (path: string): string => {
  const keys = path.split('.');
  let value: any = uiStrings;
  
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) {
      console.warn(`String not found for path: ${path}`);
      return path; // Return the path as fallback
    }
  }
  
  return typeof value === 'function' ? value : String(value);
};
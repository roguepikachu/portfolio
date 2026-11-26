export const siteConfig = {
  // Personal Information
  personal: {
    name: "Ayush Kumar",
    initials: "AK",
    email: "kumar.ayush.cs@gmail.com",
    greeting: "Hi, I'm Ayush",
    shortBio: "Hi, I'm Ayush Kumar",
    fullBio: `I'm a software engineer at Guidewire, working mostly with Go, Kubernetes and cloud infrastructure.

Outside of work I follow whatever I'm curious about. Lately that's distributed systems, and whether AI tools are actually making us better engineers. This site is where all of that ends up: blog posts, side projects, and talks I've given. It's a personal space, but it's open, so feel free to look around.`,
    aboutBio: `On the internet I'm roguepikachu. I picked the name after I started rewatching Pokémon. There's an episode where Ash's Pikachu finds a whole group of wild Pikachu and could stay with them for good, but he walks back out to keep travelling with Ash. Leaving the comfortable option behind to go find your own adventure felt like a properly rogue move to me, and that's where the name comes from.

The rest of the time I'm a software engineer at Guidewire. I work mostly in Go and Kubernetes, on backend services, CI/CD pipelines and the infrastructure that keeps them running in production. I like keeping systems simple enough that the next person can follow them.

I have a background in AI and data systems, though my opinions about AI change roughly every quarter. Outside of work I write here, give the odd talk, and contribute to open source when I find something worth fixing.`,
  },

  // Social Links
  social: {
    github: "https://github.com/roguepikachu",
    linkedin: "https://www.linkedin.com/in/cs-ayush-kumar/",
    githubUsername: "roguepikachu",
    linkedinUsername: "cs-ayush-kumar",
  },

  // External Links
  external: {
    resumePath: "/resume.pdf",
    featuredVideoUrl: "https://www.youtube.com/embed/zVwOelL1iI4?start=167",
    kubevelaVideoUrl:
      "https://www.youtube.com/embed/MOkPoKh0-hA?si=DSxFyJUbzf3PMt9g",
    meetupEventUrl: "https://www.meetup.com/collabnix/events/300163572/",
  },

  // Navigation
  navigation: {
    main: [
      { name: "Home", href: "/" },
      { name: "Projects", href: "/projects" },
      { name: "Publications", href: "/publications" },
      { name: "Blog", href: "/blog" },
      { name: "About", href: "/about" },
    ],
  },

  // Page Metadata
  pages: {
    home: {
      title: "Home",
      description: "Welcome to my portfolio",
    },
    projects: {
      title: "Projects",
      description: "A collection of my personal and professional projects.",
    },
    blog: {
      title: "Blog",
      description:
        "Sharing ideas, insights, and lessons learned from navigating the tech world.",
    },
    publications: {
      title: "Publications",
      description: "Academic papers, articles, and research publications",
    },
    about: {
      title: "About Me",
      description: "Learn more about my journey and experience",
    },
  },

  // Section Headings
  sections: {
    talks: {
      title: "My Talks & Presentations",
      description:
        "Sharing knowledge and insights with the community through talks, workshops, and presentations",
    },
    featuredTalk: {
      title: "Terraform to Crossplane: The Art of Zero-Downtime Migration",
      subtitle: "KCD Kochi 2026",
      description:
        "How to hand existing cloud infrastructure over from Terraform to Crossplane without recreating resources or interrupting the services that depend on them.",
      badge: "Live Event",
    },
    kubevelaTalk: {
      title:
        "Platform Engineering with Kubevela - Shipping Applications the Cloud Native Way",
      subtitle: "Tech Talk",
      description:
        "Explored how KubeVela simplifies application delivery in cloud-native environments by providing a unified platform for developers and operators. Demonstrated practical approaches to managing application lifecycle, deployments, and scaling using modern platform engineering principles.",
      badge: "Live Event",
    },
    collabnixMeetup: {
      title: "jsPolicy - Easier & Faster Kubernetes Policies ",
      subtitle: "A Show and Tell Collabnix Meetup",
      description:
        "Presented jsPolicy, a powerful JavaScript-based policy engine for Kubernetes that simplifies policy creation and enforcement. Demonstrated how jsPolicy enables developers to write more intuitive and maintainable admission controllers using familiar JavaScript or TypeScript syntax.",
    },
    recentPosts: {
      title: "Recent Blog Posts",
      viewAllText: "View All Posts",
    },
    featuredPublications: {
      title: "Featured Publications",
      viewAllText: "View All Publications",
    },
    featuredProjects: {
      title: "Featured Projects",
      description: "Check out some of my latest work",
      viewAllText: "View All Projects",
    },
    professionalJourney: {
      title: "Professional Journey",
    },
    techStack: {
      title: "Tech Stack",
    },
    education: {
      title: "Education",
    },
    openSource: {
      title: "Open Source & Community",
    },
  },

  // UI Labels
  ui: {
    buttons: {
      contact: "Contact",
      contactMe: "Contact Me",
      signIn: "Sign In",
      signOut: "Sign Out",
      githubProfile: "GitHub Profile",
      linkedin: "LinkedIn",
      viewOnGithub: "View on GitHub",
      code: "Code",
      demo: "Demo",
      liveDemo: "Live Demo",
      downloadResume: "Download Resume",
      returnHome: "Return to Home",
      sendMagicLink: "Send Magic Link",
      postComment: "Post Comment",
      viewDetails: "View Details",
      readMore: "Read More",
      viewProject: "View Project",
      featured: "Featured",
      liveEvent: "Live Event",
    },
    placeholders: {
      searchGlobal: "Search blog posts, projects, publications...",
      searchProjects: "Search projects...",
      searchBlog: "Search blog posts...",
      email: "name@example.com",
      comment: "Write a comment...",
    },
    filters: {
      filterByTag: "Filter by tag",
      allTags: "All Tags",
      searchCategories: {
        blog: "Blog Posts",
        projects: "Projects",
        publications: "Publications",
      },
    },
    badges: {
      featured: "Featured",
      liveEvent: "Live Event",
      new: "New",
      comingSoon: "Coming Soon",
    },
  },

  // Loading States
  loading: {
    home: {
      title: "Crafting digital experiences...",
      message:
        "Loading the portfolio with passion, creativity, and a touch of magic",
    },
    projects: {
      title: "Building something awesome...",
      message: "Compiling the latest projects and innovations",
    },
    blog: {
      title: "Loading amazing content...",
      message: "Just a moment while we fetch the latest blog posts",
    },
    publications: {
      title: "Gathering research...",
      message: "Loading publications and academic work",
    },
  },

  // Messages & Notifications
  messages: {
    auth: {
      signInRequired: "Please sign in to continue",
      signInToVote: "Please sign in to vote",
      signInToComment: "Please sign in to leave a comment.",
      authFailed: "Authentication failed",
      signInSuccess: "Successfully signed in",
      signOutSuccess: "Successfully signed out",
      magicLinkSent:
        "🎉 Magic link sent! Check your email inbox and click the link to sign in.",
      magicLinkDescription:
        "Enter your email to receive a magic link for instant sign-in",
    },
    errors: {
      pageNotFound: "Oops! Page not found",
      pageNotFoundCode: "404",
      voteFailure: "Failed to record vote",
      loadError: "Failed to load content",
      networkError: "Network error. Please try again.",
      genericError: "Something went wrong. Please try again.",
    },
    success: {
      emailCopied: "Email copied to clipboard",
      phoneCopied: "Phone copied to clipboard",
      linkCopied: "Link copied to clipboard",
      saved: "Successfully saved",
      deleted: "Successfully deleted",
    },
    empty: {
      noComments: "No comments yet. Be the first to comment!",
      noProjects: "No projects found",
      noPosts: "No blog posts found",
      noPublications: "No publications found",
      noResults: "No results found",
    },
  },

  // OAuth Providers
  auth: {
    providers: {
      google: "Google",
      github: "GitHub",
      facebook: "Facebook",
    },
    modalTitle: "Sign in",
    modalDescription: "Choose your preferred sign-in method",
  },

  // Footer
  footer: {
    copyright: "© 2024 Ayush Kumar. All rights reserved.",
  },

  // Theme
  theme: {
    storageKey: "devscribe-theme",
  },

  // Router
  router: {
    basePath: "/portfolio",
  },
};

// Type-safe config getter
export type SiteConfig = typeof siteConfig;

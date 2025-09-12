export const siteConfig = {
  // Personal Information
  personal: {
    name: "Ayush Kumar",
    initials: "AK",
    email: "kumar.ayush.cs@gmail.com",
    role: "Researcher, Developer, Writer",
    tagline: "Engineer by trade, Designer by instinct, and Writer by habit",
    shortBio: "Hi, I'm Ayush Kumar",
    fullBio: `Hey there, I see you've stumbled across my portfolio. Since you're here, I'm Ayush. I'm a software engineer who likes building backend systems that actually hold up under pressure: scalable, resilient, and clean. I've got a bias for minimalism, so I keep things simple and straightforward wherever I can. Most of the time I'm experimenting with new tech, hacking together projects, or diving deep into cloud infrastructure and distributed systems. I'm also trying to pick up some guitar skills (slowly but surely), and when I need a break, fictional story-driven games have me hooked. Uncharted in particular — man, that's some serious storytelling and adventure.

Pretty much always down to chat about code, cloud architectures, or why AI is either going to save us all or make us completely obsolete — haven't decided which yet! What brings you here?`,
    aboutBio: `I work mostly with Go, Kubernetes, and cloud infrastructure — building backend systems that are meant to scale and stay up. My focus is on clean, maintainable architecture, automation, and performance. I've spent a lot of time designing microservices, setting up CI/CD pipelines, and getting things to run smoothly in production. I have a strong foundation in AI and data systems, with hands-on experience in applying machine learning where it genuinely improves outcomes — and the judgment to avoid it where simpler solutions are more effective.

Outside of code, I write technical articles, contribute to open-source when I can, and keep learning whatever tool or system looks like it'll help me do better work. Not big on fluff. Just here to build useful stuff and keep improving.`,
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
    featuredVideoUrl:
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
      title: "Platform Engineering with Kubevela - Shipping Applications the Cloud Native Way",
      subtitle: "Featured Tech Talk",
      description: "Explored how KubeVela simplifies application delivery in cloud-native environments by providing a unified platform for developers and operators. Demonstrated practical approaches to managing application lifecycle, deployments, and scaling using modern platform engineering principles.",
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
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        tools: "Tools & DevOps",
      },
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
export interface CareerRole {
  id: string;
  title: string;
  period: string;
  achievements: string[];
  responsibilities?: string[];
  milestones?: string[];
}

export interface CareerCompany {
  id: string;
  company: string;
  location?: string;
  overallPeriod: string;
  type: 'company';
  roles: CareerRole[];
}

export const careerData: CareerCompany[] = [
  {
    id: "guidewire",
    company: "Guidewire Software Inc.",
    location: "Remote",
    overallPeriod: "Jun 2021 – Present",
    type: "company",
    roles: [
      {
        id: "swe2-guidewire",
        title: "Software Engineer II",
        period: "Jan 2023 – Present",
        achievements: [
          "Spearheaded the design and implementation of scalable microservice architectures using Go, contributing to high-availability systems deployed on AWS",
          "Led end-to-end service development — from architectural design to production rollout — ensuring modularity, fault tolerance, and ease of integration across systems",
          "Automated containerized deployments using Docker, Kubernetes (EKS), and KubeVela, enabling GitOps-driven workflows and significantly reducing deployment overhead"
        ],
        responsibilities: [
          "Managed infrastructure as code with Terraform/Crossplane, ensuring environment consistency",
          "Advocated and implemented test-driven development (TDD) practices across services",
          "Built and maintained CI/CD pipelines with TeamCity and GitHub Actions"
        ],
        milestones: [
          "Reduced deployment time by 60%",
          "Improved test coverage to 85%",
          "Led team of 4 engineers",
          "Optimized database performance by 40%"
        ]
      },
      {
        id: "swe1-guidewire",
        title: "Software Engineer I",
        period: "Jun 2022 – Dec 2022",
        achievements: [
          "Developed and maintained microservices using Go and Java, focusing on reliability and performance optimization",
          "Implemented comprehensive unit and integration testing suites, improving code quality and reducing production bugs",
          "Collaborated with cross-functional teams to deliver features on time and within scope"
        ],
        responsibilities: [
          "Backend service development and maintenance",
          "Code review and mentoring junior developers",
          "API design and documentation"
        ],
        milestones: [
          "Achieved 95% code coverage",
          "Delivered 12 major features",
          "Mentored 2 junior engineers"
        ]
      },
      {
        id: "intern-guidewire",
        title: "Software Engineer Intern",
        period: "Jun 2021 – May 2022",
        achievements: [
          "Built and deployed RESTful APIs using Go and Spring Boot, serving thousands of daily requests",
          "Contributed to the migration of legacy systems to cloud-native architectures",
          "Participated in agile development processes and learned industry best practices"
        ],
        responsibilities: [
          "Feature development under senior engineer guidance",
          "Bug fixes and code refactoring",
          "Technical documentation and testing"
        ],
        milestones: [
          "Completed 8 sprint deliverables",
          "Fixed 25+ production issues",
          "Earned full-time offer"
        ]
      }
    ]
  },
  {
    id: "amazon",
    company: "Amazon",
    overallPeriod: "Jul 2022",
    type: "company",
    roles: [
      {
        id: "amazon-ml",
        title: "ML Summer School Trainee",
        period: "Jul 2022",
        achievements: [
          "Selected for an intensive machine learning training program conducted by Amazon's ML scientists",
          "Gained hands-on experience with supervised/unsupervised learning, deep learning, and real-world ML pipelines",
          "Engaged in problem-solving sessions focused on scalable ML solutions used in industry applications"
        ],
        milestones: [
          "Top 5% performer in program",
          "Completed 8 ML projects",
          "Networked with 50+ ML engineers"
        ]
      }
    ]
  },
  {
    id: "cleareye",
    company: "Cleareye.ai",
    overallPeriod: "May 2022 – Jul 2022",
    type: "company",
    roles: [
      {
        id: "cleareye-ml",
        title: "Machine Learning Intern",
        period: "May 2022 – Jul 2022",
        achievements: [
          "Built and fine-tuned BERT and BiLSTM models for high-precision Named Entity Recognition (NER) in textual data",
          "Created and managed labeled datasets, contributing to improved data accuracy and NLP pipeline performance"
        ],
        responsibilities: [
          "Model development and fine-tuning",
          "Dataset creation and management",
          "Performance optimization and testing"
        ],
        milestones: [
          "Achieved 94% NER accuracy",
          "Processed 100K+ text samples",
          "Reduced inference time by 30%"
        ]
      }
    ]
  },
  {
    id: "feynn",
    company: "Feynn Labs",
    overallPeriod: "Apr 2022 – Jun 2022",
    type: "company",
    roles: [
      {
        id: "feynn-ml",
        title: "Machine Learning Intern",
        period: "Apr 2022 – Jun 2022",
        achievements: [
          "Prototyped AI-powered products and services, focusing on practical deployment and integration feasibility",
          "Performed market segmentation using machine learning and data analysis techniques to uncover business insights",
          "Contributed to financial and business modeling for AI-driven solutions, aligning tech output with market value"
        ],
        milestones: [
          "Delivered 3 AI prototypes",
          "Identified $2M market opportunity",
          "Presented to C-level executives"
        ]
      }
    ]
  },
  {
    id: "techbyheart",
    company: "TechByHeart",
    overallPeriod: "Feb 2022 – May 2022",
    type: "company",
    roles: [
      {
        id: "techbyheart-security",
        title: "Cyber Security Analyst Intern",
        period: "Feb 2022 – May 2022",
        achievements: [
          "Applied ML and analytics techniques to detect and respond to security threats in real-time",
          "Documented security protocols and supported compliance through data-driven threat analysis"
        ],
        responsibilities: [
          "Threat detection and analysis",
          "Security protocol documentation",
          "Compliance support and reporting"
        ],
        milestones: [
          "Detected 150+ security threats",
          "Improved response time by 25%",
          "Automated 3 security workflows"
        ]
      }
    ]
  }
];

export const techStack = {
  frontend: [
    "React.js",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "Redux",
    "Zustand"
  ],
  backend: [
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "GraphQL",
    "Firebase"
  ],
  tools: [
    "Git",
    "VS Code",
    "Docker",
    "Webpack",
    "Jest",
    "Testing Library",
    "Storybook",
    "GitHub Actions",
    "AWS"
  ]
};

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University Name",
    period: "2015 - 2019",
    description: "Graduated with honors. Specialized in web technologies and software engineering. Completed a senior project on real-time collaborative web applications."
  }
];

export const openSourceContributions = {
  contributions: {
    title: "Open Source Contributions",
    description: "Active contributor to several open-source projects including React-based libraries and developer tools.",
    linkText: "View on GitHub",
    linkUrl: "https://github.com/"
  },
  speakerWriter: {
    title: "Speaker & Writer",
    description: "Regularly speak at local meetups and occasionally at conferences. Published technical articles on web development.",
    linkText: "See Talks & Articles",
    linkUrl: "#"
  }
};
export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
  milestone?: boolean;
}

export const careerTimeline: TimelineItem[] = [
  {
    year: "2023-Present",
    title: "Senior Software Engineer",
    company: "Guidewire Software Inc.",
    description: "Leading cloud infrastructure initiatives and developing AI-driven solutions for insurance technology platforms.",
    achievements: [
      "Architected microservices handling 10M+ requests/day",
      "Reduced deployment time by 60% through CI/CD optimization",
      "Led team of 5 engineers on critical platform migration"
    ],
    technologies: ["Java", "Spring Boot", "AWS", "Kubernetes", "PostgreSQL"]
  },
  {
    year: "2022-2023",
    title: "Software Development Engineer",
    company: "Amazon",
    description: "Developed scalable solutions for AWS services, focusing on distributed systems and performance optimization.",
    achievements: [
      "Built service processing 100M+ events daily",
      "Improved system latency by 40%",
      "Contributed to 3 AWS service launches"
    ],
    technologies: ["Java", "Python", "DynamoDB", "Lambda", "CloudFormation"]
  },
  {
    year: "2021-2022",
    title: "Software Engineer",
    company: "Cleareye.ai",
    description: "Pioneered computer vision solutions for quality control in manufacturing, working with cutting-edge AI technologies.",
    achievements: [
      "Developed ML pipeline with 95% accuracy",
      "Reduced inspection time by 70%",
      "Deployed models serving 50+ manufacturing sites"
    ],
    technologies: ["Python", "TensorFlow", "Docker", "FastAPI", "MongoDB"]
  },
  {
    year: "2020-2021",
    title: "Full Stack Developer",
    company: "TechStartup Inc.",
    description: "Built end-to-end features for a SaaS platform, from database design to frontend implementation.",
    achievements: [
      "Launched 5 major features",
      "Increased user engagement by 45%",
      "Implemented real-time collaboration features"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Socket.io"]
  },
  {
    year: "2019",
    title: "Started Tech Journey",
    company: "University Projects",
    description: "Began my journey in software development through academic projects and open-source contributions.",
    milestone: true,
    achievements: [
      "Completed 10+ personal projects",
      "Contributed to 5 open-source projects",
      "Won 2 hackathons"
    ]
  }
];

export const techStack = {
  frontend: [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Redux",
    "Vue.js",
    "Material-UI",
    "Framer Motion"
  ],
  backend: [
    "Node.js",
    "Python",
    "Java",
    "Spring Boot",
    "Express.js",
    "FastAPI",
    "GraphQL",
    "PostgreSQL",
    "MongoDB",
    "Redis"
  ],
  tools: [
    "Docker",
    "Kubernetes",
    "AWS",
    "Git",
    "Jenkins",
    "Terraform",
    "GitHub Actions",
    "Prometheus",
    "Grafana",
    "ElasticSearch"
  ]
};

export const education = [
  {
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    year: "2019-2021",
    description: "Specialized in Distributed Systems and Machine Learning",
    achievements: [
      "GPA: 3.9/4.0",
      "Research in distributed ML systems",
      "Teaching Assistant for Advanced Algorithms"
    ]
  },
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Indian Institute of Technology",
    year: "2015-2019",
    description: "Focus on Software Engineering and Data Structures",
    achievements: [
      "Dean's List all semesters",
      "President of Coding Club",
      "Published 2 research papers"
    ]
  }
];

export const communityContributions = [
  {
    title: "Open Source Contributor",
    description: "Active contributor to various open-source projects including React, Node.js ecosystem, and cloud-native tools.",
    stats: ["500+ GitHub stars", "100+ PRs merged", "50+ issues resolved"]
  },
  {
    title: "Technical Writer",
    description: "Writing technical articles and tutorials to help developers learn new technologies and best practices.",
    stats: ["20+ articles published", "100K+ views", "5K+ followers"]
  },
  {
    title: "Community Speaker",
    description: "Regular speaker at tech conferences and meetups, sharing knowledge on cloud architecture and AI.",
    stats: ["10+ talks delivered", "5 conferences", "3 workshops conducted"]
  },
  {
    title: "Mentor",
    description: "Mentoring junior developers and students, helping them navigate their careers in technology.",
    stats: ["20+ mentees", "100+ hours of mentoring", "Career guidance sessions"]
  }
];
export interface CareerRole {
  id: string;
  title: string;
  period: string;
  /** A short, plain description of the work. */
  summary: string;
  /** Optional extras worth calling out. Keep these few and true. */
  highlights?: string[];
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
    company: "Guidewire Software",
    location: "Bengaluru, India",
    overallPeriod: "Jan 2023 – Present",
    type: "company",
    roles: [
      {
        id: "swe3-guidewire",
        title: "Software Engineer III",
        period: "Nov 2026 – Present",
        summary:
          "My team now works on KubeVela full time, both inside Guidewire and upstream in the open source project. Most days that means building and maintaining features, running community calls, and working with the community on where the project goes next.",
      },
      {
        id: "swe2-guidewire",
        title: "Software Engineer II",
        period: "Nov 2024 – Nov 2026",
        summary: `The first half of this role was still the supply chain system, which by then was a GUAC deployment serving more than 20 internal tenants. I moved its storage from ArangoDB to PostgreSQL, took it through a long run of upgrades, and built an API that let security teams search for a vulnerable package across every container image SBOM we had.

Halfway through I moved to the platform team and onto KubeVela. We built OAM components on top of Crossplane, so a team that had never touched Kubernetes could ask for an S3 bucket, a DynamoDB table or an Aurora database the same way they described their app. I also moved existing Terraform-managed infrastructure over to Crossplane without downtime, which is what my KCD Kochi talk was about.`,
        highlights: [
          "Named Employee of the Year in 2025",
          "Contributed upstream to GUAC, KubeVela and KubeLinter",
        ],
      },
      {
        id: "swe1-guidewire",
        title: "Software Engineer I",
        period: "Apr 2023 – Nov 2024",
        summary:
          "Same project, now full time. I built the dashboard and image details pages in React, so people could see what was inside an image, and a UI for writing custom security policies. Behind that, I set up the pipelines that rolled policies out to our Kubernetes clusters and shipped binaries to Artifactory and ECR, and added automated backups to our ArangoDB database ahead of a risky upgrade.",
      },
      {
        id: "intern-guidewire",
        title: "Software Engineer Intern",
        period: "Jan 2023 – Apr 2023",
        summary:
          "I joined a new software supply chain security project right at the start. It began after Log4j, when everyone suddenly needed to know which of their software contained a given library. The idea was to generate an SBOM and SLSA provenance for every artifact we built, and link all of it in a graph so anything could be traced back to where it came from.",
      },
    ],
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
        summary: "A month-long machine learning program taught by Amazon's ML scientists.",
      },
    ],
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
        summary: "Worked on BERT and BiLSTM models for tagging named entities in documents.",
      },
    ],
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
        summary:
          "Three projects: prototyping an AI product, segmenting a market with machine learning, and working out the business and financial model behind it.",
      },
    ],
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
        summary: "Used machine learning and Python to help spot security threats.",
      },
    ],
  },
];

export interface TechGroup {
  title: string;
  note: string;
  items: string[];
}

export const techStack: { intro: string; groups: TechGroup[] } = {
  intro: "The honest version.",
  groups: [
    {
      title: "Primary language",
      note: "I describe it, Claude Code writes it, and I argue with the diff.",
      items: [
        "English",
        "Claude Code",
        "Whichever model is best this week",
        "Reading diffs very carefully",
      ],
    },
    {
      title: "For when the AI needs a grown-up",
      note: "The stuff I still have to properly understand.",
      items: ["Go", "Kubernetes", "KubeVela", "Crossplane", "CUE", "Terraform", "Helm", "AWS"],
    },
    {
      title: "Also in the stack",
      note: "Load-bearing, whether I like it or not.",
      items: [
        "YAML, unfortunately",
        "Opinions on AI (2026.Q4 edition)",
        "A Pokémon rewatch, in progress",
      ],
    },
  ],
};

export const education = [
  {
    degree: "Bachelor of Technology in Computer Science and Engineering - Artificial Intelligence",
    institution: "Amrita Vishwa Vidyapeetham, Coimbatore, India",
    period: "2019 - 2023",
  description: "Graduated with a stellar CGPA of 9.1, specializing in Artificial Intelligence and Machine Learning, and distinguished by publishing impactful research in renowned conferences and book chapters."
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
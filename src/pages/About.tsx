
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink } from "lucide-react";
import { ContactModal } from "@/components/contact-modal";

export default function About() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  // Tech stack data organized by categories
  const techStack = {
    frontend: [
      "React.js",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Redux",
      "Zustand",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "GraphQL",
      "Firebase",
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
      "AWS",
    ],
  };

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Engineer by trade, Designer by instinct, and Writer by habit
          </p>
        </div>

        {/* Profile section */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-start">
          <div className="aspect-square overflow-hidden rounded-xl border">
            <div className="h-full w-full flex items-center justify-center bg-muted">
              {/* Replace with your image */}
              <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-primary/20 to-secondary text-6xl font-bold text-primary">
                AK
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold">Hi, I'm Ayush Kumar</h2>
            <p className="mt-4 text-muted-foreground">
              I work mostly with Go, Kubernetes, and cloud infrastructure — building backend systems that are meant to scale and stay up. My
              focus is on clean, maintainable architecture, automation, and performance. I’ve spent a lot of time designing microservices,
              setting up CI/CD pipelines, and getting things to run smoothly in production. I have a strong foundation in AI and data
              systems, with hands-on experience in applying machine learning where it genuinely improves outcomes — and the judgment to
              avoid it where simpler solutions are more effective..
              <p className="mt-4 text-muted-foreground">
                Outside of code, I write technical articles, contribute to open-source when I can, and keep learning whatever tool or system
                looks like it’ll help me do better work. Not big on fluff. Just here to build useful stuff and keep improving.
              </p>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              <Button variant="outline" onClick={() => setContactModalOpen(true)}>
                Contact Me
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Experience section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Experience</h2>

          <div className="space-y-8">
            {/* Experience Item 1 */}
            {/* Experience Item 1 */}
            <div className="rounded-lg border p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold">Software Engineer II</h3>
                  <p className="text-muted-foreground">Guidewire Software Inc.</p>
                </div>
                <Badge variant="outline">Jan 2023 – Present</Badge>
              </div>
              <ul className="mt-4 space-y-2 text-muted-foreground list-disc list-inside">
                <li>
                  Spearheaded the design and implementation of scalable microservice architectures using Go, contributing to
                  high-availability systems deployed on AWS.
                </li>
                <li>
                  Led end-to-end service development — from architectural design to production rollout — ensuring modularity, fault
                  tolerance, and ease of integration across systems.
                </li>
                <li>
                  Automated containerized deployments using Docker, Kubernetes (EKS), and KubeVela, enabling GitOps-driven workflows and
                  significantly reducing deployment overhead.
                </li>
                <li>
                  Managed infrastructure as code with Terraform/Crossplane, ensuring environment consistency, reducing manual intervention, and
                  enabling rapid onboarding across teams.
                </li>
                <li>
                  Advocated and implemented test-driven development (TDD) practices across services, improving test coverage and confidence
                  in releases.
                </li>
                <li>
                  Built and maintained CI/CD pipelines with TeamCity and GitHub Actions, incorporating quality gates via SonarQube, with
                  observability integrated through CloudWatch and Datadog.
                </li>
                <li>
                  Conducted deep query profiling and optimization across critical data flows, reducing database response times and improving
                  end-user experience.
                </li>
                <li>
                  Worked closely with globally distributed teams and cross-functional stakeholders to align backend development with DevOps
                  and SRE best practices.
                </li>
              </ul>
            </div>

            {/* Experience Item 5 */}
            <div className="rounded-lg border p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold">Amazon ML Summer School Trainee</h3>
                  <p className="text-muted-foreground">Amazon</p>
                </div>
                <Badge variant="outline">Jul 2022</Badge>
              </div>
              <ul className="mt-4 space-y-2 text-muted-foreground list-disc list-inside">
                <li>Selected for an intensive machine learning training program conducted by Amazon’s ML scientists.</li>
                <li>Gained hands-on experience with supervised/unsupervised learning, deep learning, and real-world ML pipelines.</li>
                <li>Engaged in problem-solving sessions focused on scalable ML solutions used in industry applications.</li>
              </ul>
            </div>

            {/* Experience Item 2 */}
            <div className="rounded-lg border p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold">Machine Learning Intern</h3>
                  <p className="text-muted-foreground">Cleareye.ai</p>
                </div>
                <Badge variant="outline">May 2022 – Jul 2022</Badge>
              </div>
              <ul className="mt-4 space-y-2 text-muted-foreground list-disc list-inside">
                <li>Built and fine-tuned BERT and BiLSTM models for high-precision Named Entity Recognition (NER) in textual data.</li>
                <li>Created and managed labeled datasets, contributing to improved data accuracy and NLP pipeline performance.</li>
              </ul>
            </div>

            {/* Experience Item 4 */}
            <div className="rounded-lg border p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold">Machine Learning Intern</h3>
                  <p className="text-muted-foreground">Feynn Labs</p>
                </div>
                <Badge variant="outline">Apr 2022 – Jun 2022</Badge>
              </div>
              <ul className="mt-4 space-y-2 text-muted-foreground list-disc list-inside">
                <li>Prototyped AI-powered products and services, focusing on practical deployment and integration feasibility.</li>
                <li>Performed market segmentation using machine learning and data analysis techniques to uncover business insights.</li>
                <li>Contributed to financial and business modeling for AI-driven solutions, aligning tech output with market value.</li>
              </ul>
            </div>

            {/* Experience Item 3 */}
            <div className="rounded-lg border p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold">Cyber Security Analyst Intern</h3>
                  <p className="text-muted-foreground">TechByHeart</p>
                </div>
                <Badge variant="outline">Feb 2022 – May 2022</Badge>
              </div>
              <ul className="mt-4 space-y-2 text-muted-foreground list-disc list-inside">
                <li>Applied ML and analytics techniques to detect and respond to security threats in real-time.</li>
                <li>Documented security protocols and supported compliance through data-driven threat analysis.</li>
              </ul>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Tech Stack section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Tech Stack</h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {/* Frontend */}
            <div className="rounded-lg border p-6">
              <h3 className="font-bold text-lg mb-4">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.frontend.map(tech => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="rounded-lg border p-6">
              <h3 className="font-bold text-lg mb-4">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.backend.map(tech => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="rounded-lg border p-6">
              <h3 className="font-bold text-lg mb-4">Tools & DevOps</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.tools.map(tech => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Education section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Education</h2>

          <div className="rounded-lg border p-6">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-bold">Bachelor of Science in Computer Science</h3>
                <p className="text-muted-foreground">University Name</p>
              </div>
              <Badge variant="outline">2015 - 2019</Badge>
            </div>
            <p className="mt-4 text-muted-foreground">
              Graduated with honors. Specialized in web technologies and software engineering. Completed a senior project on real-time
              collaborative web applications.
            </p>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Open Source & Community */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Open Source & Community</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border p-6">
              <h3 className="font-bold text-lg">Open Source Contributions</h3>
              <p className="mt-2 text-muted-foreground">
                Active contributor to several open-source projects including React-based libraries and developer tools.
              </p>
              <Button variant="link" size="sm" asChild className="mt-2 p-0">
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                  View on GitHub
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="font-bold text-lg">Speaker & Writer</h3>
              <p className="mt-2 text-muted-foreground">
                Regularly speak at local meetups and occasionally at conferences. Published technical articles on web development.
              </p>
              <Button variant="link" size="sm" asChild className="mt-2 p-0">
                <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                  See Talks & Articles
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
      </div>
    </div>
  );
}

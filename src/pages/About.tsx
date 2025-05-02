
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink } from "lucide-react";

export default function About() {
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
            Web developer, designer, and technical writer
          </p>
        </div>

        {/* Profile section */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-start">
          <div className="aspect-square overflow-hidden rounded-xl border">
            <div className="h-full w-full flex items-center justify-center bg-muted">
              {/* Replace with your image */}
              <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-primary/20 to-secondary text-6xl font-bold text-primary">
                DS
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold">Hi, I'm [Your Name]</h2>
            <p className="mt-4 text-muted-foreground">
              I'm a passionate web developer with over 5 years of experience building modern web applications. 
              I specialize in React.js, TypeScript, and Node.js, with a focus on creating intuitive and 
              performant user experiences.
            </p>
            <p className="mt-4 text-muted-foreground">
              When I'm not coding, you can find me writing technical articles, contributing to open-source 
              projects, or exploring new technologies. I believe in continuous learning and sharing knowledge 
              with the developer community.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:your.email@example.com">
                  Contact Me
                </a>
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
            <div className="rounded-lg border p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold">Senior Frontend Developer</h3>
                  <p className="text-muted-foreground">Example Company</p>
                </div>
                <Badge variant="outline">2023 - Present</Badge>
              </div>
              <ul className="mt-4 space-y-2 text-muted-foreground list-disc list-inside">
                <li>Led the development of the company's flagship web application</li>
                <li>Implemented a new component library that improved development speed by 30%</li>
                <li>Mentored junior developers and conducted code reviews</li>
                <li>Reduced bundle size by 40% through code splitting and lazy loading</li>
              </ul>
            </div>
            
            {/* Experience Item 2 */}
            <div className="rounded-lg border p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold">Frontend Developer</h3>
                  <p className="text-muted-foreground">Previous Company</p>
                </div>
                <Badge variant="outline">2020 - 2023</Badge>
              </div>
              <ul className="mt-4 space-y-2 text-muted-foreground list-disc list-inside">
                <li>Built responsive web applications using React and TypeScript</li>
                <li>Implemented state management solutions using Redux and Context API</li>
                <li>Created a design system that ensured consistency across products</li>
                <li>Collaborated with designers and backend developers to deliver features</li>
              </ul>
            </div>
            
            {/* Experience Item 3 */}
            <div className="rounded-lg border p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold">Web Developer Intern</h3>
                  <p className="text-muted-foreground">Starter Company</p>
                </div>
                <Badge variant="outline">2019 - 2020</Badge>
              </div>
              <ul className="mt-4 space-y-2 text-muted-foreground list-disc list-inside">
                <li>Developed and maintained client websites</li>
                <li>Assisted in migrating legacy code to modern frameworks</li>
                <li>Created responsive layouts using HTML, CSS, and JavaScript</li>
                <li>Participated in daily standups and sprint planning meetings</li>
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
                {techStack.frontend.map((tech) => (
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
                {techStack.backend.map((tech) => (
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
                {techStack.tools.map((tech) => (
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
              Graduated with honors. Specialized in web technologies and software engineering.
              Completed a senior project on real-time collaborative web applications.
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
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "../components/ui/Button";

export const metadata: Metadata = {
  title: "Mujahid Siyam | Software Engineer & AI/ML Specialist",
  description: "Full-stack developer, AI/ML engineer, and open-source advocate building cutting-edge solutions with modern technology stacks.",
  alternates: {
    canonical: 'https://mujaxso.com/',
  },
  openGraph: {
    title: "Mujahid Siyam | Portfolio",
    description: "Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps",
    type: "website",
    url: 'https://mujaxso.com',
    images: ['https://mujaxso.com/img/profile.png'],
  },
};

export default function HomePage() {
  const technologies = [
    "React", "TypeScript", "Python", "TensorFlow", "AWS", "Docker",
    "Kubernetes", "PostgreSQL", "GraphQL", "Next.js", "FastAPI", "Redis"
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            Mujahid Siyam
          </h1>
          <p className="text-xl text-[var(--color-muted-foreground)] mb-8">
            Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps
          </p>
          <p className="text-lg text-[var(--color-muted-foreground)] max-w-2xl mx-auto mb-12">
            Building innovative solutions with modern technology stacks. 
            Passionate about open-source, machine learning, and creating impactful software.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="default" size="lg" className="w-full sm:w-auto mx-auto flex items-center justify-center">
              <Link href="/projects" className="text-center w-full">
                Explore Projects
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto mx-auto flex items-center justify-center">
              <Link href="/blog" className="text-center w-full">
                Read Blog
              </Link>
            </Button>
          </div>
        </div>

        {/* About Me Section */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">About Me</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate Software Engineer, AI/ML Engineer, Data Scientist, and DevSecOps professional with a deep love for creating innovative solutions that bridge the gap between cutting-edge technology and real-world applications. My expertise spans across full-stack development, machine learning model deployment, data-driven insights, and secure software practices.
              </p>
              <p>
                Beyond the world of code and algorithms, I'm also an avid musician, finding creative expression through music as a side hobby. This artistic pursuit complements my technical work, bringing balance and inspiration to my problem-solving approach.
              </p>
              <p>
                I believe in building technology that not only solves complex challenges but also enhances human experiences and creates meaningful impact.
              </p>
            </div>
          </div>
        </section>

        {/* Technologies & Tools Section */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Technologies & Tools</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              A versatile toolkit for building robust, scalable, and intelligent applications
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {technologies.map((tech) => (
                <div
                  key={tech}
                  className="px-6 py-4 bg-card border border-border rounded-2xl text-foreground font-medium hover:bg-primary/10 hover:border-primary/20 transition-all duration-300"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Let's Build Something Amazing Section */}
        <section className="mb-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Let's Build Something Amazing</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to bring your ideas to life with cutting-edge technology and innovative solutions?
            </p>
            <Button asChild variant="default" size="lg">
              <a href="mailto:contact@mujahid.com">
                Start a Conversation
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "../components/ui/Button";

export const metadata: Metadata = {
  title: "Mujahid Siyam | Software Engineer & AI/ML Specialist",
  description: "Full-stack developer, AI/ML engineer, and open-source advocate building cutting-edge solutions with modern technology stacks.",
  openGraph: {
    title: "Mujahid Siyam | Portfolio",
    description: "Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps",
    type: "website",
    images: ['/img/profile.png'],
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
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
            <Button asChild variant="default" size="lg" className="text-center">
              <Link href="/projects">
                Explore Projects
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-center">
              <Link href="/blog">
                Read Blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

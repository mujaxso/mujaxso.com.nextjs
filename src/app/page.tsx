import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center text-center py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm bg-glass border border-glass-border text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Building the future with code and AI
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Mujahid Siyam
            </h1>
            <h2 className="text-2xl md:text-3xl text-foreground/80 mb-8 font-light">
              Software Engineer • AI/ML Engineer • Data Scientist • DevSecOps
            </h2>
            <p className="text-xl text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              Crafting elegant solutions at the intersection of software engineering, 
              artificial intelligence, and secure development practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/projects" 
                className="group px-8 py-4 backdrop-blur-sm bg-glass border border-glass-border text-foreground rounded-2xl font-medium hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/blog" 
                className="px-8 py-4 backdrop-blur-sm bg-glass border border-glass-border text-foreground rounded-2xl font-medium hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-105"
              >
                Read Blog
              </Link>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 text-foreground">Technologies & Tools</h3>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              A versatile toolkit for building robust, scalable, and intelligent applications
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {['React', 'TypeScript', 'Python', 'TensorFlow', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'GraphQL', 'Next.js', 'FastAPI', 'Redis'].map((skill) => (
              <div 
                key={skill} 
                className="p-6 backdrop-blur-xl bg-glass border border-glass-border rounded-2xl text-center hover:scale-105 hover:bg-primary/20 transition-all duration-300"
              >
                <div className="text-foreground font-medium">{skill}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="backdrop-blur-xl bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center border border-glass-border">
            <h3 className="text-4xl font-bold mb-6 text-white">Let's Build Something Amazing</h3>
            <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
              Ready to bring your ideas to life with cutting-edge technology and innovative solutions?
            </p>
            <Link 
              href="mailto:contact@mujahid.com" 
              className="inline-flex items-center gap-2 px-8 py-4 backdrop-blur-sm bg-glass border border-glass-border text-white rounded-2xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50/30 to-purple-50/20 dark:from-zinc-900 dark:via-blue-950/20 dark:to-purple-950/10">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center text-center py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Building the future with code and AI
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Mujahid Siyam
            </h1>
            <h2 className="text-2xl md:text-3xl text-zinc-600 dark:text-zinc-300 mb-8 font-light">
              Software Engineer • AI/ML Engineer • Data Scientist • DevSecOps
            </h2>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Crafting elegant solutions at the intersection of software engineering, 
              artificial intelligence, and secure development practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/projects" 
                className="group px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-2xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 flex items-center gap-2"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/blog" 
                className="px-8 py-4 border-2 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 rounded-2xl font-medium hover:border-zinc-400 dark:hover:border-zinc-400 transition-all duration-300"
              >
                Read Blog
              </Link>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Technologies & Tools</h3>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              A versatile toolkit for building robust, scalable, and intelligent applications
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {['React', 'TypeScript', 'Python', 'TensorFlow', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'GraphQL', 'Next.js', 'FastAPI', 'Redis'].map((skill) => (
              <div 
                key={skill} 
                className="p-6 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-2xl text-center hover:scale-105 hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50"
              >
                <div className="text-zinc-900 dark:text-zinc-100 font-medium">{skill}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center">
            <h3 className="text-4xl font-bold mb-6 text-white">Let's Build Something Amazing</h3>
            <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
              Ready to bring your ideas to life with cutting-edge technology and innovative solutions?
            </p>
            <Link 
              href="mailto:contact@mujahid.com" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold hover:bg-opacity-90 transition-all duration-300 hover:scale-105"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

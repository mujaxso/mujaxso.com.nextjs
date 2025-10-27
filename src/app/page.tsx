import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center text-center py-20">
          <div className="max-w-4xl">
            {/* Profile Photo */}
            <div className="flex justify-center mb-8">
              <div className="w-48 h-48 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center border-4 border-primary/20 overflow-hidden group hover:border-primary/40 transition-all duration-300">
                <Image 
                  src="/img/profile.png" 
                  alt="Mujahid Siyam" 
                  width={192}
                  height={192}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>
            
            {/* Name */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Mujahid Siyam
            </h1>
            
            {/* Social Media Links */}
            <div className="flex justify-center gap-4 mb-8 flex-wrap">
              {[
                { href: "https://github.com/mujaxso", icon: "GitHub", label: "GitHub" },
                { href: "https://linkedin.com/in/mujaxso", icon: "LinkedIn", label: "LinkedIn" },
                { href: "https://twitter.com/mujaxso", icon: "Twitter", label: "Twitter" },
                { href: "https://instagram.com/mujaxso", icon: "Instagram", label: "Instagram" },
                { href: "https://tiktok.com/@mujaxso", icon: "TikTok", label: "TikTok" },
                { href: "https://snapchat.com/add/mujaxso", icon: "Snapchat", label: "Snapchat" },
                { href: "mailto:contact@mujaxso.com", icon: "Email", label: "Email" }
              ].map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="p-3 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 backdrop-blur-sm bg-glass border border-glass-border rounded-2xl"
                  aria-label={`Visit ${item.label} profile`}
                >
                  <span className="text-sm font-medium">{item.icon}</span>
                </a>
              ))}
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm bg-glass border border-glass-border text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Building the future with code and AI
            </div>
            
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 backdrop-blur-sm bg-glass border border-glass-border text-white rounded-2xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/blog" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 backdrop-blur-sm bg-glass border border-glass-border text-white rounded-2xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
              >
                Read Blog
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h3 className="text-4xl font-bold mb-8 text-foreground">About Me</h3>
            <div className="prose prose-lg text-foreground/80 max-w-none">
              <p className="text-xl leading-relaxed mb-6">
                I'm a passionate Software Engineer, AI/ML Engineer, Data Scientist, and DevSecOps professional 
                with expertise spanning from systems programming to modern web development and artificial intelligence. 
                My technical journey encompasses everything from low-level systems programming with Zig and C/C++ 
                to building scalable web applications with React and TypeScript, and developing intelligent solutions 
                using Python and machine learning frameworks.
              </p>
              <p className="text-xl leading-relaxed mb-6">
                With deep experience in Linux environments and a strong commitment to open-source development, 
                I specialize in creating robust, end-to-end solutions that leverage the full spectrum of modern technology. 
                My work focuses on building systems that are not only performant and secure but also intelligent, 
                scalable, and user-centric.
              </p>
              <p className="text-xl leading-relaxed mb-6">
                I actively contribute to open-source projects and believe in the power of collaborative development 
                to drive innovation. My expertise in Linux systems administration and open-source technologies enables 
                me to build solutions that are both technically sophisticated and community-driven.
              </p>
              <p className="text-xl leading-relaxed mb-6">
                Beyond the world of code and algorithms, I'm also an avid musician, finding creative expression 
                through music as a side hobby. This artistic pursuit complements my technical work, bringing 
                balance and inspiration to my problem-solving approach.
              </p>
              <p className="text-xl leading-relaxed">
                I believe in building technology that not only solves complex challenges but also enhances 
                human experiences and creates meaningful impact across different domains through open collaboration 
                and innovative thinking.
              </p>
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-5xl mx-auto">
            {['Zig', 'C/C++', 'React', 'TypeScript', 'Python', 'TensorFlow', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'GraphQL', 'Next.js', 'FastAPI', 'Redis'].map((skill) => (
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
              href="mailto:contact@mujaxso.com" 
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

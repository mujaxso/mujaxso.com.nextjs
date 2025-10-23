"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink, Code2, Heart, Sparkles } from "lucide-react";
import { Button } from "./ui/Button";
import ModeToggle from "./ModeToggle";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden backdrop-blur-2xl bg-background/30 border-t border-white/10">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact Form Section - Left */}
          <div className="md:order-1 order-3">
            <h3 className="font-bold text-foreground mb-6 text-lg tracking-wide text-center md:text-left">
              Quick Message
            </h3>
            <form action="/api/contact" method="POST" className="space-y-4">
              <div>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
              <div>
                <textarea 
                  name="message"
                  placeholder="Your Message"
                  rows={3}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all duration-300 backdrop-blur-sm resize-none"
                />
              </div>
              <Button 
                type="submit"
                variant="default" 
                size="lg" 
                className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* About Section - Center */}
          <div className="md:order-2 order-1">
            <div className="flex flex-col items-center text-center">
              {/* Profile Photo Above Name */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 shadow-lg mb-4">
                <img 
                  src="/img/profile.png" 
                  alt="Mujahid Siyam" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Name and Title */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-foreground block">
                  Mujahid Siyam
                </span>
                <p className="text-sm text-muted-foreground mt-1">
                  Software Engineer • AI/ML Engineer
                </p>
              </div>
              <p className="text-muted-foreground max-w-sm text-base leading-relaxed mb-6">
                Building cutting-edge solutions with code, AI, and innovative technology.
              </p>
              <div className="flex gap-4 justify-center">
                {[
                  { 
                    name: 'GitHub', 
                    icon: Github, 
                    url: 'https://github.com/mujaxso',
                  },
                  { 
                    name: 'LinkedIn', 
                    icon: Linkedin, 
                    url: 'https://linkedin.com/in/mujaxso',
                  },
                  { 
                    name: 'Email', 
                    icon: Mail, 
                    url: 'mailto:contact@mujaxso.com',
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-white/10 rounded-xl backdrop-blur-sm"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Connect Section - Right */}
          <div className="md:order-3 order-2 text-center md:text-left">
            <h3 className="font-bold text-foreground mb-6 text-lg tracking-wide">Let's Connect</h3>
            <p className="text-muted-foreground mb-6 text-base leading-relaxed">
              Ready to bring your next project to life? Let's discuss how we can work together.
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="w-full md:w-auto border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 px-8 py-3 mx-auto md:mx-0"
            >
              <a href="mailto:contact@mujaxso.com" className="inline-flex items-center gap-3 text-base font-medium">
                Get in touch 
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center">
            {/* Copyright */}
            <div className="text-base text-muted-foreground order-2 md:order-1">
              © {new Date().getFullYear()} Mujahid Siyam. All rights reserved.
            </div>
            
            {/* Build with love */}
            <div className="flex items-center gap-3 text-base text-muted-foreground order-1 md:order-2">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>and</span>
              <span className="text-primary font-medium">Open Source</span>
            </div>

            {/* Tech stack */}
            <div className="flex gap-2 order-3">
              {['Next.js', 'React', 'TypeScript'].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-2 bg-white/5 text-muted-foreground text-sm rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

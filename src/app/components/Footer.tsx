"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink, Code2, Heart, Sparkles } from "lucide-react";
import { Button } from "./ui/Button";
import { ModeToggle } from "./ModeToggle";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute -top-12 left-1/4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute -top-8 right-1/3 w-16 h-16 bg-secondary/10 rounded-full blur-lg"></div>
      <div className="absolute bottom-4 left-10 w-8 h-8 bg-accent/10 rounded-full blur-md"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl card-glass shadow-xl hover:scale-105 transition-transform duration-300 group">
                <div className="w-6 h-6 text-white flex items-center justify-center">
                  <Code2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Mujahid Siyam
                </span>
                <p className="text-sm text-muted-foreground mt-1">
                  Building the future with code, AI, and innovative solutions
                </p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              Software Engineer • AI/ML Engineer • Data Scientist • DevSecOps building cutting-edge solutions and sharing knowledge with the community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2">
              Explore
              <Sparkles className="w-4 h-4 text-primary" />
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Blog', path: '/blog' },
                { name: 'Projects', path: '/projects' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Music', path: '/music' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.path}
                    className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-1 transform inline-block group"
                  >
                    <span className="group-hover:text-primary transition-colors">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-lg">Connect</h3>
            <div className="flex gap-3 mb-6">
              {[
                { 
                  name: 'GitHub', 
                  icon: Github, 
                  url: 'https://github.com/mujaxso',
                  color: 'hover:text-purple-400'
                },
                { 
                  name: 'LinkedIn', 
                  icon: Linkedin, 
                  url: 'https://linkedin.com/in/mujaxso',
                  color: 'hover:text-blue-400'
                },
                { 
                  name: 'Email', 
                  icon: Mail, 
                  url: 'mailto:contact@mujaxso.com',
                  color: 'hover:text-red-400'
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-card border border-border rounded-xl hover:bg-primary/10 hover:border-primary/30 hover:scale-110 transition-all duration-300 group ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
              ))}
            </div>
            <Button variant="outline" size="sm" asChild className="w-full">
              <a href="mailto:contact@mujaxso.com" className="inline-flex items-center gap-2 group">
                Get in touch 
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
            {/* Copyright */}
            <div className="text-sm text-center lg:text-left text-muted-foreground">
              © {new Date().getFullYear()} Mujahid Siyam. All rights reserved.
            </div>
            
            {/* Center content */}
            <div className="flex items-center gap-6">
              {/* Theme toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ModeToggle />
              </div>
              
              {/* Build with love */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Built with</span>
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">and</span>
                <span className="text-primary font-medium text-sm bg-primary/10 px-2 py-1 rounded-full">
                  Open Source
                </span>
              </div>
            </div>

            {/* Tech stack badges */}
            <div className="flex gap-2 flex-wrap justify-center">
              {['Next.js', 'React', 'TypeScript', 'Tailwind'].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm rounded-full border border-primary/20 hover:bg-primary/20 hover:scale-105 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-4 right-8 opacity-5">
          <div className="text-6xl">⚡</div>
        </div>
        <div className="absolute top-8 left-8 opacity-5">
          <div className="text-4xl">🚀</div>
        </div>
      </div>
    </footer>
  );
}

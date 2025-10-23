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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                <img 
                  src="/img/profile.png" 
                  alt="Mujahid Siyam" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">
                  Mujahid Siyam
                </span>
                <p className="text-sm text-muted-foreground mt-1">
                  Software Engineer • AI/ML Engineer
                </p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              Building cutting-edge solutions with code, AI, and innovative technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-base">
              Explore
            </h3>
            <ul className="space-y-2">
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
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-base">Connect</h3>
            <div className="flex gap-2 mb-4">
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
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <Button variant="outline" size="sm" asChild className="w-full border-white/20 hover:border-white/40">
              <a href="mailto:contact@mujaxso.com" className="inline-flex items-center gap-2 text-sm">
                Get in touch 
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Mujahid Siyam. All rights reserved.
            </div>
            
            {/* Build with love */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>and</span>
              <span className="text-primary">Open Source</span>
            </div>

            {/* Tech stack */}
            <div className="flex gap-1">
              {['Next.js', 'React', 'TypeScript'].map((tech) => (
                <span 
                  key={tech}
                  className="px-2 py-1 bg-white/5 text-muted-foreground text-xs rounded border border-white/10"
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

"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="backdrop-blur-xl bg-glass border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-xl backdrop-blur-sm">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Mujahid Siyam
              </span>
            </div>
            <p className="text-foreground/60 mb-6 max-w-md">
              Building the future with code, AI, and innovative solutions that make a difference.
            </p>
            <div className="flex gap-4">
              {[
                { href: "https://github.com/mujaxso", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com/in/mujaxso", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:contact@mujaxso.com", icon: Mail, label: "Email" }
              ].map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-foreground/60 hover:text-primary transition-all duration-300 hover:scale-110 backdrop-blur-sm bg-glass border border-glass-border rounded-lg"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="sr-only">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-foreground font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'Projects', 'Blog', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="text-foreground/60 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-foreground font-semibold mb-4">Connect</h4>
            <p className="text-foreground/60 mb-4">Let's discuss your next project or idea.</p>
            <a 
              href="mailto:contact@mujaxso.com" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              Get in touch <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="border-t border-glass-border mt-12 pt-8 text-center text-foreground/60">
          <p>© 2024 Mujahid Siyam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

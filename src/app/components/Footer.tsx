"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="glass-dark border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-xl card-glass shadow-lg">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mujahid Siyam
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            Building the future with code, AI, and innovative solutions.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="mailto:contact@mujaxso.com" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors text-sm"
            >
              Get in touch <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        <div className="border-t border-border/50 mt-6 pt-6 text-center text-muted-foreground text-xs">
          <p>© 2024 Mujahid Siyam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

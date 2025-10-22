"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="glass-dark border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-xl card-glass shadow-lg">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Mujahid Siyam
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Building the future with code, AI, and innovative solutions that make a difference.
            </p>
          </div>
          <div>
            <h4 className="text-foreground font-semibold mb-4">Connect</h4>
            <p className="text-muted-foreground mb-4">Let's discuss your next project or idea.</p>
            <a 
              href="mailto:contact@mujaxso.com" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors px-4 py-2 rounded-lg hover:bg-primary/10"
            >
              Get in touch <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground">
          <p>© 2024 Mujahid Siyam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

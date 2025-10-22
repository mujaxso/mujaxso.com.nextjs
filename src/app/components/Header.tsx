"use client";

import Link from "next/link";
import ModeToggle from "./ModeToggle";
import Search from "./Search";
import { Code2 } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-xl group-hover:scale-110 transition-all duration-300 card-glass shadow-lg">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mujahid Siyam
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <ul className="flex gap-4">
              {[
                { href: "/projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" }
              ].map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium text-sm px-3 py-2 rounded-lg hover:bg-primary/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <Search />
              <ModeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import ModeToggle from "./ModeToggle";
import Search from "./Search";
import { Code2 } from "lucide-react";
import { Button } from "./ui/Button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-all duration-300">
              <img 
                src="/img/profile.png" 
                alt="Mujahid Siyam" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mujahid Siyam
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <ul className="flex gap-2">
              {[
                { href: "/projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
                { href: "/music", label: "Music" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" }
              ].map((item) => (
                <li key={item.href}>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={item.href}>
                      {item.label}
                    </Link>
                  </Button>
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

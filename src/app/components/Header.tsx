"use client";

import Link from "next/link";
import ModeToggle from "./ModeToggle";
import Search from "./Search";
import { Code2, Menu, X } from "lucide-react";
import { Button } from "./ui/Button";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navigationItems = [
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/music", label: "Music" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl bg-background/20 border-b border-white/5 shadow-lg shadow-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-all duration-300 shadow-md">
              <img 
                src="/img/profile.png" 
                alt="Mujahid Siyam" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              Mujahid Siyam
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex gap-2">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Button variant="ghost" size="md" asChild className="text-foreground/90 hover:text-foreground hover:bg-white/15 transition-all duration-300 font-semibold text-base">
                    <Link href={item.href}>
                      {item.label}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              <Search />
              <ModeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Search />
            <ModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div 
            ref={menuRef} 
            className="md:hidden fixed top-20 left-0 right-0 backdrop-blur-3xl bg-background/95 border-b border-primary/20 shadow-2xl shadow-primary/5 z-50 animate-in slide-in-from-top-5 duration-300"
          >
            <nav className="p-6">
              <ul className="space-y-3">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Button
                      variant="ghost"
                      size="md"
                      asChild
                      className="w-full justify-center text-base font-semibold py-4 text-foreground/90 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-xl border border-transparent hover:border-primary/20"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href={item.href}>
                        {item.label}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

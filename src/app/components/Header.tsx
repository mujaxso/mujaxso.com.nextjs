"use client";

import Link from "next/link";
import ModeToggle from "./ModeToggle";
import Search from "./Search";
import { Code2, Menu, X } from "lucide-react";
import { Button } from "./ui/Button";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navigationItems = [
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/music", label: "Music" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-all duration-300">
              <img 
                src="/img/profile.png" 
                alt="Mujahid Siyam" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-base md:text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mujahid Siyam
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <ul className="flex gap-2">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={item.href} className="text-sm sm:text-base">
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
          <>
            {/* Backdrop */}
            <div 
              className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 top-0"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Menu */}
            <div className="md:hidden fixed top-16 left-0 right-0 glass border-t border-border/50 backdrop-blur-xl shadow-xl z-50">
              <nav className="p-4">
                <ul className="space-y-3">
                  {navigationItems.map((item) => (
                    <li key={item.href}>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="w-full justify-start text-base py-3"
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
          </>
        )}
      </div>
    </header>
  );
}

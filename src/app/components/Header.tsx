"use client";

import Link from "next/link";
import Image from "next/image";
import ModeToggle from "./ModeToggle";
import Search from "./Search";
import MobileMenu from "./MobileMenu";
import { Menu } from "lucide-react";
import { Button } from "./ui/Button";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/music", label: "Music" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-background/70 border-b border-white/10 shadow-lg shadow-black/10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-all duration-300 shadow-md">
                <Image 
                  src="/img/profile.png" 
                  alt="Mujahid Siyam" 
                  width={48}
                  height={48}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  priority
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
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
      />
    </>
  );
}

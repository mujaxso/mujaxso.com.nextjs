import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { Code2 } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-glass/80 border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-xl group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mujahid Siyam
            </span>
          </Link>
          <nav className="flex items-center gap-8">
            <ul className="flex gap-8">
              {[
                { href: "/projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" }
              ].map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium hover:scale-105"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

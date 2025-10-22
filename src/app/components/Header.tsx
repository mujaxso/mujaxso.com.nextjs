import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { Code2 } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 border-b border-zinc-200/50 dark:border-zinc-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mujahid Siyam
            </span>
          </Link>
          <nav className="flex items-center gap-8">
            <ul className="flex gap-8">
              {[
                { href: "/projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
                { href: "#about", label: "About" },
                { href: "#contact", label: "Contact" }
              ].map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
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

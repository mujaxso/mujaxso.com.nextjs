import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">Mujahid Siyam</h3>
            <p className="text-lg mb-6 max-w-md">
              Building the future with code, AI, and innovative solutions that make a difference.
            </p>
            <div className="flex gap-4">
              {[
                { href: "https://github.com", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:contact@mujahid.com", icon: Mail, label: "Email" }
              ].map((item) => (
                <Link 
                  key={item.label}
                  href={item.href}
                  className="p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 hover:text-white transition-all duration-200 group"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'Projects', 'Blog', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <p className="mb-4">Let's discuss your next project or idea.</p>
            <Link 
              href="mailto:contact@mujahid.com" 
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              Get in touch <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-12 pt-8 text-center">
          <p>© 2024 Mujahid Siyam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

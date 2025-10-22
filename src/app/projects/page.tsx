import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

// Define the project data directly for now
const projects = [
  {
    slug: "funmacs",
    title: "FunMacs - Modern Emacs Configuration",
    description: "Yet Another Lightweight Emacs Configuration, Using KISS philosophy",
    date: "2025-10-22",
    category: "Development Tools",
    tags: ["emacs", "lsp", "tree-sitter", "editor", "configuration"],
    githubUrl: "https://github.com/mujaxso/funmacs",
    liveUrl: "https://funmacs.mujaxso.com",
    featured: true
  },
  {
    slug: "mujaos",
    title: "MujaOS - Modular NixOS Configuration",
    description: "Lightweight Modular nix configuration for modern systems",
    date: "2025-10-22",
    category: "Operating Systems",
    tags: ["nixos", "linux", "configuration", "flake", "declarative"],
    githubUrl: "https://github.com/mujaxso/MujaOS",
    liveUrl: "https://mujaos.mujaxso.com",
    featured: true
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900 transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Featured Projects</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            A collection of my open-source projects and contributions
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => (
            <div 
              key={project.slug} 
              className="group relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 p-6 hover:transform hover:scale-[1.02] transition-all duration-300 border border-zinc-200 dark:border-zinc-700 cursor-pointer"
              onClick={() => window.location.href = `/projects/${project.slug}`}
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-white text-4xl font-bold opacity-80">
                  {project.title.split(' ').map(word => word[0]).join('').toUpperCase()}
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
                {project.description}
              </p>
              
              {project.category && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              )}
              
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-3 py-1 text-sm bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-3 py-1 text-sm bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-full">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}
              
              <div className="inline-flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 font-medium transition-colors">
                View Project
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        
        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              No projects found. Check back soon!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900 transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">Featured Projects</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {[1, 2, 3, 4].map((project) => (
            <div key={project} className="group relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 p-6 hover:transform hover:scale-[1.02] transition-all">
              <div className="h-48 bg-zinc-200 dark:bg-zinc-700 rounded-lg mb-4"></div>
              <h4 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">Project {project}</h4>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Next.js'].map((tech) => (
                  <span key={tech} className="px-3 py-1 text-sm bg-zinc-200 dark:bg-zinc-700 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

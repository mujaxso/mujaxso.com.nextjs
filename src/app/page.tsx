import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900 transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <section className="mb-28">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            John Doe
          </h1>
          <h2 className="text-2xl md:text-3xl text-zinc-600 dark:text-zinc-300 mb-8">
            Building digital experiences that merge design & technology
          </h2>
          <div className="flex gap-4">
            <Link href="#work" className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all">
              View Work
            </Link>
            <Link href="#contact" className="px-6 py-3 border-2 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 rounded-lg font-medium hover:border-zinc-400 dark:hover:border-zinc-400 transition-all">
              Get in Touch
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-28">
          <h3 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">About Me</h3>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            I'm a full-stack developer with 5+ years of experience creating digital products.
            Specializing in modern web applications with React, TypeScript, and cloud technologies.
            Passionate about user-centric design and scalable architecture.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['React', 'TypeScript', 'Node.js', 'AWS', 'Figma', 'PostgreSQL', 'GraphQL', 'Docker'].map((skill) => (
              <div key={skill} className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="work" className="mb-28">
          <h3 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">Featured Work</h3>
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
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-28">
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold mb-4 text-white">Let's Work Together</h3>
            <p className="text-white/90 mb-8">Have a project in mind? Let's turn your idea into reality.</p>
            <Link 
              href="mailto:contact@example.com" 
              className="inline-block px-8 py-3 bg-white text-zinc-900 rounded-lg font-semibold hover:bg-opacity-90 transition-opacity"
            >
              Send Message
            </Link>
          </div>
        </section>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <footer className="text-center py-8 text-zinc-600 dark:text-zinc-400">
          <p>© 2024 John Doe. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="https://github.com" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <span className="sr-only">GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </Link>
            <Link href="https://linkedin.com" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
            <Link href="mailto:contact@example.com" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <span className="sr-only">Email</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

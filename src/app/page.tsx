import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900 transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Header />
        {/* Hero Section */}
        <section className="mb-28 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Mujahid Siyam
          </h1>
          <h2 className="text-2xl md:text-3xl text-zinc-600 dark:text-zinc-300 mb-8">
            Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps
          </h2>
          <div className="flex gap-4 justify-center">
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
          src="/your-image.jpg"
          alt="Mujahid Siyam"
          width={100}
          height={100}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Mujahid Siyam
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400 text-center sm:text-left">
            Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps<br /><br />
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
        <Footer />
      </main>
    </div>
  );
}

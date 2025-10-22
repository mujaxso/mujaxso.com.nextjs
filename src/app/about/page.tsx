export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            About Me
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            Passionate developer crafting digital experiences with modern technologies
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              Hi, I'm Mujahid Siyam 👋
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 mb-4">
              I'm a passionate software developer with expertise in building modern web applications. 
              I love working with cutting-edge technologies and creating solutions that make a difference.
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 mb-4">
              My journey in software development started several years ago, and I've been constantly 
              learning and adapting to new technologies ever since. I believe in writing clean, 
              maintainable code and creating user-friendly experiences.
            </p>
            <p className="text-zinc-600 dark:text-zinc-300">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source 
              projects, or sharing my knowledge through blog posts and tutorials.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">Skills & Technologies</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                'JavaScript/TypeScript',
                'React/Next.js',
                'Node.js',
                'Python',
                'Nix/NixOS',
                'Emacs Lisp',
                'Docker',
                'Linux/Unix'
              ].map((skill) => (
                <div key={skill} className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 text-center">
            My Projects
          </h3>
          <p className="text-zinc-600 dark:text-zinc-300 text-center mb-6">
            I've created several open-source projects including FunMacs (a modern Emacs configuration) 
            and MujaOS (a modular NixOS configuration). Check out my projects page to see more!
          </p>
          <div className="text-center">
            <a 
              href="/projects" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              View My Projects
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

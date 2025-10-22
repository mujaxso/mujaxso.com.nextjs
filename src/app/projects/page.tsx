import Link from "next/link";
import { join } from "path";
import { promises as fs } from "fs";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

async function getProjects(): Promise<Project[]> {
  const projectsDirectory = join(process.cwd(), 'src', 'content', 'projects');
  
  try {
    const files = await fs.readdir(projectsDirectory);
    const projects = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, '');
          const filePath = join(projectsDirectory, file);
          const fileContent = await fs.readFile(filePath, 'utf8');
          
          // Extract frontmatter
          const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
          if (!frontmatterMatch) return null;
          
          const frontmatter = frontmatterMatch[1];
          const project: Project = {
            slug,
            title: '',
            description: '',
            date: '',
          };
          
          // Parse frontmatter
          frontmatter.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
              const value = valueParts.join(':').trim().replace(/^['"](.*)['"]$/, '$1');
              switch (key.trim()) {
                case 'title':
                  project.title = value;
                  break;
                case 'description':
                  project.description = value;
                  break;
                case 'date':
                  project.date = value;
                  break;
                case 'category':
                  project.category = value;
                  break;
                case 'tags':
                  project.tags = value.split(',').map(tag => tag.trim());
                  break;
                case 'githubUrl':
                  project.githubUrl = value;
                  break;
                case 'liveUrl':
                  project.liveUrl = value;
                  break;
                case 'featured':
                  project.featured = value === 'true';
                  break;
              }
            }
          });
          
          return project;
        })
    );
    
    return projects.filter((project): project is Project => project !== null)
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  
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
            <div key={project.slug} className="group relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 p-6 hover:transform hover:scale-[1.02] transition-all duration-300 border border-zinc-200 dark:border-zinc-700">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-white text-4xl font-bold opacity-80">
                  {project.title.split(' ').map(word => word[0]).join('').toUpperCase()}
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
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
              
              <Link 
                href={`/projects/${project.slug}`}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                View Project
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
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

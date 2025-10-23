import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { join } from "path";
import { promises as fs } from "fs";
import { Hero } from "../components/Hero";

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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Hero 
          title="Featured Projects" 
          subtitle="My Work" 
          description="A collection of my open-source projects and contributions"
        />
        
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {projects.map((project) => (
            <div key={project.slug} className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-card border border-border p-4 sm:p-6 hover:transform hover:scale-[1.02] transition-all duration-300 flex flex-col h-full">
              <Link href={`/projects/${project.slug}`} className="block">
                <div className="h-40 sm:h-48 bg-gradient-to-br from-primary to-secondary rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-white text-4xl font-bold opacity-80">
                    {project.title.split(' ').map(word => word[0]).join('').toUpperCase()}
                  </div>
                </div>
                
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                  {project.description}
                </p>
                
                {project.category && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-primary bg-primary/20 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                )}
                
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs sm:text-sm bg-muted text-muted-foreground rounded-full">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs sm:text-sm bg-muted text-muted-foreground rounded-full">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
                
                <div className="mt-auto inline-flex items-center text-primary group-hover:text-primary-dark font-medium transition-colors">
                  View Project
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              
              {/* External links positioned absolutely to avoid nesting issues */}
              <div className="absolute top-4 right-4 flex gap-2">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors backdrop-blur-sm bg-card border border-border rounded-lg hover:scale-110"
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors backdrop-blur-sm bg-card border border-border rounded-lg hover:scale-110"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No projects found. Check back soon!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

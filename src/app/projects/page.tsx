import Link from "next/link";
import { ExternalLink, Github, Star, GitFork, Eye, Calendar } from "lucide-react";
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
  language?: string;
  languageColor?: string;
  stars?: number;
  forks?: number;
  watchers?: number;
}

// Revalidate every hour for ISR
export const revalidate = 3600;

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
                case 'language':
                  project.language = value;
                  break;
                case 'languageColor':
                  project.languageColor = value;
                  break;
                case 'stars':
                  project.stars = parseInt(value) || 0;
                  break;
                case 'forks':
                  project.forks = parseInt(value) || 0;
                  break;
                case 'watchers':
                  project.watchers = parseInt(value) || 0;
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

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'today';
  if (diffInDays === 1) return 'yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Hero 
          title="Featured Projects" 
          subtitle="My Work" 
          description="A collection of my open-source projects and contributions"
        />
        
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8 mt-12">
          {projects.map((project) => (
            <div key={project.slug} className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-[var(--color-card)] border border-[var(--color-border)] p-6 hover:transform hover:scale-[1.02] transition-all duration-300 flex flex-col h-full">
              {/* GitHub-inspired header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <Link href={`/projects/${project.slug}`} className="block">
                    <h3 className="text-xl font-semibold text-[var(--color-primary)] hover:underline truncate">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-[var(--color-muted-foreground)] mt-2 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* GitHub-inspired stats */}
              <div className="flex items-center gap-4 text-sm text-[var(--color-muted-foreground)] mb-4">
                {project.language && (
                  <div className="flex items-center gap-1">
                    <span 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.languageColor || 'var(--color-primary)' }}
                    ></span>
                    <span>{project.language}</span>
                  </div>
                )}
                {project.stars && project.stars > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{project.stars}</span>
                  </div>
                )}
                {project.forks && project.forks > 0 && (
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    <span>{project.forks}</span>
                  </div>
                )}
                {project.watchers && project.watchers > 0 && (
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{project.watchers}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-[var(--color-muted)] text-[var(--color-muted-foreground)] rounded-full">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-[var(--color-muted)] text-[var(--color-muted-foreground)] rounded-full">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Footer with update time */}
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-[var(--color-muted-foreground)]">
                  <Calendar className="w-3 h-3" />
                  <span>Updated {formatRelativeTime(project.date)}</span>
                </div>
                <Link 
                  href={`/projects/${project.slug}`}
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors text-sm"
                >
                  View details →
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--color-muted-foreground)] text-lg">
              No projects found. Check back soon!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

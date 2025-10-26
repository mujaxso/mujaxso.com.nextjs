import Link from "next/link";
import { ExternalLink, Github, Star, GitFork, Eye, Calendar, ArrowRight } from "lucide-react";
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
  image?: string;
}

// Revalidate every minute for ISR to ensure new content is indexed quickly
export const revalidate = 60;

async function getProjects(): Promise<Project[]> {
  const projectsDirectory = join(process.cwd(), 'src', 'content', 'projects');
  
  try {
    const files = await fs.readdir(projectsDirectory, { recursive: true });
    const projects = await Promise.all(
      files
        .filter(file => typeof file === 'string' && file.endsWith('.mdx'))
        .map(async (file) => {
          try {
            // Use the filename without extension as the slug
            const slug = file.split('/').pop()!.replace(/\.mdx$/, '');
            const filePath = join(projectsDirectory, file);
            const fileContent = await fs.readFile(filePath, 'utf8');
            
            // Extract frontmatter
            const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
            if (!frontmatterMatch) {
              console.warn(`No frontmatter found for project: ${file}`);
              return null;
            }
            
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
                    try {
                      // Handle array syntax
                      if (value.startsWith('[') && value.endsWith(']')) {
                        project.tags = JSON.parse(value);
                      } else {
                        project.tags = value.split(',').map(tag => tag.trim());
                      }
                    } catch (error) {
                      console.warn(`Failed to parse tags for ${file}:`, error);
                      project.tags = value.split(',').map(tag => tag.trim());
                    }
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
                  case 'image':
                    project.image = value;
                    break;
                }
              }
            });
            
            return project;
          } catch (error) {
            console.error(`Error processing project file ${file}:`, error);
            return null;
          }
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Hero 
          title="Featured Projects" 
          subtitle="My Work" 
          description="A collection of my open-source projects and contributions"
        />
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
          {projects.map((project) => (
            <div key={project.slug} className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-card)] to-[var(--color-card)]/80 border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] flex flex-col h-full">
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 flex items-center justify-center">
                    <div className="text-4xl font-bold text-[var(--color-primary)]/60">
                      {project.title.split(' ').map(word => word[0]).join('').toUpperCase()}
                    </div>
                  </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* External links */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-[var(--color-card)]/90 backdrop-blur-sm text-[var(--color-foreground)] hover:text-[var(--color-primary)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-[var(--color-card)]/90 backdrop-blur-sm text-[var(--color-foreground)] hover:text-[var(--color-primary)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Title and Description */}
                <div className="flex-1">
                  <Link href={`/projects/${project.slug}`} className="block">
                    <h3 className="text-xl font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors duration-300 mb-3 line-clamp-2">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-[var(--color-muted-foreground)] text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Stats and Metadata */}
                <div className="space-y-4">
                  {/* GitHub stats */}
                  {(project.language || project.stars || project.forks) && (
                    <div className="flex items-center gap-4 text-xs text-[var(--color-muted-foreground)]">
                      {project.language && (
                        <div className="flex items-center gap-1">
                          <span 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: project.languageColor || 'var(--color-primary)' }}
                          ></span>
                          <span>{project.language}</span>
                        </div>
                      )}
                      {project.stars && project.stars > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          <span>{project.stars}</span>
                        </div>
                      )}
                      {project.forks && project.forks > 0 && (
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          <span>{project.forks}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full border border-[var(--color-primary)]/20">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-[var(--color-muted)] text-[var(--color-muted-foreground)] rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                    <div className="flex items-center gap-1 text-xs text-[var(--color-muted-foreground)]">
                      <Calendar className="w-3 h-3" />
                      <span>{formatRelativeTime(project.date)}</span>
                    </div>
                    <Link 
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors text-sm group/link"
                    >
                      View project
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {projects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚧</div>
            <p className="text-[var(--color-muted-foreground)] text-lg">
              Projects are being prepared. Check back soon!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

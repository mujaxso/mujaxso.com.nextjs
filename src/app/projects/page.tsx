import { join } from "path";
import { promises as fs } from "fs";
import { Hero } from "../components/Hero";
import { GitHubProjectsGrid } from "../components/ui/GitHubProjectsGrid";

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
  
  // Transform projects to match GitHubProjectsGrid interface
  const githubProjects = projects.map(project => ({
    title: project.title,
    description: project.description,
    language: project.language || project.category,
    languageColor: project.languageColor,
    stars: project.stars || 0,
    forks: project.forks || 0,
    watchers: project.watchers || 0,
    updatedAt: formatRelativeTime(project.date),
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    isFork: false, // You can add this to your frontmatter if needed
  }));
  
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Hero 
          title="Featured Projects" 
          subtitle="My Work" 
          description="A collection of my open-source projects and contributions"
        />
        
        <GitHubProjectsGrid projects={githubProjects} className="mt-12" />
        
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

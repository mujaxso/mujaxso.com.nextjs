import { notFound } from 'next/navigation';
import Link from 'next/link';
import { promises as fs } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { Github, ExternalLink } from 'lucide-react';
import ClientMDXRenderer from '../../components/ClientMDXRenderer';

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

async function findProjectFile(slug: string): Promise<string | null> {
  const projectsDirectory = join(process.cwd(), 'src', 'content', 'projects');
  try {
    const files = await fs.readdir(projectsDirectory, { recursive: true });
    for (const file of files) {
      if (typeof file === 'string' && file.endsWith('.mdx')) {
        const fileName = file.split('/').pop()!.replace(/\.mdx$/, '');
        if (fileName === slug) {
          return join(projectsDirectory, file);
        }
      }
    }
    return null;
  } catch (error) {
    console.error('Error searching for project file:', error);
    return null;
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  if (!resolvedParams?.slug) {
    notFound();
  }
  
  const slug = resolvedParams.slug;
  const fullPath = await findProjectFile(slug);
  
  if (!fullPath) {
    notFound();
  }
  
  try {
    await fs.access(fullPath);
    const fileContent = await fs.readFile(fullPath, 'utf8');
    
    // Parse frontmatter and content using gray-matter
    const { data: frontmatter, content } = matter(fileContent);
    
    const project: Project = {
      slug,
      title: frontmatter.title || '',
      description: frontmatter.description || '',
      date: frontmatter.date || '',
      category: frontmatter.category,
      tags: frontmatter.tags || [],
      githubUrl: frontmatter.githubUrl,
      liveUrl: frontmatter.liveUrl,
      featured: frontmatter.featured || false,
    };
    
    return (
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-300">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Back to Projects Link - Centered and Bigger */}
          <div className="flex justify-center mb-12">
            <Link 
              href="/projects" 
              className="inline-flex items-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors group text-lg"
            >
              <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>
          </div>
          
          {/* Centered Header */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-[var(--color-muted-foreground)]">
                {project.description}
              </p>
            </div>
            
            {/* Action Buttons - Centered */}
            <div className="flex justify-center gap-4 mb-6">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl hover:bg-[var(--color-primary-hover)] transition-colors text-sm font-medium"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] text-[var(--color-foreground)] rounded-xl hover:bg-[var(--color-muted)] transition-colors text-sm font-medium"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Website
                </a>
              )}
            </div>
              
            {/* Metadata - Centered */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--color-muted-foreground)]">
              {project.date && (
                <span>📅 {new Date(project.date).toLocaleDateString()}</span>
              )}
              {project.category && (
                <span className="px-3 py-1 bg-[var(--color-primary)]/20 text-[var(--color-primary)] rounded-full text-xs font-medium">
                  {project.category}
                </span>
              )}
            </div>
          </div>
          
          {/* Centered Content Area - Clean GitHub Style */}
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              {/* GitHub-like Markdown Content - Clean and Centered */}
              <ClientMDXRenderer content={content} />
              
              {/* Tags at the bottom */}
              {project.tags && project.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
                  <h4 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 text-center">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-4 py-2 bg-[var(--color-primary)]/20 text-[var(--color-primary)] rounded-full text-sm font-medium hover:bg-[var(--color-primary)]/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading project:', error);
    notFound();
  }
}


export async function generateStaticParams() {
  const projectsDirectory = join(process.cwd(), 'src', 'content', 'projects');
  
  try {
    const files = await fs.readdir(projectsDirectory, { recursive: true });
    return files
      .filter(file => typeof file === 'string' && file.endsWith('.mdx'))
      .map(file => {
        const slug = file.split('/').pop()!.replace(/\.mdx$/, '');
        return { slug };
      });
  } catch (error) {
    return [];
  }
}

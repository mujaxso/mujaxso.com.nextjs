import { notFound } from 'next/navigation';
import Link from 'next/link';
import { promises as fs } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { Github, ExternalLink } from 'lucide-react';
import ClientMDXRenderer from '../../components/ClientMDXRenderer';
import type { Metadata } from "next";

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  return {
    alternates: {
      canonical: `https://mujaxso.com/projects/${slug}`,
    },
    openGraph: {
      url: `https://mujaxso.com/projects/${slug}`,
    },
  };
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
          
          {/* Modern Project Header */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {project.description}
              </p>
            </div>
            
            {/* Action Buttons - Modern */}
            <div className="flex justify-center gap-4 mb-8">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
                  className="inline-flex items-center gap-3 px-6 py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Website
                </a>
              )}
            </div>
              
            {/* Metadata - Modern */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              {project.date && (
                <span className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full border border-border">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(project.date).toLocaleDateString()}
                </span>
              )}
              {project.category && (
                <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20">
                  {project.category}
                </span>
              )}
            </div>
          </div>
          
          {/* Elegant Content Area - Wider */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              {/* Elegant Markdown Content */}
              <ClientMDXRenderer content={content} />
              
              {/* Tags at the bottom */}
              {project.tags && project.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border/50">
                  <h4 className="text-xl font-semibold text-foreground mb-6 text-center">Technologies Used</h4>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-all duration-300"
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

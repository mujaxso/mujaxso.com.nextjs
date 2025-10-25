import { notFound } from 'next/navigation';
import Link from 'next/link';
import { promises as fs } from 'fs';
import { join } from 'path';
import ReactMarkdown from 'react-markdown';
import { Github, ExternalLink } from 'lucide-react';

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

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  if (!resolvedParams?.slug) {
    notFound();
  }
  
  const slug = resolvedParams.slug;
  const fullPath = join(process.cwd(), 'src', 'content', 'projects', `${slug}.mdx`);
  
  try {
    await fs.access(fullPath);
    const fileContent = await fs.readFile(fullPath, 'utf8');
    
    // Extract frontmatter
    const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) notFound();
    
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
              console.warn(`Failed to parse tags for ${slug}:`, error);
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
        }
      }
    });
    
    // Extract content
    const content = fileContent.replace(/^---\n[\s\S]*?\n---/, '').trim();
    
    // Import rehype-highlight for syntax highlighting
    const rehypeHighlight = (await import('rehype-highlight')).default;
    
    // Import the SyntaxHighlighting component
    const SyntaxHighlighting = (await import('../../components/SyntaxHighlighting')).default;
    
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
          
          {/* Centered Content Area */}
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <article className="markdown-body">
                <SyntaxHighlighting />
                <ReactMarkdown
                  rehypePlugins={[
                    // Add syntax highlighting
                    [rehypeHighlight, { detect: true }],
                  ]}
                  components={{
                    // Heading styles using theme variables
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mt-12 mb-6 pb-2 border-b border-[var(--color-border)] text-[var(--color-foreground)]">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[var(--color-foreground)]">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold mt-8 mb-3 text-[var(--color-foreground)]">
                        {children}
                      </h3>
                    ),
                    // Paragraph styling
                    p: ({ children }) => (
                      <p className="mb-6 text-[var(--color-foreground)]/80 leading-relaxed">
                        {children}
                      </p>
                    ),
                    // Links
                    a: ({ children, href }) => (
                      <a 
                        href={href} 
                        className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:underline"
                        target={href?.startsWith('http') ? '_blank' : undefined}
                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    ),
                    // Lists
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-6 text-[var(--color-foreground)]/80 space-y-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-6 text-[var(--color-foreground)]/80 space-y-2">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="pl-2">{children}</li>
                    ),
                    // Code blocks
                    code: ({ children, className, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match;
                      
                      if (isInline) {
                        return (
                          <code className="bg-[var(--color-muted)] px-1.5 py-0.5 rounded text-sm font-mono text-[var(--color-foreground)] border border-[var(--color-border)]" {...props}>
                            {children}
                          </code>
                        );
                      }
                      
                      return (
                        <div className="relative my-6">
                          <div className="absolute top-0 left-0 right-0 bg-[var(--color-muted)] text-[var(--color-muted-foreground)] text-xs px-4 py-2 rounded-t-lg font-mono border border-[var(--color-border)] border-b-0">
                            {match[1]}
                          </div>
                          <pre className="bg-[var(--color-muted)] p-4 rounded-lg border border-[var(--color-border)] overflow-x-auto mt-6">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        </div>
                      );
                    },
                    // Blockquotes
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-[var(--color-primary)] bg-[var(--color-muted)] pl-4 py-2 my-6 text-[var(--color-foreground)]/70 rounded-r">
                        {children}
                      </blockquote>
                    ),
                    // Tables
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6 border border-[var(--color-border)] rounded-lg">
                        <table className="min-w-full divide-y divide-[var(--color-border)]">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="px-4 py-3 bg-[var(--color-muted)] font-semibold text-left text-[var(--color-foreground)] text-sm">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-3 text-sm text-[var(--color-foreground)]/80 border-t border-[var(--color-border)]">
                        {children}
                      </td>
                    ),
                    // Strong/bold text
                    strong: ({ children }) => (
                      <strong className="font-semibold text-[var(--color-foreground)]">
                        {children}
                      </strong>
                    ),
                    // Emphasis/italic text
                    em: ({ children }) => (
                      <em className="italic text-[var(--color-foreground)]/80">
                        {children}
                      </em>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>
              
              {/* Tags at the bottom */}
              {project.tags && project.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
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
    const files = await fs.readdir(projectsDirectory);
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => ({
        slug: file.replace(/\.mdx$/, ''),
      }));
  } catch (error) {
    return [];
  }
}

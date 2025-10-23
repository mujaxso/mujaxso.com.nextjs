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
    
    // Extract content
    const content = fileContent.replace(/^---\n[\s\S]*?\n---/, '').trim();
    
    // Import rehype-highlight for syntax highlighting
    const rehypeHighlight = (await import('rehype-highlight')).default;
    
    // Get highlight.js CSS
    const highlightCss = await fs.readFile(
      join(process.cwd(), 'node_modules', 'highlight.js', 'styles', 'github-dark.css'),
      'utf8'
    );
    
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </Link>
          
          {/* GitHub-like header */}
          <div className="border-b border-border pb-4 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  {project.title}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {project.description}
                </p>
              </div>
              <div className="flex gap-3">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-sm font-medium"
                  >
                    <Github className="w-4 h-4" />
                    Star
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Website
                  </a>
                )}
              </div>
            </div>
              
            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
              {project.date && (
                <span>📅 {new Date(project.date).toLocaleDateString()}</span>
              )}
              {project.category && (
                <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-medium">
                  {project.category}
                </span>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4 inline mr-1" />
                  GitHub
                </a>
              )}
            </div>
          </div>
          
          {/* GitHub-like content area */}
          <div className="flex gap-8">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <article className="markdown-body">
                {/* Add highlight.js CSS from CDN */}
                <link 
                  rel="stylesheet" 
                  href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github-dark.min.css" 
                />
                <style jsx global>{`
                  .markdown-body pre {
                    background: rgb(24 24 27) !important;
                    border: 1px solid rgb(63 63 70) !important;
                    border-radius: 0.5rem;
                    padding: 1rem;
                    overflow-x: auto;
                    margin: 1rem 0;
                  }
                  .markdown-body code {
                    background: transparent !important;
                    padding: 0 !important;
                    border: none !important;
                  }
                  .markdown-body .hljs {
                    background: transparent !important;
                    padding: 0 !important;
                  }
                  [data-theme='light'] .markdown-body pre {
                    background: rgb(244 244 245) !important;
                    border-color: rgb(228 228 231) !important;
                  }
                  [data-theme='light'] .hljs {
                    background: transparent !important;
                  }
                `}</style>
                <ReactMarkdown
                  rehypePlugins={[
                    // Add syntax highlighting
                    [rehypeHighlight, { detect: true }],
                  ]}
                  components={{
                    // GitHub-like heading styles
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold mt-6 mb-3 text-zinc-900 dark:text-white">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-semibold mt-4 mb-2 text-zinc-900 dark:text-white">
                        {children}
                      </h3>
                    ),
                    // Paragraph styling
                    p: ({ children }) => (
                      <p className="mb-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {children}
                      </p>
                    ),
                    // Links
                    a: ({ children, href }) => (
                      <a 
                        href={href} 
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        target={href?.startsWith('http') ? '_blank' : undefined}
                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    ),
                    // Lists
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 text-zinc-700 dark:text-zinc-300 space-y-1">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 text-zinc-700 dark:text-zinc-300 space-y-1">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="pl-2">{children}</li>
                    ),
                    // GitHub-like code blocks
                    code: ({ children, className, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match;
                      
                      if (isInline) {
                        return (
                          <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700" {...props}>
                            {children}
                          </code>
                        );
                      }
                      
                      return (
                        <div className="relative my-4">
                          <div className="absolute top-0 left-0 right-0 bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs px-4 py-1 rounded-t-lg font-mono">
                            {match[1]}
                          </div>
                          <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-x-auto mt-6">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        </div>
                      );
                    },
                    // GitHub-like blockquotes
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 pl-4 py-2 my-4 text-zinc-700 dark:text-zinc-300 rounded-r">
                        {children}
                      </blockquote>
                    ),
                    // GitHub-like tables
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800 font-semibold text-left text-zinc-900 dark:text-white text-sm">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 border-t border-zinc-200 dark:border-zinc-700">
                        {children}
                      </td>
                    ),
                    // Strong/bold text
                    strong: ({ children }) => (
                      <strong className="font-semibold text-zinc-900 dark:text-white">
                        {children}
                      </strong>
                    ),
                    // Emphasis/italic text
                    em: ({ children }) => (
                      <em className="italic text-zinc-700 dark:text-zinc-300">
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
                <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar (like GitHub's right sidebar) */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-8 space-y-6">
                {project.tags && project.tags.length > 0 && (
                  <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">About</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 6).map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {project.githubUrl && (
                  <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Links</h4>
                    <div className="space-y-2">
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <Github className="w-4 h-4" />
                        View on GitHub
                      </a>
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
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

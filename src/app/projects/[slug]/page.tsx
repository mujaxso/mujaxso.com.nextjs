import { notFound } from 'next/navigation';
import Link from 'next/link';
import { promises as fs } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params to ensure they're resolved
  const resolvedParams = await params;
  
  // Validate that slug exists
  if (!resolvedParams?.slug) {
    console.error('Slug is undefined or null');
    notFound();
  }
  
  console.log('Rendering project:', resolvedParams.slug);
  const projectsDirectory = join(process.cwd(), 'src', 'content', 'projects');
  const fullPath = join(projectsDirectory, `${resolvedParams.slug}.mdx`);
  
  try {
    // Check if the file exists first
    await fs.access(fullPath);
    console.log('File exists:', fullPath);
    
    // Read and parse the file
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);
    console.log('Frontmatter:', frontmatter);
    
    // Validate required frontmatter
    if (!frontmatter.title) {
      console.error('Missing title in frontmatter');
      notFound();
    }
    
    return (
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900 transition-colors duration-300">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link href="/projects" className="text-zinc-900 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-8 inline-block">
            ← Back to Projects
          </Link>
          <article className="prose dark:prose-invert max-w-none">
            <h1>{frontmatter.title}</h1>
            <MDXRemote source={content} />
          </article>
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

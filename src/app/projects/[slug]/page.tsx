import { notFound } from 'next/navigation';
import Link from 'next/link';
import { promises as fs } from 'fs';
import { join } from 'path';

// Create a mapping of slugs to MDX imports
const getMDXComponent = async (slug: string) => {
  try {
    // Import the MDX file directly
    const module = await import(`@/content/projects/${slug}.mdx`);
    return module.default;
  } catch (error) {
    return null;
  }
};

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const projectsDirectory = join(process.cwd(), 'src', 'content', 'projects');
  const fullPath = join(projectsDirectory, `${params.slug}.mdx`);
  
  try {
    // Check if the file exists
    await fs.access(fullPath);
    
    // Get the MDX component
    const MDXContent = await getMDXComponent(params.slug);
    
    if (!MDXContent) {
      notFound();
    }
    
    return (
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900 transition-colors duration-300">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link href="/projects" className="text-zinc-900 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-8 inline-block">
            ← Back to Projects
          </Link>
          <article className="prose dark:prose-invert max-w-none">
            <MDXContent />
          </article>
        </main>
      </div>
    );
  } catch (error) {
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

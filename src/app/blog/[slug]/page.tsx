import { notFound } from 'next/navigation';
import Link from 'next/link';
import { promises as fs } from 'fs';
import { join } from 'path';
import dynamic from 'next/dynamic';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blogDirectory = join(process.cwd(), 'src', 'content', 'blog');
  const fullPath = join(blogDirectory, `${params.slug}.mdx`);
  
  try {
    // Check if the file exists
    await fs.access(fullPath);
    
    // Use dynamic import for MDX files
    // We need to use a client component wrapper since dynamic imports don't work directly in server components
    const MDXContent = dynamic(() => import(`@/content/blog/${params.slug}.mdx`), {
      loading: () => <p>Loading...</p>,
    });
    
    return (
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900 transition-colors duration-300">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link href="/blog" className="text-zinc-900 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-8 inline-block">
            ← Back to Blog
          </Link>
          <article className="prose dark:prose-invert max-w-none">
            {/* @ts-expect-error Server Component */}
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
  const blogDirectory = join(process.cwd(), 'src', 'content', 'blog');
  
  try {
    const files = await fs.readdir(blogDirectory);
    const params = files
      .filter(file => file.endsWith('.mdx'))
      .map(file => ({
        slug: file.replace(/\.mdx$/, ''),
      }));
    console.log('Generated blog params:', params);
    return params;
  } catch (error) {
    console.error('Error generating blog static params:', error);
    return [];
  }
}

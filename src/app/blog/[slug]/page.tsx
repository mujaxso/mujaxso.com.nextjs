import { notFound } from 'next/navigation';
import Link from 'next/link';
import { promises as fs } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Validate that slug exists
  if (!params?.slug) {
    console.error('Slug is undefined or null');
    notFound();
  }
  
  console.log('Rendering blog post:', params.slug);
  const blogDirectory = join(process.cwd(), 'src', 'content', 'blog');
  const fullPath = join(blogDirectory, `${params.slug}.mdx`);
  
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
          <Link href="/blog" className="text-zinc-900 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-8 inline-block">
            ← Back to Blog
          </Link>
          <article className="prose dark:prose-invert max-w-none">
            <h1>{frontmatter.title}</h1>
            <div className="text-zinc-600 dark:text-zinc-400 mb-8">
              {frontmatter.date ? new Date(frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'Unknown date'}
            </div>
            <MDXRemote source={content} />
          </article>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
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

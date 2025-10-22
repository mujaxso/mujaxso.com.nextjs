import { notFound } from 'next/navigation';
import Link from 'next/link';
import { promises as fs } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params to ensure they're resolved
  const resolvedParams = await params;
  
  // Validate that slug exists
  if (!resolvedParams?.slug) {
    console.error('Slug is undefined or null');
    notFound();
  }
  
  console.log('Rendering blog post:', resolvedParams.slug);
  const blogDirectory = join(process.cwd(), 'src', 'content', 'blog');
  const fullPath = join(blogDirectory, `${resolvedParams.slug}.mdx`);
  
  try {
    // Check if the file exists first
    await fs.access(fullPath);
    console.log('File exists:', fullPath);
    
    // Read and parse the file
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);
    console.log('Frontmatter:', frontmatter);
    
    // Use default values if frontmatter is missing
    const title = frontmatter.title || `Blog Post ${resolvedParams.slug}`;
    const date = frontmatter.date || 'Unknown date';
    
    // Calculate reading time
    const readingTime = calculateReadingTime(content);
    
    return (
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900 transition-colors duration-300">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link href="/blog" className="inline-flex items-center text-zinc-900 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-8 group">
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          <article className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 md:p-12">
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                  {frontmatter.category || 'Uncategorized'}
                </span>
                {frontmatter.tags?.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-sm font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                {title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-zinc-600 dark:text-zinc-400">
                <span>{date !== 'Unknown date' ? new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : date}</span>
                <span>•</span>
                <span>{readingTime}</span>
                {frontmatter.author && (
                  <>
                    <span>•</span>
                    <span>By {frontmatter.author}</span>
                  </>
                )}
              </div>
            </header>
            
            {frontmatter.image && (
              <div className="mb-8 rounded-xl overflow-hidden">
                <Image 
                  src={frontmatter.image} 
                  alt={title} 
                  width={800} 
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            
            <div className="prose dark:prose-invert max-w-none prose-lg">
              <MDXRemote source={content} />
            </div>
            
            {/* Related Posts Section */}
            <RelatedPosts currentSlug={resolvedParams.slug} category={frontmatter.category} />
          </article>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}

async function RelatedPosts({ currentSlug, category }: { currentSlug: string; category?: string }) {
  const posts = await getBlogPosts();
  const relatedPosts = posts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700">
      <h3 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Related Posts</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <article className="bg-zinc-50 dark:bg-zinc-700 rounded-lg p-4 hover:bg-zinc-100 dark:hover:bg-zinc-600 transition-colors">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                {post.title}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center justify-between mt-3 text-xs text-zinc-500 dark:text-zinc-500">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span>{post.readingTime}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
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

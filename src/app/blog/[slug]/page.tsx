import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { promises as fs } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Author from '../../components/Author';
import { Suspense } from 'react';

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

interface AuthorData {
  name: string;
  image: string;
  bio: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

async function getBlogPosts() {
  const blogDirectory = join(process.cwd(), 'src', 'content', 'blog');
  
  try {
    const files = await fs.readdir(blogDirectory);
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, '');
          const fullPath = join(blogDirectory, file);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const { data } = matter(fileContents);
          
          // Parse author data
          let author: AuthorData | undefined;
          if (data.author) {
            if (typeof data.author === 'string') {
              try {
                author = JSON.parse(data.author);
              } catch {
                author = { name: data.author, image: '/default-avatar.jpg', bio: '' };
              }
            } else if (typeof data.author === 'object') {
              author = data.author;
            }
          }
          
          return {
            slug,
            title: data.title || `Blog Post ${slug}`,
            description: data.description || 'No description available.',
            date: data.date || 'Unknown date',
            image: data.image || '/vercel.svg',
            category: data.category || 'Uncategorized',
            tags: data.tags || [],
            readingTime: calculateReadingTime(fileContents),
            featured: data.featured || false,
            author,
          };
        })
    );
    
    // Sort posts by date in descending order
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
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
      <div className="min-h-screen bg-background transition-colors duration-300">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Back to Blog Link - Always at the top */}
          <div className="flex justify-center mb-8">
            <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group">
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
          
          {/* Centered Article Content */}
          <div className="flex justify-center">
            <article className="bg-card w-full max-w-4xl">
            <header className="mb-12 text-center">
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                  {frontmatter.category || 'Uncategorized'}
                </span>
                {frontmatter.tags?.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6">
                {title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground justify-center">
                <span>{date !== 'Unknown date' ? new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : date}</span>
                <span>•</span>
                <span>{readingTime}</span>
              </div>
            </header>
          
            {frontmatter.image && (
              <div className="mb-12 rounded-xl overflow-hidden">
                <Image 
                  src={frontmatter.image} 
                  alt={title} 
                  width={800} 
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          
            <div className="prose prose-xl max-w-none mx-auto prose-headings:text-card-foreground prose-p:text-card-foreground/80 prose-strong:text-card-foreground prose-em:text-card-foreground prose-a:text-primary hover:prose-a:text-primary-dark prose-blockquote:text-card-foreground/60 prose-blockquote:border-primary prose-ul:text-card-foreground/80 prose-ol:text-card-foreground/80 prose-li:text-card-foreground/80 prose-code:text-card-foreground prose-pre:bg-muted">
              <Suspense fallback={<div className="text-center py-8">Loading content...</div>}>
                <MDXContent content={content} />
              </Suspense>
            </div>
          
            {/* Author Section */}
            <div className="mt-16 pt-12">
              <Author 
                name="Mujahid Siyam"
                image="/img/profile.png"
                bio="Software Engineer • AI/ML Engineer • Data Scientist • DevSecOps building cutting-edge solutions"
                socialLinks={{
                  github: "https://github.com/mujaxso",
                  twitter: "https://twitter.com/mujaxso",
                  linkedin: "https://linkedin.com/in/mujaxso",
                  website: "https://mujaxso.com"
                }}
              />
            </div>
          
            {/* Related Posts Section */}
            <RelatedPosts currentSlug={resolvedParams.slug} category={frontmatter.category} />
            </article>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}

// Separate component for MDX content to handle errors better
async function MDXContent({ content }: { content: string }) {
  try {
    const { MDXRemote } = await import('next-mdx-remote/rsc');
    return <MDXRemote source={content} />;
  } catch (error) {
    console.error('Error rendering MDX:', error);
    return (
      <div className="text-center py-8 text-red-500">
        Error loading content. Please try refreshing the page.
      </div>
    );
  }
}

async function RelatedPosts({ currentSlug, category }: { currentSlug: string; category?: string }) {
  const posts = await getBlogPosts();
  const relatedPosts = posts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h3 className="text-2xl font-bold mb-6 text-card-foreground">Related Posts</h3>
      <div className="grid gap-6 md:grid-cols-4">
        {relatedPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <article className="backdrop-blur-sm bg-card border border-border rounded-lg p-4 hover:bg-primary/10 transition-colors">
              <h4 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                {post.title}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
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

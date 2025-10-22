import { getProjectMDX } from '@/lib/mdx';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { content } = await getProjectMDX(params.slug);
  
  if (!content) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900 transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link href="/blog" className="text-zinc-900 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-8 inline-block">
          ← Back to Blog
        </Link>
        <article className="prose dark:prose-invert max-w-none">
          {content}
        </article>
      </main>
    </div>
  );
}

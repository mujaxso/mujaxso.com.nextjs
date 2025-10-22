import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900 transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">Blog</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {[1, 2, 3, 4].map((post) => (
            <article key={post} className="group rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 hover:transform hover:scale-[1.02] transition-all">
              <div className="h-48 bg-zinc-200 dark:bg-zinc-700 rounded-lg mb-4 overflow-hidden">
                <Image src="/vercel.svg" alt={`Post ${post} cover`} width={400} height={200} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  <Link href={`/blog/${post}`}>
                    Blog Post {post}
                  </Link>
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500 dark:text-zinc-500">April 2, 2025</span>
                  <Link href={`/blog/${post}`} className="text-blue-500 dark:text-blue-400 hover:underline">
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

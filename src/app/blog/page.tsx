import BlogPageClient from './page-client';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  category?: string;
  tags?: string[];
  readingTime?: string;
  featured?: boolean;
}

interface BlogPageProps {
  posts: BlogPost[];
}

export default function BlogPage({ posts }: BlogPageProps) {
  return <BlogPageClient posts={posts} />;
}

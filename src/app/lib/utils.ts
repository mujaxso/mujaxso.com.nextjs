import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function formatDate(dateString: string): string {
  if (dateString === 'Unknown date') return dateString;
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export async function readContentFile<T>(
  directory: string,
  slug: string,
  parser: (fileContent: string, slug: string) => T
): Promise<T> {
  const { promises: fs } = await import('fs');
  const { join } = await import('path');
  
  const fullPath = join(process.cwd(), 'src', 'content', directory, `${slug}.mdx`);
  await fs.access(fullPath);
  const fileContent = await fs.readFile(fullPath, 'utf8');
  return parser(fileContent, slug);
}

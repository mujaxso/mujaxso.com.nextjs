import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join } from 'path';

export const runtime = 'edge';

interface SearchResult {
  title: string;
  description: string;
  href: string;
  type: 'blog' | 'project' | 'page';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results: SearchResult[] = [];

    // Search blog posts
    const blogDirectory = join(process.cwd(), 'src', 'content', 'blog');
    try {
      const blogFiles = await fs.readdir(blogDirectory);
      for (const file of blogFiles.filter(file => file.endsWith('.mdx'))) {
        const filePath = join(blogDirectory, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Extract frontmatter (simplified parsing)
        const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/);
        const descriptionMatch = content.match(/description:\s*["']?([^"'\n]+)["']?/);
        
        const title = titleMatch ? titleMatch[1] : file.replace('.mdx', '');
        const description = descriptionMatch ? descriptionMatch[1] : '';
        
        if (title.toLowerCase().includes(query) || 
            description.toLowerCase().includes(query) ||
            content.toLowerCase().includes(query)) {
          results.push({
            title,
            description,
            href: `/blog/${file.replace('.mdx', '')}`,
            type: 'blog'
          });
        }
      }
    } catch (error) {
      console.error('Error reading blog directory:', error);
    }

    // Search projects
    const projectsDirectory = join(process.cwd(), 'src', 'content', 'projects');
    try {
      const projectFiles = await fs.readdir(projectsDirectory);
      for (const file of projectFiles.filter(file => file.endsWith('.mdx'))) {
        const filePath = join(projectsDirectory, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/);
        const descriptionMatch = content.match(/description:\s*["']?([^"'\n]+)["']?/);
        
        const title = titleMatch ? titleMatch[1] : file.replace('.mdx', '');
        const description = descriptionMatch ? descriptionMatch[1] : '';
        
        if (title.toLowerCase().includes(query) || 
            description.toLowerCase().includes(query) ||
            content.toLowerCase().includes(query)) {
          results.push({
            title,
            description,
            href: `/projects/${file.replace('.mdx', '')}`,
            type: 'project'
          });
        }
      }
    } catch (error) {
      console.error('Error reading projects directory:', error);
    }

    // Add static pages
    const pages = [
      { title: 'Home', description: 'Welcome to my portfolio', href: '/', type: 'page' as const },
      { title: 'Projects', description: 'View my projects and work', href: '/projects', type: 'page' as const },
      { title: 'Blog', description: 'Read my latest thoughts and insights', href: '/blog', type: 'page' as const },
      { title: 'About', description: 'Learn more about me', href: '/about', type: 'page' as const },
      { title: 'Contact', description: 'Get in touch with me', href: '/contact', type: 'page' as const }
    ];

    for (const page of pages) {
      if (page.title.toLowerCase().includes(query) || 
          page.description.toLowerCase().includes(query)) {
        results.push(page);
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ results: [] });
  }
}

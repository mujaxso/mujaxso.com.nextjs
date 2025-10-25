import { NextResponse } from 'next/server';
import { join } from 'path';
import { promises as fs } from 'fs';

const baseUrl = 'https://mujaxso.com';

// Function to get all blog posts
async function getBlogPosts() {
  const blogDirectory = join(process.cwd(), 'src', 'content', 'blog');
  
  try {
    const files = await fs.readdir(blogDirectory);
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, '');
          return `${baseUrl}/blog/${slug}`;
        })
    );
    return posts;
  } catch (error) {
    console.error('Error reading blog posts for sitemap:', error);
    return [];
  }
}

// Function to get all projects
async function getProjects() {
  const projectsDirectory = join(process.cwd(), 'src', 'content', 'projects');
  
  try {
    const files = await fs.readdir(projectsDirectory, { recursive: true });
    const projects = await Promise.all(
      files
        .filter(file => typeof file === 'string' && file.endsWith('.mdx'))
        .map(async (file) => {
          // Use the directory name as slug for nested projects
          const slug = file.replace(/\.mdx$/, '').split('/').pop();
          return `${baseUrl}/projects/${slug}`;
        })
    );
    return projects;
  } catch (error) {
    console.error('Error reading projects for sitemap:', error);
    return [];
  }
}

export async function GET() {
  // Static pages (aligned with sitemap.ts)
  const staticPages = [
    `${baseUrl}/`,
    `${baseUrl}/about`,
    `${baseUrl}/projects`,
    `${baseUrl}/blog`,
    `${baseUrl}/contact`,
    `${baseUrl}/music`,
  ];

  // Get dynamic content
  const blogPosts = await getBlogPosts();
  const projects = await getProjects();

  // Combine all URLs and remove duplicates
  const allUrls = [...staticPages, ...blogPosts, ...projects];
  const uniqueUrls = Array.from(new Set(allUrls));

  // Create sitemap content
  const sitemapContent = uniqueUrls.join('\n');

  return new NextResponse(sitemapContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}

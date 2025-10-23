import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join } from 'path';

// Use Node.js runtime to access file system
export const runtime = 'nodejs';

async function getProjects() {
  const projectsDirectory = join(process.cwd(), 'src', 'content', 'projects');
  
  try {
    const files = await fs.readdir(projectsDirectory);
    const projects = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, '');
          const filePath = join(projectsDirectory, file);
          const content = await fs.readFile(filePath, 'utf-8');
          
          // Extract frontmatter (simplified parsing)
          const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/);
          const descriptionMatch = content.match(/description:\s*["']?([^"'\n]+)["']?/);
          
          return {
            slug,
            title: titleMatch ? titleMatch[1] : slug,
            description: descriptionMatch ? descriptionMatch[1] : '',
          };
        })
    );
    
    return projects;
  } catch (error) {
    console.error('Error reading projects directory:', error);
    return [];
  }
}

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Fallback to static data
    const projects = [
      { title: 'E-commerce Platform', description: 'Full-stack e-commerce solution with React and Node.js', slug: 'ecommerce-platform' },
      { title: 'AI Chat Application', description: 'Real-time chat application with AI-powered responses', slug: 'ai-chat-app' },
      { title: 'Data Visualization Dashboard', description: 'Interactive dashboard for data analysis and visualization', slug: 'data-dashboard' },
    ];
    return NextResponse.json(projects);
  }
}

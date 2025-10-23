import { NextResponse } from 'next/server';

// Use Node.js runtime to access file system
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Import the function that gets projects
    // You'll need to create a similar function for projects
    // For now, return static data
    const projects = [
      { title: 'E-commerce Platform', description: 'Full-stack e-commerce solution with React and Node.js', slug: 'ecommerce-platform' },
      { title: 'AI Chat Application', description: 'Real-time chat application with AI-powered responses', slug: 'ai-chat-app' },
      { title: 'Data Visualization Dashboard', description: 'Interactive dashboard for data analysis and visualization', slug: 'data-dashboard' },
    ];
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

import { MetadataRoute } from 'next'
import { join } from 'path'
import { promises as fs } from 'fs'

const baseUrl = 'https://mujaxso.com'

// Function to get all blog posts with their last modified dates
async function getBlogPosts(): Promise<{ url: string; lastModified: Date }[]> {
  const blogDirectory = join(process.cwd(), 'src', 'content', 'blog')
  
  try {
    const files = await fs.readdir(blogDirectory)
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, '')
          const filePath = join(blogDirectory, file)
          const stats = await fs.stat(filePath)
          return {
            url: `${baseUrl}/blog/${slug}`,
            lastModified: stats.mtime,
          }
        })
    )
    return posts
  } catch (error) {
    console.error('Error reading blog posts for sitemap:', error)
    return []
  }
}

// Function to get all projects with their last modified dates
async function getProjects(): Promise<{ url: string; lastModified: Date }[]> {
  const projectsDirectory = join(process.cwd(), 'src', 'content', 'projects')
  
  try {
    const files = await fs.readdir(projectsDirectory, { recursive: true })
    const projects = await Promise.all(
      files
        .filter(file => typeof file === 'string' && file.endsWith('.mdx'))
        .map(async (file) => {
          // Use the directory name as slug for nested projects
          const slug = file.replace(/\.mdx$/, '').split('/').pop()
          const filePath = join(projectsDirectory, file)
          const stats = await fs.stat(filePath)
          return {
            url: `${baseUrl}/projects/${slug}`,
            lastModified: stats.mtime,
          }
        })
    )
    return projects
  } catch (error) {
    console.error('Error reading projects for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/music`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Get dynamic content
  const blogPosts = await getBlogPosts()
  const projects = await getProjects()

  // Add dynamic pages to sitemap
  const dynamicPages = [
    ...blogPosts.map(post => ({
      url: post.url,
      lastModified: post.lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...projects.map(project => ({
      url: project.url,
      lastModified: project.lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  return [...staticPages, ...dynamicPages]
}

# Portfolio Website

A modern and responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features dark mode, smooth animations, and a clean, professional design.

## Features

- 🌓 Dark/Light mode toggle (system-aware)
- 🎨 Gradient accents and modern design
- 📱 Fully responsive layout
- ⚡ Smooth animations and transitions
- 📄 Sections for projects, blog, about, and contact
- 📝 MDX-based content management for projects and blog posts
- 🔍 Dynamic project listing with tags and categories

## Content Management

The website uses MDX files for dynamic content management:

- **Projects**: Add `.mdx` files to `src/content/projects/` with frontmatter
- **Blog Posts**: Add `.mdx` files to `src/content/blog/` with frontmatter

### Project Frontmatter Example:

```yaml
---
title: "Project Name"
description: "Brief project description"
date: "2025-10-22"
category: "Development"
tags: ["react", "typescript", "nextjs"]
githubUrl: "https://github.com/username/repo"
liveUrl: "https://project.example.com"
featured: true
---
```

### Adding New Projects:

1. Create a new `.mdx` file in `src/content/projects/`
2. Add the frontmatter with project details
3. Write your project content using Markdown/MDX
4. The project will automatically appear on the projects page

### Project Structure:

- Projects are dynamically loaded from MDX files
- Project cards are fully clickable and navigate to individual project pages
- GitHub and live demo links work independently without navigation conflicts
- Projects are sorted by date (newest first)

## Development

First, install dependencies:

```bash
pnpm install
```

Then run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

## Deployment

The site is optimized for Vercel deployment:

1. Push your code to a GitHub repository
2. Create a new project on [Vercel](https://vercel.com/new)
3. Import your repository
4. Deploy!

All configurations are already set up for optimal performance.

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

The website uses a combination of hardcoded data and MDX files for content:

- **Projects**: Using hardcoded data in `src/app/projects/page.tsx` with MDX files for individual project pages
- **Blog Posts**: Add `.mdx` files to `src/content/blog/` with frontmatter

### Project Structure:
- Project cards are fully clickable and navigate to individual project pages
- GitHub and live demo links work independently without navigation conflicts
- Individual project pages are rendered from MDX files in `src/content/projects/`

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

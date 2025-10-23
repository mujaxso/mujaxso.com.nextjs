"use client"

import { GitHubProjectCard } from "./GitHubProjectCard"

interface Project {
  title: string
  description: string
  language?: string
  languageColor?: string
  stars?: number
  forks?: number
  watchers?: number
  updatedAt?: string
  githubUrl?: string
  liveUrl?: string
  isFork?: boolean
}

interface GitHubProjectsGridProps {
  projects: Project[]
  className?: string
}

export function GitHubProjectsGrid({ projects, className }: GitHubProjectsGridProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <GitHubProjectCard
            key={index}
            title={project.title}
            description={project.description}
            language={project.language}
            languageColor={project.languageColor}
            stars={project.stars}
            forks={project.forks}
            watchers={project.watchers}
            updatedAt={project.updatedAt}
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
            isFork={project.isFork}
          />
        ))}
      </div>
    </div>
  )
}

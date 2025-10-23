"use client"

import { Card, CardContent, CardFooter, CardHeader } from "./Card"
import { cn } from "../../lib/utils"
import { Star, GitFork, Eye, Calendar, ExternalLink, Github } from "lucide-react"

interface GitHubProjectCardProps {
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
  className?: string
}

export function GitHubProjectCard({
  title,
  description,
  language,
  languageColor,
  stars = 0,
  forks = 0,
  watchers = 0,
  updatedAt,
  githubUrl,
  liveUrl,
  isFork = false,
  className
}: GitHubProjectCardProps) {
  return (
    <Card className={cn("hover:shadow-lg transition-all duration-300 border border-[var(--color-border)]", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {isFork && (
              <GitFork className="w-4 h-4 text-[var(--color-muted-foreground)]" />
            )}
            <h3 className="font-semibold text-[var(--color-primary)] hover:underline cursor-pointer text-lg">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-1">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-[var(--color-muted)] rounded transition-colors"
                aria-label="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-[var(--color-muted)] rounded transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm text-[var(--color-muted-foreground)] mt-2 overflow-hidden" 
           style={{
             display: '-webkit-box',
             WebkitBoxOrient: 'vertical',
             WebkitLineClamp: 2
           }}>
          {description}
        </p>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex items-center gap-4 text-xs text-[var(--color-muted-foreground)]">
          {language && (
            <div className="flex items-center gap-1">
              <span 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: languageColor || 'var(--color-primary)' }}
              ></span>
              <span>{language}</span>
            </div>
          )}
          {stars > 0 && (
            <div className="flex items-center gap-1 hover:text-[var(--color-primary)] cursor-pointer transition-colors">
              <Star className="w-3 h-3" />
              <span>{stars.toLocaleString()}</span>
            </div>
          )}
          {forks > 0 && (
            <div className="flex items-center gap-1 hover:text-[var(--color-primary)] cursor-pointer transition-colors">
              <GitFork className="w-3 h-3" />
              <span>{forks.toLocaleString()}</span>
            </div>
          )}
          {watchers > 0 && (
            <div className="flex items-center gap-1 hover:text-[var(--color-primary)] cursor-pointer transition-colors">
              <Eye className="w-3 h-3" />
              <span>{watchers.toLocaleString()}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        {updatedAt && (
          <div className="flex items-center gap-1 text-xs text-[var(--color-muted-foreground)]">
            <Calendar className="w-3 h-3" />
            <span>Updated {updatedAt}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

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
    <Card className={cn("hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {isFork && (
              <GitFork className="w-4 h-4 text-gray-500" />
            )}
            <h3 className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer text-lg">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-1">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
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
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
          {description}
        </p>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
          {language && (
            <div className="flex items-center gap-1">
              <span 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: languageColor || '#3572A5' }}
              ></span>
              <span>{language}</span>
            </div>
          )}
          {stars > 0 && (
            <div className="flex items-center gap-1 hover:text-yellow-600 cursor-pointer">
              <Star className="w-3 h-3" />
              <span>{stars.toLocaleString()}</span>
            </div>
          )}
          {forks > 0 && (
            <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
              <GitFork className="w-3 h-3" />
              <span>{forks.toLocaleString()}</span>
            </div>
          )}
          {watchers > 0 && (
            <div className="flex items-center gap-1 hover:text-purple-600 cursor-pointer">
              <Eye className="w-3 h-3" />
              <span>{watchers.toLocaleString()}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        {updatedAt && (
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Updated {updatedAt}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

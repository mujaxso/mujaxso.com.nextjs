"use client"

import { ReactNode } from "react"
import { cn } from "../../lib/utils"

interface CardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
  padding?: "sm" | "md" | "lg"
}

export function Card({ children, className, hoverEffect = true, padding = "md" }: CardProps) {
  const paddingClass = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  }[padding]

  return (
    <div 
      className={cn(
        "card-glass rounded-2xl flex flex-col h-full transition-all duration-500",
        paddingClass,
        hoverEffect && "hover:shadow-modern-hover",
        className
      )}
      style={{
        color: 'var(--color-card-foreground)'
      }}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mb-3", className)}>
      {children}
    </div>
  )
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mt-3", className)}>
      {children}
    </div>
  )
}

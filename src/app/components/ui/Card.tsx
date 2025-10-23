"use client"

import { ReactNode } from "react"
import { cn } from "../../lib/utils"

interface CardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
}

export function Card({ children, className, hoverEffect = true }: CardProps) {
  return (
    <div 
      className={cn(
        "backdrop-blur-xl border rounded-2xl p-4 sm:p-6 transition-all duration-300 flex flex-col h-full",
        hoverEffect && "hover:shadow-xl hover:scale-105",
        className
      )}
      style={{
        backgroundColor: 'var(--color-card)',
        borderColor: 'var(--color-border)',
        color: 'var(--color-card-foreground)'
      }}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  )
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mt-4", className)}>
      {children}
    </div>
  )
}

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
        "backdrop-blur-xl bg-glass border border-glass-border rounded-2xl p-6 transition-all duration-300",
        hoverEffect && "hover:shadow-xl hover:scale-105",
        className
      )}
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

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
        "card-glass rounded-3xl p-6 sm:p-8 flex flex-col h-full",
        hoverEffect && "hover:shadow-2xl",
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
        "card-glass rounded-3xl p-6 sm:p-8 flex flex-col h-full",
        hoverEffect && "hover:shadow-2xl",
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

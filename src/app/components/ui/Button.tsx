"use client"

import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "../../lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"
    
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group relative overflow-hidden",
          // Always include rounded-2xl to ensure consistent rendering
          "rounded-2xl",
          {
            "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg": 
              variant === "default",
            "border-2 border-border bg-card text-foreground":
              variant === "outline",
            "text-foreground": 
              variant === "ghost",
            "text-primary underline-offset-4": 
              variant === "link",
          },
          // Remove hover and active transforms from base classes to prevent hydration mismatch
          {
            "h-9 px-4 py-2 text-sm": size === "sm",
            "h-10 px-6 py-3": size === "md",
            "h-11 px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        style={{
          '--primary': 'var(--color-primary)',
          '--secondary': 'var(--color-secondary)',
          '--primary-foreground': 'var(--color-primary-foreground)',
          '--foreground': 'var(--color-foreground)',
          '--card': 'var(--color-card)',
          '--border': 'var(--color-border)',
        } as React.CSSProperties}
        ref={ref}
        {...props}
      >
        <span>{props.children}</span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button }

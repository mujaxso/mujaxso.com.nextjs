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
          "inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group relative overflow-hidden",
          {
            "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 active:scale-95": 
              variant === "default",
            "border-2 border-border bg-card text-foreground hover:bg-primary/10 hover:border-primary/50 hover:scale-105 active:scale-95":
              variant === "outline",
            "hover:bg-primary/10 text-foreground hover:scale-105 active:scale-95": 
              variant === "ghost",
            "text-primary underline-offset-4 hover:underline": 
              variant === "link",
          },
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
        {/* Animated gradient border effect for default variant */}
        {variant === "default" && (
          <>
            <div 
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm group-hover:blur-md scale-95 group-hover:scale-105"
              style={{
                '--primary': 'var(--color-primary)',
                '--secondary': 'var(--color-secondary)',
                '--accent': 'var(--color-accent)',
              } as React.CSSProperties}
            ></div>
            <div 
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                '--primary': 'var(--color-primary)',
                '--secondary': 'var(--color-secondary)',
              } as React.CSSProperties}
            ></div>
          </>
        )}
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <span className="relative z-10">{props.children}</span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button }

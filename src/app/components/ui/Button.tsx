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
          "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          // Always include rounded-2xl to ensure consistent rendering
          "rounded-2xl",
          {
            "glass border border-white/20 bg-white/10 backdrop-blur-sm text-foreground hover:bg-white/15 hover:border-white/30": 
              variant === "default",
            "glass border border-white/20 bg-white/10 backdrop-blur-sm text-foreground hover:bg-white/15 hover:border-white/30":
              variant === "outline",
            "text-foreground hover:bg-white/10": 
              variant === "ghost",
            "text-primary underline-offset-4 hover:underline": 
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
        ref={ref}
        {...props}
      >
        {props.children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button }

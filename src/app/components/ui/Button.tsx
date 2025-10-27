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
          "inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-transparent text-foreground hover:text-foreground/80": 
              variant === "default",
            "border border-border bg-transparent text-foreground hover:bg-accent":
              variant === "outline",
            "text-foreground hover:bg-accent": 
              variant === "ghost",
            "text-primary underline-offset-4 hover:underline": 
              variant === "link",
          },
          {
            "h-9 px-4 py-2 text-sm rounded-lg": size === "sm",
            "h-10 px-6 py-3 rounded-lg": size === "md",
            "h-11 px-8 py-4 text-lg rounded-lg": size === "lg",
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

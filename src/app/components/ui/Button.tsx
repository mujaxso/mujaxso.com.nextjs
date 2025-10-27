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
          "inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-transparent text-foreground": 
              variant === "default",
            "bg-transparent text-foreground":
              variant === "outline",
            "text-foreground": 
              variant === "ghost",
            "text-primary": 
              variant === "link",
          },
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

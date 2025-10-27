"use client"

import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "../../lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "xs" | "sm" | "md" | "lg"
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
            "bg-primary text-primary-foreground": 
              variant === "default",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground":
              variant === "outline",
            "hover:bg-accent hover:text-accent-foreground": 
              variant === "ghost",
            "text-primary underline-offset-4 hover:underline": 
              variant === "link",
          },
          {
            "h-7 px-3 py-1 text-xs": size === "xs",
            "h-9 px-4 py-2 text-sm": size === "sm",
            "h-10 px-5 py-2.5 text-base": size === "md",
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

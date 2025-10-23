"use client";

import { Sparkles, Star } from "lucide-react";
import { cn } from "../lib/utils";

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  className?: string;
}

export function Hero({ title, subtitle, description, className }: HeroProps) {
  return (
    <div className={cn("text-center mb-16", className)}>
      <div className="inline-flex items-center px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium rounded-full mb-6 animate-fade-in-up">
        <Sparkles className="w-4 h-4 mr-2" />
        {subtitle}
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
        {title}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        {description}
      </p>
    </div>
  );
}

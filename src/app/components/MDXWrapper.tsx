"use client";

// Import highlight.js styles
import 'highlight.js/styles/github-dark.css';

export default function MDXWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-foreground)] min-h-screen transition-colors duration-300">
      <div className="prose prose-lg max-w-none 
                     prose-headings:text-[var(--color-foreground)] 
                     prose-p:text-[var(--color-foreground)]/90
                     prose-strong:text-[var(--color-foreground)]
                     prose-em:text-[var(--color-foreground)]/80
                     prose-a:text-[var(--color-primary)] hover:prose-a:text-[var(--color-primary-hover)]
                     prose-blockquote:text-[var(--color-foreground)]/70
                     prose-ul:text-[var(--color-foreground)]/90
                     prose-ol:text-[var(--color-foreground)]/90
                     prose-li:text-[var(--color-foreground)]/90
                     prose-code:text-[var(--color-foreground)]/90
                     prose-pre:bg-[var(--color-muted)]
                     prose-hr:border-[var(--color-border)]
                     
                     /* Syntax highlighting styles */
                     prose-pre:!bg-zinc-900
                     prose-code:!text-inherit
                     [data-theme='dark'] prose-pre:!bg-zinc-900
                     [data-theme='light'] prose-pre:!bg-zinc-100">
        {children}
      </div>
    </div>
  );
}

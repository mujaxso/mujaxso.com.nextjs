"use client";

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
                     prose-hr:border-[var(--color-border)]">
        {children}
      </div>
    </div>
  );
}

"use client";

export default function MDXWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <div className="prose prose-lg max-w-none dark:prose-invert 
                     prose-headings:text-foreground 
                     prose-p:text-foreground/90
                     prose-strong:text-foreground
                     prose-em:text-foreground/80
                     prose-a:text-primary hover:prose-a:text-primary-dark
                     prose-blockquote:text-foreground/70
                     prose-ul:text-foreground/90
                     prose-ol:text-foreground/90
                     prose-li:text-foreground/90
                     prose-code:text-foreground/90
                     prose-pre:bg-muted
                     prose-hr:border-border">
        {children}
      </div>
    </div>
  );
}

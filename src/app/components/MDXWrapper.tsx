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
                     /* Reset highlight.js styles to match our theme */
                     .hljs {
                       background: transparent !important;
                       padding: 0 !important;
                     }
                     pre {
                       background: rgb(24 24 27) !important; /* zinc-900 */
                       border: 1px solid rgb(63 63 70) !important; /* zinc-700 */
                       border-radius: 0.5rem;
                       padding: 1rem;
                       overflow-x: auto;
                     }
                     code {
                       background: transparent !important;
                       padding: 0 !important;
                       border: none !important;
                     }
                     [data-theme='dark'] pre {
                       background: rgb(24 24 27) !important;
                     }
                     [data-theme='light'] pre {
                       background: rgb(244 244 245) !important; /* zinc-100 */
                       border-color: rgb(228 228 231) !important; /* zinc-200 */
                     }">
        {children}
      </div>
    </div>
  );
}

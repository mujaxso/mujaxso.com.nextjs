"use client";

import { useEffect } from 'react';

export default function SyntaxHighlighting() {
  useEffect(() => {
    // Add custom styles for code blocks that override highlight.js
    const style = document.createElement('style');
    style.textContent = `
      /* Base code block styling */
      .markdown-body pre,
      .prose pre {
        background: var(--color-muted) !important;
        border: 1px solid var(--color-border) !important;
        border-radius: 0.5rem;
        padding: 1rem;
        overflow-x: auto;
        margin: 1rem 0;
        color: var(--color-foreground) !important;
      }
      
      /* Inline code */
      .markdown-body code:not(pre code),
      .prose code:not(pre code) {
        background: var(--color-muted) !important;
        color: var(--color-foreground) !important;
        padding: 0.2em 0.4em !important;
        border-radius: 0.25rem;
        font-size: 0.875em;
        border: 1px solid var(--color-border);
      }
      
      /* Code inside pre blocks */
      .markdown-body pre code,
      .prose pre code {
        background: transparent !important;
        color: inherit !important;
        padding: 0 !important;
        border: none !important;
      }
      
      /* Override highlight.js styles to use theme colors */
      .hljs {
        background: transparent !important;
        color: var(--color-foreground) !important;
      }
      
      /* Syntax token colors that match your theme */
      .hljs-keyword,
      .hljs-selector-tag,
      .hljs-literal,
      .hljs-section,
      .hljs-link {
        color: var(--color-primary) !important;
      }
      
      .hljs-string,
      .hljs-title,
      .hljs-name,
      .hljs-type,
      .hljs-attribute,
      .hljs-symbol,
      .hljs-bullet,
      .hljs-built_in,
      .hljs-addition,
      .hljs-variable,
      .hljs-template-tag,
      .hljs-template-variable {
        color: #10b981 !important; /* emerald-500 */
      }
      
      .hljs-comment,
      .hljs-quote,
      .hljs-deletion,
      .hljs-meta {
        color: var(--color-muted-foreground) !important;
      }
      
      .hljs-keyword,
      .hljs-selector-tag,
      .hljs-literal,
      .hljs-title,
      .hljs-section,
      .hljs-doctag,
      .hljs-type,
      .hljs-name,
      .hljs-strong {
        font-weight: 600;
      }
      
      .hljs-emphasis {
        font-style: italic;
      }
      
      /* Language-specific adjustments */
      .hljs-number {
        color: #f59e0b !important; /* amber-500 */
      }
      
      .hljs-function .hljs-title {
        color: #3b82f6 !important; /* blue-500 */
      }
      
      .hljs-params {
        color: var(--color-foreground) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}

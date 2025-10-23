"use client";

import { useEffect } from 'react';

export default function SyntaxHighlighting() {
  useEffect(() => {
    // Dynamically load highlight.js styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github-dark.min.css';
    document.head.appendChild(link);

    // Add custom styles for code blocks
    const style = document.createElement('style');
    style.textContent = `
      .markdown-body pre,
      .prose pre {
        background: rgb(24 24 27) !important;
        border: 1px solid rgb(63 63 70) !important;
        border-radius: 0.5rem;
        padding: 1rem;
        overflow-x: auto;
        margin: 1rem 0;
      }
      .markdown-body code,
      .prose code {
        background: transparent !important;
        padding: 0 !important;
        border: none !important;
      }
      .markdown-body .hljs,
      .prose .hljs {
        background: transparent !important;
        padding: 0 !important;
      }
      [data-theme='light'] .markdown-body pre,
      [data-theme='light'] .prose pre {
        background: rgb(244 244 245) !important;
        border-color: rgb(228 228 231) !important;
      }
      [data-theme='light'] .hljs {
        background: transparent !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  return null;
}

"use client";

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';
import { useState, useEffect } from 'react';
import SyntaxHighlighting from './SyntaxHighlighting';

interface ClientMDXRendererProps {
  content: string;
}

export default function ClientMDXRenderer({ content }: ClientMDXRendererProps) {
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function compileMdx() {
      try {
        // Preprocess content to fix self-closing tags
        const processedContent = content
          .replace(/<img\s+([^>]*[^/])>/g, '<img $1 />')
          .replace(/<br\s*>/g, '<br />')
          .replace(/<hr\s*>/g, '<hr />')
          .replace(/<input\s+([^>]*[^/])>/g, '<input $1 />')
          .replace(/<meta\s+([^>]*[^/])>/g, '<meta $1 />')
          .replace(/<link\s+([^>]*[^/])>/g, '<link $1 />')
          .replace(/<col\s+([^>]*[^/])>/g, '<col $1 />')
          .replace(/<area\s+([^>]*[^/])>/g, '<area $1 />')
          .replace(/<base\s+([^>]*[^/])>/g, '<base $1 />')
          .replace(/<embed\s+([^>]*[^/])>/g, '<embed $1 />')
          .replace(/<param\s+([^>]*[^/])>/g, '<param $1 />')
          .replace(/<source\s+([^>]*[^/])>/g, '<source $1 />')
          .replace(/<track\s+([^>]*[^/])>/g, '<track $1 />')
          .replace(/<wbr\s*>/g, '<wbr />');

        const serialized = await serialize(processedContent, {
          mdxOptions: {
            rehypePlugins: [rehypeHighlight],
          },
          scope: { style: {} }
        });
        setMdxSource(serialized);
      } catch (err) {
        console.error('Error compiling MDX:', err);
        setError('Failed to load content');
      }
    }

    compileMdx();
  }, [content]);

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  if (!mdxSource) {
    return (
      <div className="text-center py-8">Loading content...</div>
    );
  }

  return (
    <>
      <SyntaxHighlighting />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose prose-lg sm:prose-xl 
                          prose-headings:font-semibold 
                          prose-headings:tracking-tight
                          prose-h1:text-4xl 
                          prose-h2:text-3xl 
                          prose-h3:text-2xl
                          prose-p:leading-8 
                          prose-p:text-foreground/90
                          prose-strong:font-semibold 
                          prose-strong:text-foreground
                          prose-em:italic 
                          prose-em:text-foreground/90
                          prose-blockquote:border-l-4 
                          prose-blockquote:border-primary/60
                          prose-blockquote:pl-6 
                          prose-blockquote:italic 
                          prose-blockquote:bg-muted/30
                          prose-blockquote:py-2
                          prose-blockquote:rounded-r-lg
                          prose-ul:list-disc 
                          prose-ol:list-decimal 
                          prose-li:my-2 
                          prose-li:leading-7
                          prose-code:bg-muted/50 
                          prose-code:px-1.5 
                          prose-code:py-0.5
                          prose-code:rounded-md 
                          prose-code:font-mono
                          prose-code:text-sm
                          prose-pre:bg-gradient-to-br 
                          prose-pre:from-muted 
                          prose-pre:to-muted/80
                          prose-pre:p-6 
                          prose-pre:rounded-xl 
                          prose-pre:shadow-lg
                          prose-pre:border 
                          prose-pre:border-border/50
                          prose-pre:overflow-x-auto 
                          prose-pre:font-mono
                          prose-table:border 
                          prose-table:border-border 
                          prose-table:rounded-lg
                          prose-table:overflow-hidden
                          prose-th:bg-muted 
                          prose-th:p-4 
                          prose-th:text-left
                          prose-th:font-semibold
                          prose-td:p-4 
                          prose-td:border-t 
                          prose-td:border-border 
                          prose-img:rounded-xl 
                          prose-img:shadow-lg
                          prose-img:mx-auto 
                          prose-img:border
                          prose-img:border-border/50
                          prose-hr:border-border
                          dark:prose-invert 
                          dark:prose-pre:bg-gradient-to-br 
                          dark:prose-pre:from-muted/20 
                          dark:prose-pre:to-muted/30
                          prose-headings:text-foreground 
                          prose-p:text-foreground/90 
                          prose-strong:text-foreground 
                          prose-em:text-foreground/90 
                          prose-a:text-primary 
                          prose-a:font-medium
                          prose-a:no-underline
                          prose-a:border-b 
                          prose-a:border-primary/30
                          hover:prose-a:border-primary 
                          hover:prose-a:text-primary-dark 
                          prose-blockquote:text-foreground/80 
                          prose-ul:text-foreground/90 
                          prose-ol:text-foreground/90 
                          prose-li:text-foreground/90 
                          prose-code:text-foreground 
                          prose-pre:text-foreground 
                          prose-th:text-foreground 
                          prose-td:text-foreground/90
                          prose-figcaption:text-center
                          prose-figcaption:text-sm
                          prose-figcaption:text-foreground/60
                          prose-lead:text-foreground/80
                          transition-all duration-300">
          <MDXRemote 
            {...mdxSource}
            components={{
              style: () => null
            }}
          />
        </article>
      </div>
    </>
  );
}

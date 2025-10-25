"use client";

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';
import { useState, useEffect } from 'react';

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
    <div className="prose prose-lg max-w-none 
                  prose-headings:font-bold 
                  prose-p:leading-relaxed 
                  prose-strong:font-bold 
                  prose-em:italic 
                  prose-blockquote:border-l-4 
                  prose-blockquote:border-primary 
                  prose-blockquote:pl-4 
                  prose-blockquote:italic 
                  prose-ul:list-disc 
                  prose-ol:list-decimal 
                  prose-li:my-1 
                  prose-code:bg-muted 
                  prose-code:px-1 
                  prose-code:rounded 
                  prose-code:font-mono
                  prose-pre:bg-muted 
                  prose-pre:p-4 
                  prose-pre:rounded 
                  prose-pre:overflow-x-auto 
                  prose-pre:font-mono
                  prose-table:border 
                  prose-table:border-border 
                  prose-th:bg-muted 
                  prose-th:p-2 
                  prose-td:p-2 
                  prose-td:border 
                  prose-td:border-border 
                  prose-img:rounded 
                  prose-img:mx-auto 
                  dark:prose-invert 
                  prose-headings:text-card-foreground 
                  prose-p:text-card-foreground 
                  prose-strong:text-card-foreground 
                  prose-em:text-card-foreground 
                  prose-a:text-primary 
                  hover:prose-a:text-primary-dark 
                  prose-blockquote:text-card-foreground/70 
                  prose-ul:text-card-foreground 
                  prose-ol:text-card-foreground 
                  prose-li:text-card-foreground 
                  prose-code:text-card-foreground 
                  prose-pre:text-card-foreground 
                  prose-th:text-card-foreground 
                  prose-td:text-card-foreground">
      <MDXRemote 
        {...mdxSource}
        components={{
          style: () => null
        }}
      />
    </div>
  );
}

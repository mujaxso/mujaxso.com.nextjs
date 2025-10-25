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
    <MDXRemote 
      {...mdxSource}
      components={{
        style: () => null
      }}
    />
  );
}

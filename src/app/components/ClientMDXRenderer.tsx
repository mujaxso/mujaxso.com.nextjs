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
        const serialized = await serialize(content, {
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

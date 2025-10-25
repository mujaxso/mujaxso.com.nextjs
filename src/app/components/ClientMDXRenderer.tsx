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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="elegant-content">
          <MDXRemote 
            {...mdxSource}
            components={{
              style: () => null,
              // Custom components for more control
              h1: ({ children }) => <h1 className="text-4xl font-bold text-foreground mb-8 mt-12 leading-tight tracking-tight border-b border-border/50 pb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-3xl font-semibold text-foreground mb-6 mt-10 leading-tight tracking-tight">{children}</h2>,
              h3: ({ children }) => <h3 className="text-2xl font-semibold text-foreground mb-4 mt-8 leading-snug">{children}</h3>,
              h4: ({ children }) => <h4 className="text-xl font-medium text-foreground mb-3 mt-6 leading-snug">{children}</h4>,
              p: ({ children }) => <p className="text-foreground/90 leading-8 text-lg mb-6 font-light">{children}</p>,
              strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
              em: ({ children }) => <em className="italic text-foreground/90">{children}</em>,
              blockquote: ({ children }) => <blockquote className="border-l-4 border-primary/60 bg-muted/20 pl-6 py-4 my-8 italic text-foreground/80 text-lg leading-8 rounded-r-lg">{children}</blockquote>,
              ul: ({ children }) => <ul className="list-disc list-inside space-y-3 mb-6 text-foreground/90 text-lg leading-7">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside space-y-3 mb-6 text-foreground/90 text-lg leading-7">{children}</ol>,
              li: ({ children }) => <li className="pl-2">{children}</li>,
              code: ({ children, className }) => {
                const isInline = !className;
                if (isInline) {
                  return <code className="bg-muted/50 px-2 py-1 rounded-md text-foreground font-mono text-sm border border-border/50">{children}</code>;
                }
                return <code className={className}>{children}</code>;
              },
              pre: ({ children }) => <pre className="bg-muted/30 p-6 rounded-xl border border-border/50 overflow-x-auto my-8 font-mono text-sm leading-6 shadow-sm">{children}</pre>,
              table: ({ children }) => <div className="overflow-x-auto my-8"><table className="min-w-full border-collapse border border-border rounded-lg">{children}</table></div>,
              th: ({ children }) => <th className="bg-muted/50 p-4 text-left font-semibold text-foreground border border-border">{children}</th>,
              td: ({ children }) => <td className="p-4 border border-border text-foreground/90">{children}</td>,
              a: ({ children, href }) => <a href={href} className="text-primary font-medium no-underline border-b border-primary/30 hover:border-primary transition-colors duration-200">{children}</a>,
              img: ({ src, alt }) => <img src={src} alt={alt} className="rounded-2xl shadow-lg my-8 mx-auto border border-border/50 max-w-full" />,
              hr: () => <hr className="my-12 border-border/50" />
            }}
          />
        </article>
      </div>
      <style jsx>{`
        .elegant-content {
          color: var(--color-foreground);
        }
        .elegant-content :global(p) {
          line-height: 1.8;
        }
        .elegant-content :global(blockquote) {
          border-left: 4px solid rgba(var(--color-primary), 0.6);
          background: rgba(var(--color-muted), 0.2);
          padding-left: 1.5rem;
          padding-top: 1rem;
          padding-bottom: 1rem;
          margin: 2rem 0;
          font-style: italic;
          color: rgba(var(--color-foreground), 0.8);
          font-size: 1.125rem;
          line-height: 1.75;
          border-radius: 0 0.5rem 0.5rem 0;
        }
      `}</style>
    </>
  );
}

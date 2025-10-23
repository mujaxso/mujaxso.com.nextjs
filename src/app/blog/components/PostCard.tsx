"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../lib/utils';

interface PostCardProps {
  post: BlogPost;
  onCategoryClick?: (category: string) => void;
  onTagClick?: (tag: string) => void;
}

export function PostCard({ post, onCategoryClick, onTagClick }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 h-full flex flex-col">
        {post.image && (
          <div className="relative w-full">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image 
                src={post.image} 
                alt={`${post.title} cover`} 
                width={600}
                height={400}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        )}
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          {/* Category and Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.category && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCategoryClick?.(post.category!);
                }}
                className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                {post.category}
              </button>
            )}
            {post.tags?.slice(0, 2).map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onTagClick?.(tag);
                }}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
          
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground mb-4 text-sm line-clamp-3 flex-1">
            {post.description}
          </p>
          
          <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mt-auto pt-3 sm:pt-4 border-t border-border">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

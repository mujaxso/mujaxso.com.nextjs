"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../lib/utils';

interface FeaturedPostCardProps {
  post: BlogPost;
  onCategoryClick?: (category: string) => void;
}

export function FeaturedPostCard({ post, onCategoryClick }: FeaturedPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="group relative rounded-2xl overflow-hidden backdrop-blur-xl bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image 
            src={post.image || '/vercel.svg'} 
            alt={`${post.title} cover`} 
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            {post.category && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCategoryClick?.(post.category!);
                }}
                className="inline-block px-3 py-1 bg-primary text-white text-xs font-medium rounded-full mb-3 hover:bg-primary-dark transition-colors"
              >
                {post.category}
              </button>
            )}
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
              {post.title}
            </h3>
            <div className="flex items-center text-white/80 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="mr-3">{new Date(post.date).toLocaleDateString()}</span>
              <Clock className="w-4 h-4 mr-1" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

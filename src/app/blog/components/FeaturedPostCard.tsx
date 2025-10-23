"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Star, ArrowRight } from 'lucide-react';
import { BlogPost } from '../lib/utils';

interface FeaturedPostCardProps {
  post: BlogPost;
  onCategoryClick?: (category: string) => void;
}

export function FeaturedPostCard({ post, onCategoryClick }: FeaturedPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="group relative rounded-2xl overflow-hidden backdrop-blur-xl bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer h-full flex flex-col">
        {/* Image Container with Enhanced Effects */}
        <div className="relative w-full overflow-hidden">
          <div className="aspect-[16/9] relative overflow-hidden">
            {post.image ? (
              <Image 
                src={post.image} 
                alt={`${post.title} cover`} 
                width={800}
                height={450}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-primary/60 text-4xl">📝</div>
              </div>
            )}
            {/* Enhanced Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
            
            {/* Shine Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>
          
          {/* Category and Featured Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {post.category && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCategoryClick?.(post.category!);
                }}
                className="inline-flex items-center px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-full hover:bg-primary-dark transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                {post.category}
              </button>
            )}
            {post.featured && (
              <div className="inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                <Star className="w-3 h-3 mr-1 fill-white" />
                Featured
              </div>
            )}
          </div>
          
          {/* Read More Arrow */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="relative p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 flex items-start">
            {post.title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
            {post.description}
          </p>
          
          {/* Meta Information */}
          <div className="flex items-center text-muted-foreground text-sm mb-4">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="mr-3">{new Date(post.date).toLocaleDateString()}</span>
            <Clock className="w-4 h-4 mr-1" />
            <span>{post.readingTime}</span>
          </div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full backdrop-blur-sm transition-colors duration-300 group-hover:bg-primary/20 group-hover:text-primary"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-2 py-1 text-muted-foreground text-xs">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}
          
          {/* Hover Border Effect */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-500 pointer-events-none" />
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </article>
    </Link>
  );
}

"use client";

import Image from "next/image";
import { Github, Twitter, Linkedin, Globe } from "lucide-react";

interface AuthorProps {
  name: string;
  image: string;
  bio: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export default function Author({ name, image, bio, socialLinks }: AuthorProps) {
  // Use a fallback image if the provided image is empty
  const imageSrc = image && image.trim() !== '' ? image : null;
  
  return (
    <div className="flex items-start gap-4 p-6 backdrop-blur-xl bg-card border border-border rounded-2xl">
      <div className="flex-shrink-0">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            width={64}
            height={64}
            className="rounded-full border-2 border-primary/20"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center border-2 border-primary/20">
            <span className="text-white font-bold text-lg">
              {name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-card-foreground mb-2">About the Author</h3>
        <h4 className="text-xl font-bold text-card-foreground mb-2">{name}</h4>
        <p className="text-muted-foreground text-sm mb-3">{bio}</p>
        {socialLinks && (
          <div className="flex gap-3">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-card-foreground transition-colors backdrop-blur-sm bg-muted border border-border rounded-lg hover:scale-110"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-card-foreground transition-colors backdrop-blur-sm bg-muted border border-border rounded-lg hover:scale-110"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-card-foreground transition-colors backdrop-blur-sm bg-muted border border-border rounded-lg hover:scale-110"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {socialLinks.website && (
              <a
                href={socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-card-foreground transition-colors backdrop-blur-sm bg-muted border border-border rounded-lg hover:scale-110"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

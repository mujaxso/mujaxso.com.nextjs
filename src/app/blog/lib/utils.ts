export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  category?: string;
  tags?: string[];
  readingTime?: string;
  featured?: boolean;
}

export function filterPosts(
  posts: BlogPost[], 
  searchQuery: string, 
  selectedCategory: string | null,
  selectedTag: string | null
): BlogPost[] {
  let filtered = posts;
  
  if (selectedTag) {
    filtered = filtered.filter(post => post.tags?.includes(selectedTag));
  }
  
  if (selectedCategory && !selectedTag) {
    filtered = filtered.filter(post => post.category === selectedCategory);
  }
  
  if (searchQuery && !selectedTag) {
    filtered = filtered.filter(post => 
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return filtered;
}

export function extractCategories(posts: BlogPost[]): string[] {
  return [...new Set(posts.map(post => post.category).filter(Boolean))] as string[];
}

export function extractTags(posts: BlogPost[]): string[] {
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
}

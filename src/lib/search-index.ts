import { BlogPost } from '../app/blog/page';
import { Project } from '../app/projects/page';

// This would be populated at build time
// For now, we'll export an empty array
export const searchIndex: Array<{
  title: string;
  description: string;
  href: string;
  type: 'blog' | 'project' | 'page';
}> = [];

// This file is no longer needed for the search functionality
// The search now dynamically fetches data from API endpoints
export const searchIndex: Array<{
  title: string;
  description: string;
  href: string;
  type: 'blog' | 'project' | 'page';
}> = [];

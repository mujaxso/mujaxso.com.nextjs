import { promises as fs } from 'fs';
import { join } from 'path';

export async function getMDXComponent(slug: string, type: 'blog' | 'projects') {
  const contentDirectory = join(process.cwd(), 'src', 'content', type);
  const fullPath = join(contentDirectory, `${slug}.mdx`);
  
  try {
    // Read the file
    const fileContents = await fs.readFile(fullPath, 'utf8');
    return fileContents;
  } catch (error) {
    return null;
  }
}

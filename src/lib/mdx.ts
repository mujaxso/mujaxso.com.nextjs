import { promises as fs } from 'fs';
import { join } from 'path';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import rehypeStringify from 'rehype-stringify';

const processMDX = async (content: string) => {
  const processedContent = await remark()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeReact, { createElement: React.createElement })
    .process(content);
  
  return processedContent;
};

export async function getProjectMDX(slug: string) {
  const projectsDirectory = join(process.cwd(), 'src', 'content', 'projects');
  const fullPath = join(projectsDirectory, `${slug}.mdx`);
  
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const content = await processMDX(fileContents);
    return { content };
  } catch (error) {
    console.error(`Failed to read MDX file at ${fullPath}:`, error);
    return { content: null };
  }
}

export async function readContentFile<T>(
  directory: string,
  slug: string,
  parser: (fileContent: string, slug: string) => T
): Promise<T> {
  const { promises: fs } = await import('fs');
  const { join } = await import('path');
  
  const fullPath = join(process.cwd(), 'src', 'content', directory, `${slug}.mdx`);
  await fs.access(fullPath);
  const fileContent = await fs.readFile(fullPath, 'utf8');
  return parser(fileContent, slug);
}

import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  tags: string[];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = join(process.cwd(), 'content/blog');
  const posts = await readdir(postsDirectory);
  
  const blogPosts = await Promise.all(
    posts.map(async (folder) => {
      const fullPath = join(postsDirectory, folder, 'index.mdx');
      const fileContents = await readFile(fullPath, 'utf8');
      
      const { data, content } = matter(fileContents);
      
      return {
        slug: folder,
        content,
        ...data,
      } as BlogPost;
    })
  );

  return blogPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const fullPath = join(process.cwd(), 'content/blog', slug, 'index.mdx');
    const fileContents = await readFile(fullPath, 'utf8');
    
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      content,
      title: data.title,
      description: data.description,
      publishedAt: data.publishedAt,
      tags: data.tags,
    } as BlogPost;
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return undefined;
  }
}

// Keep these utilities for future MDX implementation
export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

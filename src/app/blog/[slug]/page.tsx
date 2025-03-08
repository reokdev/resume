import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = await getPost(params.slug);
  if (!post) return;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `${DATA.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>{post.title}</h1>
      <div className="text-sm text-muted-foreground mb-4">
        {post.publishedAt}
      </div>
      <Markdown>{post.content}</Markdown>
    </article>
  );
}

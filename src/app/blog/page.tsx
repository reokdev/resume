import { BlogCard } from "@/components/blog-card";
import { getBlogPosts } from "@/data/blog";
import BlurFade from "@/components/magicui/blur-fade";
import type { BlogPost } from "@/data/blog";

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-3xl font-bold">Blog Posts</h1>
      </BlurFade>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post, index) => (
          <BlurFade key={post.slug} delay={BLUR_FADE_DELAY * 2 + index * 0.05}>
            <BlogCard
              title={post.title}
              description={post.description}
              date={post.publishedAt}
              readTime="5 min"
              href={`/blog/${post.slug}`}
              tags={post.tags}
            />
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

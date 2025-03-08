import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  description: string;
  date?: string;
  readTime?: string;
  href: string;
  tags: string[];
}

export function BlogCard({ title, description, date, readTime, href, tags }: BlogCardProps) {
  return (
    <Link href={href}>
      <NeonGradientCard className="h-48 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              className={cn(
                "items-center rounded-md border font-semibold transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "border-transparent bg-primary text-primary-foreground shadow",
                "hover:bg-primary/80 flex gap-2 px-2 py-1 text-[10px]"
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </NeonGradientCard>
    </Link>
  );
}

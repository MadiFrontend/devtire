import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PostAuthor({
  by,
  role = siteConfig.author.role,
  className,
  size = "md",
}: {
  by?: string;
  role?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const avatar = size === "lg" ? 64 : size === "md" ? 44 : 32;

  return (
    <a
      href={siteConfig.author.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-3 text-start transition-colors",
        className,
      )}
    >
      <Image
        src={siteConfig.author.image}
        alt={siteConfig.author.name}
        width={avatar}
        height={avatar}
        className="rounded-full object-cover ring-2 ring-border/70 transition group-hover:ring-accent/50"
        sizes={`${avatar}px`}
      />
      <span className="min-w-0">
        <span className="flex flex-wrap items-baseline gap-x-1.5">
          {by && <span className="text-sm text-muted-foreground">{by}</span>}
          <span
            className={cn(
              "font-semibold text-foreground transition-colors group-hover:text-accent",
              size === "lg" ? "text-base" : "text-sm",
            )}
          >
            {siteConfig.author.name}
          </span>
        </span>
        <span
          className={cn(
            "block text-muted-foreground",
            size === "lg" ? "text-sm" : "text-xs",
          )}
        >
          {role}
        </span>
      </span>
    </a>
  );
}

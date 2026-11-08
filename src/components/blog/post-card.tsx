import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PostCover } from "@/components/blog/post-cover";
import type { PostMeta } from "@/lib/blog";
import { coverColor, postTheme } from "@/lib/blog-theme";
import { formatPostDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

export function PostCard({
  post,
  featured = false,
  heading: Heading = "h3",
}: {
  post: PostMeta;
  featured?: boolean;
  heading?: "h2" | "h3";
}) {
  const t = useTranslations("blog");
  const locale = useLocale() as Locale;
  const theme = postTheme(post.categories);
  const label = theme.track
    ? t("coverTrack", { track: theme.track.name[locale] })
    : t("coverMixed");

  return (
    <Link
      href={`/blog/${post.slug}` as "/"}
      style={{ "--glow": theme.accent } as CSSProperties}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--glow)_45%,transparent)] hover:shadow-[0_24px_60px_-28px_var(--glow)]",
        featured && "lg:flex-row",
      )}
    >
      <div className={cn("overflow-hidden", featured && "lg:w-[55%] lg:shrink-0")}>
        <PostCover
          theme={theme}
          label={label}
          className="rounded-none transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className={cn("flex flex-1 flex-col p-5 sm:p-6", featured && "lg:justify-center lg:p-10")}>
        <div className="flex flex-wrap gap-1.5">
          {featured && (
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
              {t("latest")}
            </span>
          )}
          {theme.categories.slice(0, featured ? 4 : 3).map((c) => (
            <span
              key={c.id}
              className="rounded-full border border-border/70 px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              <span
                className="me-1.5 inline-block size-1.5 rounded-full align-middle"
                style={{ background: coverColor(c.color) }}
              />
              {c.name[locale]}
            </span>
          ))}
        </div>

        <Heading
          className={cn(
            "mt-4 font-display font-bold leading-snug tracking-tight transition-colors group-hover:text-accent",
            featured ? "text-2xl lg:text-3xl" : "text-lg",
          )}
        >
          {post.title}
        </Heading>
        <p
          className={cn(
            "mt-2 text-sm leading-6 text-muted-foreground",
            featured ? "lg:text-base lg:leading-7" : "line-clamp-2",
          )}
        >
          {post.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-xs text-muted-foreground">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
            <span className="size-1 rounded-full bg-border" />
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {t("readingTime", { minutes: post.readingMinutes })}
            </span>
          </span>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
            <ArrowUpRight className="size-4 rtl:-scale-x-100" />
          </span>
        </div>
      </div>
    </Link>
  );
}

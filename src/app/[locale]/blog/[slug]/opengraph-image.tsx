import { ImageResponse } from "next/og";
import { OgCard, ogSize } from "@/components/brand/og-card";
import { getPost } from "@/lib/blog";
import { coverColor, postTheme } from "@/lib/blog-theme";
import type { Locale } from "@/i18n/routing";

export const alt = "DevTier interview prep article";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  // The OG font has no Persian glyphs, so Persian-only posts fall back to a generic title.
  const post = getPost(slug, "en") ?? getPost(slug, locale as Locale);
  const english = post?.locale === "en";
  const theme = postTheme(post?.categories ?? []);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={theme.track ? `${theme.track.name.en} interview guide` : "Interview guide"}
        title={english ? post.title : "Software engineering interview prep"}
        subtitle={
          english
            ? `Article · ${post.readingMinutes} min read · Junior to Senior`
            : "Article · Junior to Senior"
        }
        chips={theme.categories.slice(0, 4).map((c) => c.name.en)}
        stripe={coverColor(theme.accent)}
        titleSize={60}
      />
    ),
    { ...size },
  );
}

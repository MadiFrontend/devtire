import type { MetadataRoute } from "next";
import { categories, getTrack, tracks } from "@/data";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";
import { getPost, getPostLocales, getPostSlugs } from "@/lib/blog";

const levels = ["junior", "middle", "senior"] as const;

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

export default function sitemap(): MetadataRoute.Sitemap {
  const liveCategories = categories.filter(
    (c) => getTrack(c.track)?.status === "live",
  );

  const entries: Entry[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    ...tracks
      .filter((t) => t.status === "live")
      .map((t) => ({
        path: `/${t.id}`,
        priority: 0.95,
        changeFrequency: "weekly" as const,
      })),
    ...liveCategories.map((c) => ({
      path: `/${c.track}/${c.id}`,
      priority: 0.9,
      changeFrequency: "weekly" as const,
    })),
    ...liveCategories.flatMap((c) =>
      levels.map((level) => ({
        path: `/${c.track}/${c.id}/${level}`,
        priority: 0.8,
        changeFrequency: "weekly" as const,
      })),
    ),
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/feedback", priority: 0.3, changeFrequency: "yearly" },
  ];

  const lastModified = new Date();

  const posts = getPostSlugs().flatMap((slug) => {
    const locales = getPostLocales(slug);
    return locales.map((locale) => {
      const post = getPost(slug, locale)!;
      return {
        url: absoluteUrl(`/${locale}/blog/${slug}`),
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: "monthly" as const,
        priority: 0.75,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, absoluteUrl(`/${l}/blog/${slug}`)]),
          ),
        },
      };
    });
  });

  const pages = entries.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${path}`),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries([
          ...routing.locales.map((l) => [l, absoluteUrl(`/${l}${path}`)]),
          ["x-default", absoluteUrl(`/${routing.defaultLocale}${path}`)],
        ]),
      },
    })),
  );

  return [...pages, ...posts];
}

import type { MetadataRoute } from "next";
import { categories } from "@/data";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";

const levels = ["junior", "middle", "senior"] as const;

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    ...categories.map((c) => ({
      path: `/${c.id}`,
      priority: 0.9,
      changeFrequency: "weekly" as const,
    })),
    ...categories.flatMap((c) =>
      levels.map((level) => ({
        path: `/${c.id}/${level}`,
        priority: 0.8,
        changeFrequency: "weekly" as const,
      })),
    ),
    { path: "/feedback", priority: 0.3, changeFrequency: "yearly" },
  ];

  const lastModified = new Date();

  return entries.flatMap(({ path, priority, changeFrequency }) =>
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
}

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { routing, type Locale } from "@/i18n/routing";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string;
  updated?: string;
  categories: string[];
  tags: string[];
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

function readingMinutes(content: string) {
  const words = content
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function readPost(slug: string, locale: Locale): Post | undefined {
  const file = path.join(BLOG_DIR, slug, `${locale}.md`);
  if (!fs.existsSync(file)) return undefined;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    slug,
    locale,
    title: String(data.title),
    description: String(data.description),
    date: String(data.date),
    updated: data.updated ? String(data.updated) : undefined,
    categories: Array.isArray(data.categories) ? data.categories.map(String) : [],
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: readingMinutes(content),
    content,
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function getPost(slug: string, locale: Locale) {
  return readPost(slug, locale);
}

/** Locales in which a post exists, used for hreflang alternates. */
export function getPostLocales(slug: string): Locale[] {
  return routing.locales.filter((locale) =>
    fs.existsSync(path.join(BLOG_DIR, slug, `${locale}.md`)),
  );
}

export function getPosts(locale: Locale): PostMeta[] {
  return getPostSlugs()
    .map((slug) => readPost(slug, locale))
    .filter((post): post is Post => Boolean(post))
    .sort((a, b) => b.date.localeCompare(a.date));
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import GithubSlugger from "github-slugger";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLevelCounts } from "@/data";
import { CategoryIcon } from "@/components/home/category-icon";
import { Markdown } from "@/components/blog/markdown";
import { PostCover } from "@/components/blog/post-cover";
import { JsonLd } from "@/components/seo/json-ld";
import { getPost, getPostLocales, getPosts, getPostSlugs } from "@/lib/blog";
import { postTheme } from "@/lib/blog-theme";
import { formatPostDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  return getPostSlugs()
    .filter((slug) => getPostLocales(slug).includes(params.locale as Locale))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale as Locale);
  if (!post) return {};
  return pageMetadata({
    locale: locale as Locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.description,
    locales: getPostLocales(slug),
    ogImagePath: `/blog/${slug}`,
    ogImageAlt: post.title,
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated,
      tags: post.tags,
    },
  });
}

function headings(content: string) {
  const slugger = new GithubSlugger();
  const result: { id: string; text: string }[] = [];
  let inCode = false;
  for (const line of content.split("\n")) {
    if (line.trimStart().startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const level = line.match(/^(#{2,6})\s+(.+?)\s*#*$/);
    if (!level) continue;
    const text = level[2].replace(/[`*_]/g, "");
    const id = slugger.slug(text);
    if (level[1].length === 2) result.push({ id, text });
  }
  return result;
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const post = getPost(slug, loc);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const tSeo = await getTranslations("seo");
  const url = absoluteUrl(`/${locale}/blog/${slug}`);
  const toc = headings(post.content);
  const theme = postTheme(post.categories);
  const related = theme.categories;
  const others = getPosts(loc)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: tSeo("home"), item: absoluteUrl(`/${locale}`) },
                { "@type": "ListItem", position: 2, name: t("title"), item: absoluteUrl(`/${locale}/blog`) },
                { "@type": "ListItem", position: 3, name: post.title, item: url },
              ],
            },
            {
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              url,
              mainEntityOfPage: url,
              inLanguage: locale,
              datePublished: post.date,
              dateModified: post.updated ?? post.date,
              keywords: post.tags.join(", "),
              image: absoluteUrl(`/${locale}/blog/${slug}/opengraph-image`),
              author: { "@id": `${absoluteUrl()}/#author` },
              publisher: { "@id": `${absoluteUrl()}/#author` },
              isPartOf: { "@id": `${absoluteUrl()}/#website` },
              about: related.map((c) => ({ "@type": "Thing", name: c.name.en })),
            },
          ],
        }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        {t("back")}
      </Link>

      <PostCover
        theme={theme}
        label={
          theme.track
            ? t("coverTrack", { track: theme.track.name[loc] })
            : t("coverMixed")
        }
      />

      <header className="space-y-4">
        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">{post.description}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            <time dateTime={post.date}>{formatPostDate(post.date, loc)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" />
            {t("readingTime", { minutes: post.readingMinutes })}
          </span>
          <span>
            {t("by")}{" "}
            <a
              href={siteConfig.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-accent"
            >
              {siteConfig.author.name}
            </a>
          </span>
        </div>
      </header>

      {toc.length > 2 && (
        <nav
          aria-label={t("toc")}
          className="rounded-xl border border-border/80 bg-card p-5"
        >
          <p className="mb-3 text-sm font-semibold">{t("toc")}</p>
          <ol className="list-decimal space-y-1.5 ps-5 text-sm">
            {toc.map((h) => (
              <li key={h.id}>
                <a href={`#${h.id}`} className="text-muted-foreground hover:text-foreground">
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <Markdown content={post.content} />

      {related.length > 0 && (
        <section className="space-y-4 border-t border-border/70 pt-8">
          <h2 className="font-display text-xl font-semibold">{t("practice")}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((c) => (
              <Link
                key={c.id}
                href={`/${c.track}/${c.id}` as "/"}
                className="flex items-center gap-3 rounded-xl border border-border/80 bg-card p-4 transition-colors hover:border-accent/50"
              >
                <CategoryIcon name={c.icon} color={c.color} className="h-10 w-10" />
                <span>
                  <span className="block font-medium">{c.name[loc]}</span>
                  <span className="text-xs text-muted-foreground">
                    {t("questionCount", { count: getLevelCounts(c.id).total })}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="space-y-4 border-t border-border/70 pt-8">
          <h2 className="font-display text-xl font-semibold">{t("more")}</h2>
          <ul className="space-y-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}` as "/"}
                  className="font-medium transition-colors hover:text-accent"
                >
                  {p.title}
                </Link>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

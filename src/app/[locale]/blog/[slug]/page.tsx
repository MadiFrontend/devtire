import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import GithubSlugger from "github-slugger";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock, ListTree } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLevelCounts } from "@/data";
import { CategoryIcon } from "@/components/home/category-icon";
import { LogoMark } from "@/components/brand/logo";
import { Markdown } from "@/components/blog/markdown";
import { PostCard } from "@/components/blog/post-card";
import { PostCover } from "@/components/blog/post-cover";
import { ReadingProgress } from "@/components/blog/reading-progress";
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
  const label = theme.track
    ? t("coverTrack", { track: theme.track.name[loc] })
    : t("coverMixed");

  const tocList = (
    <ol className="space-y-1 border-s border-border/70 text-sm">
      {toc.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            className="-ms-px block border-s-2 border-transparent py-1 ps-4 leading-6 text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <article className="space-y-12">
      <ReadingProgress color={theme.accent} />
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

      <header className="relative isolate">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 size-[520px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
          style={{ background: theme.accent }}
        />
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-sm text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" />
            {t("back")}
          </Link>
          <p className="mt-6 text-sm font-semibold" style={{ color: theme.accent }}>
            {label}
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl sm:leading-[1.15]">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{post.description}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <a
              href={siteConfig.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-foreground hover:text-accent"
            >
              <LogoMark className="size-7" />
              <span>
                <span className="text-muted-foreground">{t("by")} </span>
                {siteConfig.author.name}
              </span>
            </a>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" />
              <time dateTime={post.date}>{formatPostDate(post.date, loc)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" />
              {t("readingTime", { minutes: post.readingMinutes })}
            </span>
          </div>
        </div>

        <PostCover
          theme={theme}
          label={label}
          className="mx-auto mt-10 max-w-5xl rounded-3xl shadow-2xl shadow-black/10 ring-1 ring-border/60"
        />
      </header>

      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0 space-y-12">
          {toc.length > 2 && (
            <details className="group rounded-2xl border border-border/70 bg-card p-5 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                <ListTree className="size-4 text-accent" />
                {t("toc")}
              </summary>
              <div className="mt-4">{tocList}</div>
            </details>
          )}

          <Markdown content={post.content} />

          {related.length > 0 && (
            <section className="rounded-3xl border border-border/70 bg-card p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold">{t("practice")}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {related.map((c) => (
                  <Link
                    key={c.id}
                    href={`/${c.track}/${c.id}` as "/"}
                    className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-background/60 p-4 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
                  >
                    <CategoryIcon name={c.icon} color={c.color} className="h-11 w-11" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{c.name[loc]}</span>
                      <span className="text-xs text-muted-foreground">
                        {t("questionCount", { count: getLevelCounts(c.id).total })}
                      </span>
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-accent rtl:-scale-x-100" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {toc.length > 2 && (
          <aside className="hidden lg:block">
            <nav aria-label={t("toc")} className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <ListTree className="size-4 text-accent" />
                {t("toc")}
              </p>
              {tocList}
            </nav>
          </aside>
        )}
      </div>

      {others.length > 0 && (
        <section className="mx-auto max-w-5xl border-t border-border/70 pt-12">
          <h2 className="mb-6 font-display text-2xl font-bold">{t("more")}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

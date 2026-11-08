import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { PostCover } from "@/components/blog/post-cover";
import { getPosts } from "@/lib/blog";
import { postTheme } from "@/lib/blog-theme";
import { formatPostDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/blog",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("blog");
  const tSeo = await getTranslations("seo");
  const posts = getPosts(loc);
  const coverLabel = (categories: string[]) => {
    const { track } = postTheme(categories);
    return track ? t("coverTrack", { track: track.name[loc] }) : t("coverMixed");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: tSeo("home"), item: absoluteUrl(`/${locale}`) },
                { "@type": "ListItem", position: 2, name: t("title"), item: absoluteUrl(`/${locale}/blog`) },
              ],
            },
            {
              "@type": "Blog",
              name: t("metaTitle"),
              description: t("metaDescription"),
              url: absoluteUrl(`/${locale}/blog`),
              inLanguage: locale,
              isPartOf: { "@id": `${absoluteUrl()}/#website` },
              blogPost: posts.map((p) => ({
                "@type": "BlogPosting",
                headline: p.title,
                url: absoluteUrl(`/${locale}/blog/${p.slug}`),
                datePublished: p.date,
              })),
            },
          ],
        }}
      />

      <header className="space-y-3">
        <h1 className="font-display text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">{t("empty")}</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}` as "/"}
                className="group block overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm transition-colors hover:border-accent/50"
              >
                <PostCover
                  theme={postTheme(post.categories)}
                  label={coverLabel(post.categories)}
                  className="rounded-none"
                />
                <div className="p-6">
                  <h2 className="flex items-start justify-between gap-3 font-display text-xl font-semibold leading-snug">
                    {post.title}
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent rtl:-scale-x-100" />
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{post.description}</p>
                  <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <time dateTime={post.date}>{formatPostDate(post.date, loc)}</time>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {t("readingTime", { minutes: post.readingMinutes })}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

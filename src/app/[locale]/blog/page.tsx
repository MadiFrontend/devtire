import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookOpen } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { PostCard } from "@/components/blog/post-card";
import { getPosts } from "@/lib/blog";
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
  const [featured, ...rest] = posts;

  return (
    <div className="space-y-12">
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

      <header className="relative isolate overflow-hidden rounded-3xl border border-border/60 bg-card px-6 py-12 text-center sm:py-16">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[480px] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px]" />
        <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          <BookOpen className="size-3.5" />
          {t("eyebrow")}
        </p>
        <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="text-gradient">{t("title")}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-muted-foreground sm:text-lg">
          {t("subtitle")}
        </p>
      </header>

      {!featured ? (
        <p className="text-center text-muted-foreground">{t("empty")}</p>
      ) : (
        <>
          <PostCard post={featured} featured heading="h2" />
          {rest.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} heading="h2" />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

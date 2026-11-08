import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { categories, getCategoryInTrack, getLevelCounts, getTrack } from "@/data";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { CategoryIcon } from "@/components/home/category-icon";
import { Badge } from "@/components/ui/badge";
import type { Level } from "@/data/types";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; track: string; category: string }>;
};

const levels: Level[] = ["junior", "middle", "senior"];

export function generateStaticParams() {
  return categories.map((c) => ({ track: c.track, category: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, track: trackId, category: categoryId } = await params;
  const category = getCategoryInTrack(trackId, categoryId);
  if (!category) return {};
  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "seo" });
  const name = category.name[loc];
  return pageMetadata({
    locale: loc,
    path: `/${trackId}/${categoryId}`,
    ogImagePath: `/${trackId}/${categoryId}`,
    title: t("categoryTitle", { name }),
    description: t("categoryDescription", {
      name,
      count: getLevelCounts(categoryId).total,
    }),
  });
}

export default async function CategoryPage({ params }: Props) {
  const { locale, track: trackId, category: categoryId } = await params;
  setRequestLocale(locale);
  const category = getCategoryInTrack(trackId, categoryId);
  const track = getTrack(trackId);
  if (!category || !track) notFound();

  const t = await getTranslations("levels");
  const tSeo = await getTranslations("seo");
  const counts = getLevelCounts(categoryId);
  const loc = locale as Locale;

  const meta = {
    junior: { desc: t("juniorDesc"), label: t("junior"), variant: "junior" as const },
    middle: { desc: t("middleDesc"), label: t("middle"), variant: "middle" as const },
    senior: { desc: t("seniorDesc"), label: t("senior"), variant: "senior" as const },
  };

  return (
    <div className="space-y-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: tSeo("home"),
                  item: absoluteUrl(`/${locale}`),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: track.name[loc],
                  item: absoluteUrl(`/${locale}/${trackId}`),
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: category.name[loc],
                  item: absoluteUrl(`/${locale}/${trackId}/${categoryId}`),
                },
              ],
            },
            {
              "@type": "LearningResource",
              name: tSeo("categoryTitle", { name: category.name[loc] }),
              description: category.description[loc],
              url: absoluteUrl(`/${locale}/${trackId}/${categoryId}`),
              inLanguage: locale,
              learningResourceType: "Practice quiz",
              educationalLevel: levels.map((level) => meta[level].label),
              teaches: category.name.en,
              keywords: category.tags.join(", "),
              isAccessibleForFree: true,
              isPartOf: { "@id": `${absoluteUrl()}/#website` },
              hasPart: levels.map((level) => ({
                "@type": "Quiz",
                name: `${category.name[loc]} · ${meta[level].label}`,
                url: absoluteUrl(`/${locale}/${trackId}/${categoryId}/${level}`),
                educationalLevel: level,
              })),
            },
          ],
        }}
      />
      <Link
        href={`/${trackId}` as "/"}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        {t("back")}
      </Link>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <CategoryIcon name={category.icon} color={category.color} className="h-14 w-14" />
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            {category.name[loc]}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {category.description[loc]}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {category.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="font-mono text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">{t("title")}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {levels.map((level) => (
            <Link
              key={level}
              href={`/${trackId}/${categoryId}/${level}` as "/"}
              className="rounded-xl border border-border/80 bg-card p-6 shadow-sm transition-colors duration-150 hover:border-accent/50"
            >
              <Badge variant={meta[level].variant}>{meta[level].label}</Badge>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {meta[level].desc}
              </p>
              <p className="mt-6 text-sm font-medium text-accent">
                {t("count", { count: counts[level] })}
                <span className="ms-1 inline-block rtl:-scale-x-100">
                  →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

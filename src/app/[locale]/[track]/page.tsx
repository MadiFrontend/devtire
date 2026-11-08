import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCategoryStats, getTrack, tracks } from "@/data";
import { CategoryCard } from "@/components/home/category-card";
import { CategoryIcon } from "@/components/home/category-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; track: string }>;
};

export function generateStaticParams() {
  return tracks.map((t) => ({ track: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, track: trackId } = await params;
  const track = getTrack(trackId);
  if (!track) return {};
  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "seo" });
  const name = track.name[loc];

  if (track.status === "soon") {
    return pageMetadata({
      locale: loc,
      path: `/${trackId}`,
      title: t("trackTitle", { name }),
      description: t("soonDescription", { name }),
      noIndex: true,
    });
  }

  const stats = getCategoryStats(trackId);
  return pageMetadata({
    locale: loc,
    path: `/${trackId}`,
    ogImagePath: `/${trackId}`,
    title: t("trackTitle", { name }),
    description: t("trackDescription", {
      name,
      count: stats.reduce((sum, c) => sum + c.counts.total, 0),
      topics: stats.length,
    }),
  });
}

export default async function TrackPage({ params }: Props) {
  const { locale, track: trackId } = await params;
  setRequestLocale(locale);
  const track = getTrack(trackId);
  if (!track) notFound();

  const t = await getTranslations("tracks");
  const tSeo = await getTranslations("seo");
  const loc = locale as Locale;
  const stats = track.status === "live" ? getCategoryStats(trackId) : [];

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
              ],
            },
            ...(stats.length
              ? [
                  {
                    "@type": "CollectionPage",
                    name: tSeo("trackTitle", { name: track.name[loc] }),
                    description: track.description[loc],
                    url: absoluteUrl(`/${locale}/${trackId}`),
                    inLanguage: locale,
                    isPartOf: { "@id": `${absoluteUrl()}/#website` },
                    mainEntity: {
                      "@type": "ItemList",
                      itemListElement: stats.map((cat, i) => ({
                        "@type": "ListItem",
                        position: i + 1,
                        name: cat.name[loc],
                        url: absoluteUrl(`/${locale}/${trackId}/${cat.id}`),
                      })),
                    },
                  },
                ]
              : []),
          ],
        }}
      />
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        {t("back")}
      </Link>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <CategoryIcon name={track.icon} color={track.color} className="h-14 w-14" />
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight">
              {track.name[loc]}
            </h1>
            {track.status === "soon" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                {t("comingSoon")}
              </span>
            )}
          </div>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {track.description[loc]}
          </p>
        </div>
      </header>

      {track.status === "live" ? (
        <section>
          <h2 className="mb-5 font-display text-xl font-semibold">{t("categories")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stats.map((cat) => (
              <CategoryCard key={cat.id} category={cat} counts={cat.counts} />
            ))}
          </div>
        </section>
      ) : (
        <section className="relative overflow-hidden rounded-xl border border-dashed border-border bg-card px-6 py-10 sm:px-10">
          <div className="bg-dots pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <h2 className="relative font-display text-2xl font-semibold">{t("soonTitle")}</h2>
          <p className="relative mt-3 max-w-xl leading-7 text-muted-foreground">
            {t("soonText")}
          </p>
          <p className="relative mt-6 text-sm font-medium">{t("soonTopics")}</p>
          <div className="relative mt-3 flex flex-wrap gap-1.5">
            {track.topics.map((topic) => (
              <Badge key={topic} variant="outline" className="font-mono text-[11px]">
                {topic}
              </Badge>
            ))}
          </div>
          <Button asChild className="relative mt-8">
            <Link href="/frontend">{t("goFrontend")}</Link>
          </Button>
        </section>
      )}
    </div>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTrackStats } from "@/data";
import { TrackCard } from "@/components/home/track-card";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const steps = [1, 2, 3] as const;
const faqs = [1, 2, 3, 4, 5] as const;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const stats = getTrackStats();
  const loc = locale as Locale;
  const liveTracks = stats.filter((track) => track.status === "live");
  const questionTotal = liveTracks.reduce((sum, track) => sum + track.questionCount, 0);

  return (
    <div className="space-y-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ItemList",
              name: t("tracks"),
              itemListElement: liveTracks.map((track, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: track.name[loc],
                url: absoluteUrl(`/${locale}/${track.id}`),
              })),
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((n) => ({
                "@type": "Question",
                name: t(`faq${n}q`),
                acceptedAnswer: { "@type": "Answer", text: t(`faq${n}a`) },
              })),
            },
          ],
        }}
      />

      <section className="relative overflow-hidden rounded-xl border border-border/70 bg-card px-6 py-10 sm:px-10 sm:py-14">
        <div className="bg-dots pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <p className="relative inline-flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-xs font-semibold text-accent">
          {t("brand")}
        </p>
        <h1 className="relative mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
          {t("headline")}
        </h1>
        <p className="relative mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          {t("sub")}
        </p>
      </section>

      <section>
        <h2 className="mb-5 font-display text-xl font-semibold">{t("tracks")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              questionCount={track.questionCount}
              categoryCount={track.categoryCount}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold">{t("aboutTitle")}</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            {t("aboutText", { questions: questionTotal, tracks: liveTracks.length })}
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">{t("howTitle")}</h2>
          <ol className="mt-3 space-y-3">
            {steps.map((n) => (
              <li key={n} className="flex gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                  {n}
                </span>
                <div>
                  <h3 className="font-medium">{t(`step${n}Title`)}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {t(`step${n}Text`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">{t("faqTitle")}</h2>
        <div className="divide-y divide-border/70 rounded-xl border border-border/70 bg-card">
          {faqs.map((n) => (
            <details key={n} className="group px-5 py-4">
              <summary className="cursor-pointer font-medium">{t(`faq${n}q`)}</summary>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{t(`faq${n}a`)}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

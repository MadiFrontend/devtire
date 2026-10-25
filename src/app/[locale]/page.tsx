import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTrackStats } from "@/data";
import { TrackCard } from "@/components/home/track-card";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const stats = getTrackStats();

  return (
    <div className="space-y-10">
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
    </div>
  );
}

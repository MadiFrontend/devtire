import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCategoryStats } from "@/data";
import { CategoryCard } from "@/components/home/category-card";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const stats = getCategoryStats();

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/70 px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,color-mix(in_srgb,var(--accent)_8%,transparent))]" />
        <p className="relative font-display text-sm font-semibold tracking-[0.18em] text-accent uppercase">
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
        <h2 className="mb-5 font-display text-xl font-semibold">{t("categories")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stats.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              counts={cat.counts}
              index={i}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

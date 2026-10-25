import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCategory, getLevelCounts } from "@/data";
import { CategoryIcon } from "@/components/home/category-icon";
import { Badge } from "@/components/ui/badge";
import type { Level } from "@/data/types";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

const levels: Level[] = ["junior", "middle", "senior"];

export default async function CategoryPage({ params }: Props) {
  const { locale, category: categoryId } = await params;
  setRequestLocale(locale);
  const category = getCategory(categoryId);
  if (!category) notFound();

  const t = await getTranslations("levels");
  const counts = getLevelCounts(categoryId);
  const loc = locale as Locale;

  const meta = {
    junior: { desc: t("juniorDesc"), label: t("junior"), variant: "junior" as const },
    middle: { desc: t("middleDesc"), label: t("middle"), variant: "middle" as const },
    senior: { desc: t("seniorDesc"), label: t("senior"), variant: "senior" as const },
  };

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
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
              href={`/${categoryId}/${level}` as "/"}
              className="group rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
            >
              <Badge variant={meta[level].variant}>{meta[level].label}</Badge>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {meta[level].desc}
              </p>
              <p className="mt-6 text-sm font-medium text-accent">
                {t("count", { count: counts[level] })}
                <span className="ms-1 inline-block transition group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
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

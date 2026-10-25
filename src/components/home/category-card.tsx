import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { CategoryIcon } from "./category-icon";
import type { CategoryMeta } from "@/data/types";
import type { Locale } from "@/i18n/routing";

type Counts = {
  junior: number;
  middle: number;
  senior: number;
  total: number;
};

export function CategoryCard({
  category,
  counts,
}: {
  category: CategoryMeta;
  counts: Counts;
}) {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;

  return (
    <Link
      href={`/${category.id}` as "/"}
      className="group flex h-full flex-col rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-colors duration-150 hover:border-accent/50"
    >
      <div className="flex items-start justify-between gap-3">
        <CategoryIcon name={category.icon} color={category.color} />
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          {counts.total} {t("questions")}
          <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
        </span>
      </div>

      <h2 className="mt-4 font-display text-xl font-semibold tracking-tight">
        {category.name[locale]}
      </h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
        {category.description[locale]}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {category.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="font-mono text-[11px]">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-border/70 pt-4">
        <Badge variant="junior">Jr {counts.junior}</Badge>
        <Badge variant="middle">Mid {counts.middle}</Badge>
        <Badge variant="senior">Sr {counts.senior}</Badge>
      </div>
    </Link>
  );
}

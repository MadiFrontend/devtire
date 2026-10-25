"use client";

import { motion } from "framer-motion";
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
  index,
}: {
  category: CategoryMeta;
  counts: Counts;
  index: number;
}) {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
    >
      <Link
        href={`/${category.id}` as "/"}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
      >
        <div
          className="pointer-events-none absolute -end-8 -top-8 h-28 w-28 rounded-full opacity-40 blur-2xl transition group-hover:opacity-70"
          style={{ background: category.color }}
        />

        <div className="relative flex items-start justify-between gap-3">
          <CategoryIcon name={category.icon} color={category.color} />
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
            {counts.total} {t("questions")}
            <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
          </span>
        </div>

        <h2 className="relative mt-4 font-display text-xl font-semibold tracking-tight">
          {category.name[locale]}
        </h2>
        <p className="relative mt-2 flex-1 text-sm leading-6 text-muted-foreground">
          {category.description[locale]}
        </p>

        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {category.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="font-mono text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="relative mt-5 flex flex-wrap gap-2 border-t border-border/70 pt-4">
          <Badge variant="junior">Jr {counts.junior}</Badge>
          <Badge variant="middle">Mid {counts.middle}</Badge>
          <Badge variant="senior">Sr {counts.senior}</Badge>
        </div>
      </Link>
    </motion.div>
  );
}

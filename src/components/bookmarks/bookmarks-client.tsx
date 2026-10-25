"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getBookmarks } from "@/lib/storage";
import { getQuestionById, getCategory, practicePath } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";

export function BookmarksClient() {
  const t = useTranslations("bookmarks");
  const locale = useLocale() as Locale;
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(getBookmarks());
  }, []);

  const items = ids
    .map((id) => getQuestionById(id))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold tracking-tight">{t("title")}</h1>

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          {t("empty")}
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((q) => {
            const cat = getCategory(q.category);
            return (
              <li
                key={q.id}
                className="flex flex-col gap-3 rounded-xl border border-border/80 bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <Badge variant={q.level}>{q.level}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {cat?.name[locale]}
                    </span>
                  </div>
                  <p className="font-medium leading-relaxed">{q.question[locale]}</p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={practicePath(q.category, q.level) as "/"}>{t("open")}</Link>
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

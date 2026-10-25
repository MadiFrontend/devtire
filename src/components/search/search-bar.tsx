"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { searchQuestions } from "@/data";
import { getCategory } from "@/data/categories";
import type { Locale } from "@/i18n/routing";

export function SearchBar() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    return searchQuestions(query, locale).slice(0, 8);
  }, [query, locale]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={t("nav.search")}
        className="ps-9 pe-9"
        aria-label={t("nav.search")}
      />
      {query && (
        <button
          type="button"
          className="absolute end-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted"
          onClick={() => {
            setQuery("");
            setOpen(false);
          }}
          aria-label="Clear"
        >
          <X className="size-4" />
        </button>
      )}

      {open && query.trim().length >= 2 && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Close search"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            <div className="border-b border-border px-3 py-2 text-xs font-medium text-muted-foreground">
              {t("search.title")}
            </div>
            {results.length === 0 ? (
              <p className="px-4 py-6 text-sm text-muted-foreground">
                {t("search.empty")}
              </p>
            ) : (
              <ul className="max-h-80 overflow-y-auto py-1">
                {results.map((q) => {
                  const cat = getCategory(q.category);
                  return (
                    <li key={q.id}>
                      <Link
                        href={`/${q.category}/${q.level}` as "/"}
                        onClick={() => {
                          setOpen(false);
                          setQuery("");
                        }}
                        className="block px-4 py-3 transition-colors hover:bg-muted/70"
                      >
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <Badge variant={q.level}>{q.level}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {cat?.name[locale]}
                          </span>
                        </div>
                        <p className="line-clamp-2 text-sm">{q.question[locale]}</p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

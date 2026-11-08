"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { tracks } from "@/data/tracks";
import { categories } from "@/data/categories";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

const liveTracks = tracks.filter((track) => track.status === "live");

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;
  return (
    <footer className="mt-auto border-t border-border/70 py-8">
      <nav
        aria-label={t("explore")}
        className="mx-auto grid max-w-6xl gap-6 px-4 pb-8 text-sm sm:grid-cols-4"
      >
        {liveTracks.map((track) => (
          <div key={track.id}>
            <Link
              href={`/${track.id}` as "/"}
              className="font-medium text-foreground transition-colors hover:text-accent"
            >
              {track.name[locale]}
            </Link>
            <ul className="mt-2 space-y-1.5">
              {categories
                .filter((category) => category.track === track.id)
                .map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/${track.id}/${category.id}` as "/"}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {category.name[locale]}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
        <div>
          <Link
            href="/blog"
            className="font-medium text-foreground transition-colors hover:text-accent"
          >
            {tNav("blog")}
          </Link>
        </div>
      </nav>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 border-t border-border/50 px-4 pt-6 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>{t("text")}</p>
        <p className="inline-flex items-center gap-1.5">
          {t("madeBy")}
          <a
            href={siteConfig.author.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-foreground underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent"
          >
            <Globe className="size-4 text-accent" aria-hidden />
            {siteConfig.author.name}
          </a>
        </p>
      </div>
    </footer>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const t = useTranslations("footer");
  return (
    <footer className="mt-auto border-t border-border/70 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between">
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

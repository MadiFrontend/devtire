"use client";

import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");
  return (
    <footer className="mt-auto border-t border-border/70 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>{t("text")}</p>
        <p>
          {t("madeBy")}{" "}
          <a
            href="https://github.com/MadiFrontend"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent"
          >
            Mahdi Hosseini
          </a>
        </p>
      </div>
    </footer>
  );
}

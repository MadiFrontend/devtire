"use client";

import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");
  return (
    <footer className="mt-auto border-t border-border/70 py-8">
      <p className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
        {t("text")}
      </p>
    </footer>
  );
}

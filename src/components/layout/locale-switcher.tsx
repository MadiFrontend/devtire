"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const next = locale === "fa" ? "en" : "fa";

  return (
    <Button
      variant="outline"
      size="sm"
      className="min-w-12 font-semibold"
      onClick={() => router.replace(pathname, { locale: next })}
      aria-label="Switch language"
    >
      {next.toUpperCase()}
    </Button>
  );
}

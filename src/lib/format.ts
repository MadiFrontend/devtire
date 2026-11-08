import type { Locale } from "@/i18n/routing";

export function formatPostDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(date));
}

import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "./site";

const ogLocales: Record<Locale, string> = {
  en: "en_US",
  fa: "fa_IR",
};

type PageMetadataInput = {
  locale: Locale;
  /** Path after the locale prefix, e.g. "" or "/frontend/react/junior". */
  path: string;
  title?: string;
  description: string;
  noIndex?: boolean;
  /** Path of the segment whose opengraph-image route to use; defaults to the locale root. */
  ogImagePath?: string;
  ogImageAlt?: string;
  /** Locales the page exists in; defaults to all. */
  locales?: readonly Locale[];
  article?: { publishedTime: string; modifiedTime?: string; tags?: string[] };
};

export function languageAlternates(
  path: string,
  locales: readonly Locale[] = routing.locales,
) {
  const languages: Record<string, string> = {};
  for (const locale of locales) languages[locale] = `/${locale}${path}`;
  const fallback = locales.includes(routing.defaultLocale)
    ? routing.defaultLocale
    : locales[0];
  languages["x-default"] = `/${fallback}${path}`;
  return languages;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  noIndex,
  ogImagePath,
  ogImageAlt,
  locales = routing.locales,
  article,
}: PageMetadataInput): Metadata {
  const url = `/${locale}${path}`;
  const socialTitle = title ? `${title} | ${siteConfig.name}` : undefined;
  const image = {
    url: `/${locale}${ogImagePath ?? ""}/opengraph-image`,
    width: 1200,
    height: 630,
    alt:
      ogImageAlt ??
      `${siteConfig.name}: software engineering interview questions from Junior to Senior`,
  };

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path, locales),
    },
    openGraph: {
      ...(article
        ? {
            type: "article",
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime ?? article.publishedTime,
            authors: [siteConfig.author.url],
            tags: article.tags,
          }
        : { type: "website" }),
      siteName: siteConfig.name,
      url,
      description,
      locale: ogLocales[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocales[l]),
      images: [image],
      ...(socialTitle ? { title: socialTitle } : {}),
    },
    twitter: {
      card: "summary_large_image",
      description,
      images: [image.url],
      ...(socialTitle ? { title: socialTitle } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "./site";

const ogLocales: Record<Locale, string> = {
  en: "en_US",
  fa: "fa_IR",
};

type PageMetadataInput = {
  locale: Locale;
  /** Path after the locale prefix, e.g. "" or "/react/junior". */
  path: string;
  title?: string;
  description: string;
  noIndex?: boolean;
  /** Path of the segment whose opengraph-image route to use; defaults to the locale root. */
  ogImagePath?: string;
};

export function languageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) languages[locale] = `/${locale}${path}`;
  languages["x-default"] = `/${routing.defaultLocale}${path}`;
  return languages;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  noIndex,
  ogImagePath,
}: PageMetadataInput): Metadata {
  const url = `/${locale}${path}`;
  const socialTitle = title ? `${title} | ${siteConfig.name}` : undefined;
  const image = {
    url: `/${locale}${ogImagePath ?? ""}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: `${siteConfig.name}: frontend interview questions from Junior to Senior`,
  };

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url,
      description,
      locale: ogLocales[locale],
      alternateLocale: routing.locales
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

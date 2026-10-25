import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookmarksClient } from "@/components/bookmarks/bookmarks-client";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/bookmarks",
    title: t("bookmarksTitle"),
    description: t("bookmarksDescription"),
    noIndex: true,
  });
}

export default async function BookmarksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BookmarksClient />;
}

import { setRequestLocale } from "next-intl/server";
import { BookmarksClient } from "@/components/bookmarks/bookmarks-client";

type Props = { params: Promise<{ locale: string }> };

export default async function BookmarksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BookmarksClient />;
}

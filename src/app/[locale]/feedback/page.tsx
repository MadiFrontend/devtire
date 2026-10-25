import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FeedbackForm } from "@/components/feedback/feedback-form";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/feedback",
    title: t("feedbackTitle"),
    description: t("feedbackDescription"),
  });
}

export default async function FeedbackPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FeedbackForm />;
}

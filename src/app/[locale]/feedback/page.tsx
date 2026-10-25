import { setRequestLocale } from "next-intl/server";
import { FeedbackForm } from "@/components/feedback/feedback-form";

type Props = { params: Promise<{ locale: string }> };

export default async function FeedbackPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FeedbackForm />;
}

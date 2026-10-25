import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCategory, getQuestions } from "@/data";
import { Flashcard } from "@/components/practice/flashcard";
import type { Level } from "@/data/types";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; category: string; level: string }>;
};

const validLevels: Level[] = ["junior", "middle", "senior"];

export default async function PracticePage({ params }: Props) {
  const { locale, category: categoryId, level } = await params;
  setRequestLocale(locale);

  if (!validLevels.includes(level as Level)) notFound();
  const category = getCategory(categoryId);
  if (!category) notFound();

  const questions = getQuestions(categoryId, level as Level);
  const t = await getTranslations("levels");
  const loc = locale as Locale;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/${categoryId}` as "/"}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {category.name[loc]}
        </Link>
        <p className="text-sm text-muted-foreground">
          {t(level as Level)} · {questions.length}
        </p>
      </div>

      <Flashcard
        questions={questions}
        category={categoryId}
        level={level as Level}
      />
    </div>
  );
}

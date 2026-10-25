import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { categories, getCategoryInTrack, getQuestions, getTrack } from "@/data";
import { Flashcard } from "@/components/practice/flashcard";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import type { Level } from "@/data/types";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; track: string; category: string; level: string }>;
};

const validLevels: Level[] = ["junior", "middle", "senior"];

export function generateStaticParams() {
  return categories.flatMap((c) =>
    validLevels.map((level) => ({ track: c.track, category: c.id, level })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, track: trackId, category: categoryId, level } = await params;
  const category = getCategoryInTrack(trackId, categoryId);
  if (!category || !validLevels.includes(level as Level)) return {};
  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "seo" });
  const tLevels = await getTranslations({ locale, namespace: "levels" });
  const name = category.name[loc];
  const levelLabel = tLevels(level as Level);
  const count = getQuestions(categoryId, level as Level).length;
  return pageMetadata({
    locale: loc,
    path: `/${trackId}/${categoryId}/${level}`,
    ogImagePath: `/${trackId}/${categoryId}/${level}`,
    title: t("levelTitle", { name, level: levelLabel, count }),
    description: t("levelDescription", {
      name,
      level: levelLabel,
      count,
      tags: category.tags.join(", "),
    }),
  });
}

export default async function PracticePage({ params }: Props) {
  const { locale, track: trackId, category: categoryId, level } = await params;
  setRequestLocale(locale);

  if (!validLevels.includes(level as Level)) notFound();
  const category = getCategoryInTrack(trackId, categoryId);
  const track = getTrack(trackId);
  if (!category || !track) notFound();

  const questions = getQuestions(categoryId, level as Level);
  const t = await getTranslations("levels");
  const tSeo = await getTranslations("seo");
  const loc = locale as Locale;
  const pageUrl = absoluteUrl(`/${locale}/${trackId}/${categoryId}/${level}`);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: tSeo("home"),
                  item: absoluteUrl(`/${locale}`),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: track.name[loc],
                  item: absoluteUrl(`/${locale}/${trackId}`),
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: category.name[loc],
                  item: absoluteUrl(`/${locale}/${trackId}/${categoryId}`),
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: t(level as Level),
                  item: pageUrl,
                },
              ],
            },
            {
              "@type": "Quiz",
              name: tSeo("levelTitle", {
                name: category.name[loc],
                level: t(level as Level),
                count: questions.length,
              }),
              url: pageUrl,
              inLanguage: locale,
              educationalLevel: level,
              about: { "@type": "Thing", name: category.name.en },
              hasPart: questions.map((q) => {
                const correct = q.options.find((o) => o.id === q.correctOptionId);
                return {
                  "@type": "Question",
                  eduQuestionType: "Multiple choice",
                  learningResourceType: "Practice problem",
                  text: q.question[loc],
                  suggestedAnswer: q.options
                    .filter((o) => o.id !== q.correctOptionId)
                    .map((o) => ({ "@type": "Answer", text: o.text[loc] })),
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: correct?.text[loc],
                    answerExplanation: { "@type": "Comment", text: q.answer[loc] },
                  },
                };
              }),
            },
          ],
        }}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/${trackId}/${categoryId}` as "/"}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {category.name[loc]}
        </Link>
        <h1 className="text-sm font-normal text-muted-foreground">
          {category.name[loc]} · {t(level as Level)} · {questions.length}
        </h1>
      </div>

      <Flashcard
        questions={questions}
        category={categoryId}
        level={level as Level}
      />
    </div>
  );
}

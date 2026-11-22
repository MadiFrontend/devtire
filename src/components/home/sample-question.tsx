import { getTranslations } from "next-intl/server";
import { getCategory, getQuestionById, getTrack, practicePath } from "@/data";
import { SampleQuestionClient, type SampleQuizItem } from "./sample-question-client";
import type { Locale } from "@/i18n/routing";

const SAMPLE_IDS = [
  "js-var-let-const-01",
  "cache-m-read-through",
  "sd-scal-s-hedged-requests",
  "algo-comp-j-big-o-def",
] as const;

function cleanPreviewExplanation(raw: string): string {
  // Strip fenced code blocks so the hero card stays compact and scannable
  const withoutCode = raw.replace(/```[\s\S]*?```/g, "").trim();
  const lines = withoutCode
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return lines.slice(0, 2).join(" ");
}

/** Interactive preview of real interview questions across tracks & levels. */
export async function SampleQuestion({ locale }: { locale: Locale }) {
  const tHome = await getTranslations({ locale, namespace: "home" });
  const tLevels = await getTranslations({ locale, namespace: "levels" });

  const items: SampleQuizItem[] = [];

  for (const id of SAMPLE_IDS) {
    const question = getQuestionById(id);
    if (!question) continue;
    const category = getCategory(question.category);
    if (!category) continue;
    const track = getTrack(category.track);
    if (!track) continue;

    items.push({
      id: question.id,
      trackName: track.name[locale],
      trackColor: track.color,
      categoryName: category.name[locale],
      categoryIcon: category.icon,
      categoryColor: category.color,
      level: question.level,
      levelLabel: tLevels(question.level),
      question: question.question[locale],
      options: question.options.map((opt) => ({
        id: opt.id,
        text: opt.text[locale],
      })),
      correctOptionId: question.correctOptionId,
      explanation: cleanPreviewExplanation(question.answer[locale]),
      practiceHref: practicePath(question.category, question.level),
    });
  }

  if (items.length === 0) return null;

  return (
    <SampleQuestionClient
      items={items}
      locale={locale}
      label={tHome("sampleLabel")}
      tryHint={tHome("sampleTryHint")}
      correctLabel={tHome("sampleCorrect")}
      incorrectLabel={tHome("sampleIncorrect")}
      practiceTopicLabel={tHome("samplePracticeTopic")}
      nextLabel={tHome("sampleNext")}
    />
  );
}

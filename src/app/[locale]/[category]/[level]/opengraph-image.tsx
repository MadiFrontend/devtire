import { ImageResponse } from "next/og";
import { getCategory, getQuestions } from "@/data";
import { OgCard, ogSize } from "@/components/brand/og-card";
import type { Level } from "@/data/types";

export const alt = "DevTier interview questions by level";
export const size = ogSize;
export const contentType = "image/png";

const levelNames: Record<Level, string> = {
  junior: "Junior",
  middle: "Middle",
  senior: "Senior",
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; category: string; level: string }>;
}) {
  const { category: categoryId, level } = await params;
  const category = getCategory(categoryId);
  const name = category?.name.en ?? "Frontend";
  const levelName = levelNames[level as Level] ?? "All levels";
  const count = getQuestions(categoryId, level as Level).length;

  return new ImageResponse(
    (
      <OgCard
        eyebrow={`${levelName} level`}
        title={`${levelName} ${name} Interview Questions`}
        subtitle={`${count} multiple-choice questions. Pick an answer, get instant feedback and read the explanation.`}
        chips={[`${count} questions`, ...(category?.tags ?? [])]}
        stripe={category?.color === "#000000" ? "#e6e9f2" : category?.color}
      />
    ),
    { ...size },
  );
}

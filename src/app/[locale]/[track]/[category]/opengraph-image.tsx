import { ImageResponse } from "next/og";
import { getCategory, getLevelCounts } from "@/data";
import { OgCard, ogSize } from "@/components/brand/og-card";

export const alt = "DevTier interview questions";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; track: string; category: string }>;
}) {
  const { category: categoryId } = await params;
  const category = getCategory(categoryId);
  const name = category?.name.en ?? "Frontend";
  const counts = getLevelCounts(categoryId);

  return new ImageResponse(
    (
      <OgCard
        eyebrow="Interview questions"
        title={`${name} Interview Questions`}
        subtitle={`${counts.total} multiple-choice questions with instant feedback and clear explanations.`}
        chips={[
          `Junior · ${counts.junior}`,
          `Middle · ${counts.middle}`,
          `Senior · ${counts.senior}`,
          ...(category?.tags.slice(0, 2) ?? []),
        ]}
        stripe={category?.color === "#000000" ? "#e6e9f2" : category?.color}
      />
    ),
    { ...size },
  );
}

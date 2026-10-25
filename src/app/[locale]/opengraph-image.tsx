import { ImageResponse } from "next/og";
import { allQuestions, tracks } from "@/data";
import { OgCard, ogSize } from "@/components/brand/og-card";

export const alt = "DevTier: software engineering interview questions from Junior to Senior";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Software engineering interview prep"
        title="Level up for your next interview"
        subtitle={`${allQuestions.length.toLocaleString("en-US")} multiple-choice questions · ${tracks.length} tracks · Junior to Senior`}
        chips={tracks.slice(0, 5).map((t) => t.name.en)}
      />
    ),
    { ...size },
  );
}

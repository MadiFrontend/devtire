import { ImageResponse } from "next/og";
import { allQuestions, categories } from "@/data";
import { OgCard, ogSize } from "@/components/brand/og-card";

export const alt = "DevTier: frontend interview questions from Junior to Senior";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Frontend interview prep"
        title="Ace your next frontend interview"
        subtitle={`${allQuestions.length.toLocaleString("en-US")} multiple-choice questions · ${categories.length} topics · Junior to Senior`}
        chips={["HTML & CSS", "JavaScript", "TypeScript", "React", "Next.js", "System Design"]}
      />
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";
import { getCategoryStats, getTrack } from "@/data";
import { OgCard, ogSize } from "@/components/brand/og-card";

export const alt = "DevTier interview questions by track";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; track: string }>;
}) {
  const { track: trackId } = await params;
  const track = getTrack(trackId);
  const name = track?.name.en ?? "Software Engineering";
  const stats = getCategoryStats(trackId);
  const total = stats.reduce((sum, c) => sum + c.counts.total, 0);
  const live = track?.status === "live";

  return new ImageResponse(
    (
      <OgCard
        eyebrow={live ? "Interview track" : "Coming soon"}
        title={`${name} Interview Questions`}
        subtitle={
          live
            ? `${total.toLocaleString("en-US")} multiple-choice questions across ${stats.length} topics, from Junior to Senior.`
            : `${name} questions are coming soon to DevTier.`
        }
        chips={track?.topics ?? []}
        stripe={track?.color}
      />
    ),
    { ...size },
  );
}

import { getCategory, tracks, type CategoryMeta, type TrackMeta } from "@/data";

const BRAND = "#6366f1";

export type PostTheme = {
  categories: CategoryMeta[];
  /** Set only when every category belongs to the same track. */
  track?: TrackMeta;
  accent: string;
};

/** Category colors tuned for the dark cover background. */
export function coverColor(color: string) {
  return color === "#000000" ? "#e6e9f2" : color;
}

export function postTheme(categoryIds: string[]): PostTheme {
  const categories = categoryIds
    .map((id) => getCategory(id))
    .filter((c) => c !== undefined);
  const trackIds = new Set(categories.map((c) => c.track));
  const track =
    trackIds.size === 1 ? tracks.find((t) => trackIds.has(t.id)) : undefined;
  return { categories, track, accent: track?.color ?? BRAND };
}

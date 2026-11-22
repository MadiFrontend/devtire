import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Clock, Layers } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "./category-icon";
import type { TrackMeta } from "@/data/types";
import type { Locale } from "@/i18n/routing";

type LevelCounts = {
  junior: number;
  middle: number;
  senior: number;
};

export function TrackCard({
  track,
  questionCount,
  categoryCount,
  levels,
}: {
  track: TrackMeta;
  questionCount: number;
  categoryCount: number;
  levels?: LevelCounts;
}) {
  const t = useTranslations("tracks");
  const tHome = useTranslations("home");
  const tLevels = useTranslations("levels");
  const locale = useLocale() as Locale;
  const live = track.status === "live";
  const Arrow = locale === "fa" ? ArrowLeft : ArrowRight;

  if (!live) {
    return (
      <Link
        href={`/${track.id}` as "/"}
        style={{ "--glow": track.color } as CSSProperties}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-border/80 bg-card/60 p-5 transition-all duration-300 hover:border-border hover:bg-card"
      >
        <div>
          <div className="flex items-center justify-between gap-2.5">
            <CategoryIcon
              name={track.icon}
              color={track.color}
              className="size-10 rounded-xl opacity-80 transition-opacity group-hover:opacity-100"
            />
            <span className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-muted/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              <Clock className="size-3" />
              {t("comingSoon")}
            </span>
          </div>

          <h3 className="mt-4 font-display text-base font-bold tracking-tight text-foreground/90">
            {track.name[locale]}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
            {track.description[locale]}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-1">
          {track.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              dir="ltr"
              className="rounded-md bg-muted/70 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {topic}
            </span>
          ))}
        </div>
      </Link>
    );
  }

  const jrPct =
    levels && questionCount > 0 ? Math.round((levels.junior / questionCount) * 100) : 33;
  const midPct =
    levels && questionCount > 0 ? Math.round((levels.middle / questionCount) * 100) : 34;
  const srPct = Math.max(0, 100 - jrPct - midPct);

  return (
    <Link
      href={`/${track.id}` as "/"}
      style={{ "--glow": track.color } as CSSProperties}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-border/75 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--glow)_55%,transparent)] hover:shadow-[0_24px_64px_-24px_color-mix(in_srgb,var(--glow)_45%,transparent)] sm:p-7"
    >
      {/* Top color bar */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 opacity-85 transition-opacity group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${track.color}, color-mix(in srgb, ${track.color} 45%, transparent))`,
        }}
      />

      {/* Ambient corner glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -end-24 -z-10 size-60 rounded-full opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
        style={{ backgroundColor: track.color }}
      />

      <div className="flex items-start justify-between gap-3">
        <div
          className="rounded-2xl border p-0.5"
          style={{
            borderColor: `color-mix(in srgb, ${track.color} 28%, transparent)`,
          }}
        >
          <CategoryIcon name={track.icon} color={track.color} className="size-12 rounded-[14px]" />
        </div>

        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            color: track.color,
            background: `color-mix(in srgb, ${track.color} 14%, transparent)`,
          }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: track.color }}
          />
          {t("questionCount", { count: formatNumber(questionCount, locale) })}
        </span>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-foreground sm:text-2xl">
          {track.name[locale]}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
          {track.description[locale]}
        </p>

        {/* Level distribution bar & badges */}
        {levels && questionCount > 0 && (
          <div className="mt-5 rounded-2xl border border-border/60 bg-muted/35 p-3">
            <div
              aria-hidden
              className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted"
            >
              <span className="bg-emerald-500" style={{ width: `${jrPct}%` }} />
              <span className="bg-sky-500" style={{ width: `${midPct}%` }} />
              <span className="bg-amber-500" style={{ width: `${srPct}%` }} />
            </div>
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-1.5 text-[11px]">
              <span className="inline-flex items-center gap-1 font-medium text-emerald-700 dark:text-emerald-300">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {tLevels("junior")}: {formatNumber(levels.junior, locale)}
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-sky-700 dark:text-sky-300">
                <span className="size-1.5 rounded-full bg-sky-500" />
                {tLevels("middle")}: {formatNumber(levels.middle, locale)}
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-amber-700 dark:text-amber-300">
                <span className="size-1.5 rounded-full bg-amber-500" />
                {tLevels("senior")}: {formatNumber(levels.senior, locale)}
              </span>
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {track.topics.map((topic) => (
            <Badge
              key={topic}
              variant="outline"
              dir="ltr"
              className="border-border/70 bg-background/50 font-mono text-[11px]"
            >
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Layers className="size-3.5" />
          {t("categoryCount", { count: formatNumber(categoryCount, locale) })}
        </span>
        <span
          className="inline-flex items-center gap-1 font-semibold transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
          style={{ color: track.color }}
        >
          {tHome("startTrack")}
          <Arrow className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}

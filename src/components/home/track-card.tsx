import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Lock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "./category-icon";
import type { TrackMeta } from "@/data/types";
import type { Locale } from "@/i18n/routing";

export function TrackCard({
  track,
  questionCount,
  categoryCount,
}: {
  track: TrackMeta;
  questionCount: number;
  categoryCount: number;
}) {
  const t = useTranslations("tracks");
  const locale = useLocale() as Locale;
  const live = track.status === "live";

  return (
    <Link
      href={`/${track.id}` as "/"}
      aria-disabled={!live}
      style={{ "--glow": track.color } as CSSProperties}
      className={cn(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300",
        live
          ? "border-border/70 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--glow)_50%,transparent)] hover:shadow-[0_24px_60px_-28px_var(--glow)]"
          : "border-border/50",
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: live ? track.color : "var(--border)" }}
      />
      {live && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 -end-24 -z-10 size-56 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-40"
          style={{ backgroundColor: track.color }}
        />
      )}

      <div className="flex items-start justify-between gap-3">
        <span className={cn(!live && "opacity-40 grayscale")}>
          <CategoryIcon name={track.icon} color={track.color} />
        </span>
        {live ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
            {t("questionCount", { count: questionCount })}
            <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <Lock className="size-3" />
            {t("comingSoon")}
          </span>
        )}
      </div>

      <div className={cn("flex flex-1 flex-col", !live && "opacity-50")}>
        <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
          {track.name[locale]}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
          {track.description[locale]}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {track.topics.map((topic) => (
            <Badge key={topic} variant="outline" className="font-mono text-[11px]">
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      {live && (
        <p className="mt-5 border-t border-border/70 pt-4 text-xs text-muted-foreground">
          {t("categoryCount", { count: categoryCount })}
        </p>
      )}
    </Link>
  );
}

import { Quote, Star } from "lucide-react";
import { tracks } from "@/data/tracks";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const avatarGradients = [
  "from-indigo-500 to-violet-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-pink-500 to-rose-500",
  "from-sky-500 to-cyan-500",
  "from-fuchsia-500 to-purple-500",
];

function TestimonialCard({
  item,
  index,
  locale,
  featured = false,
  className,
}: {
  item: Testimonial;
  index: number;
  locale: Locale;
  featured?: boolean;
  className?: string;
}) {
  const track = tracks.find((t) => t.id === item.track);

  return (
    <figure
      className={cn(
        "group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6 transition-all duration-300 sm:p-7",
        featured
          ? "bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 text-white shadow-2xl shadow-indigo-500/15 ring-1 ring-white/10"
          : "border border-border/75 bg-card hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5",
        className,
      )}
    >
      <Quote
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-2 end-4 -z-10 size-24 rtl:-scale-x-100",
          featured ? "text-white/[0.07]" : "text-foreground/[0.035]",
        )}
      />
      {featured && (
        <>
          <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-20 [mask-image:radial-gradient(ellipse_at_bottom_right,black,transparent_75%)]" />
          <div className="pointer-events-none absolute -top-24 -end-24 -z-10 size-64 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -start-24 -z-10 size-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
        </>
      )}

      <div>
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, s) => (
              <Star
                key={s}
                className={cn(
                  "size-3.5 fill-current",
                  featured ? "text-amber-300" : "text-amber-400",
                )}
              />
            ))}
          </div>
          {track && (
            <span
              className={cn(
                "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
                featured && "border border-white/15 bg-white/10 text-white/90",
              )}
              style={
                featured
                  ? undefined
                  : {
                      color: track.color,
                      background: `color-mix(in srgb, ${track.color} 13%, transparent)`,
                    }
              }
            >
              {track.name[locale]}
            </span>
          )}
        </div>

        <blockquote
          className={cn(
            featured
              ? "text-lg font-medium leading-8 sm:text-xl sm:leading-9"
              : "text-sm leading-7 text-foreground/85 sm:text-[15px]",
          )}
        >
          {locale === "fa" ? `«${item.quote.fa}»` : `“${item.quote.en}”`}
        </blockquote>
      </div>

      <figcaption
        className={cn(
          "mt-6 flex items-center gap-3 border-t pt-4",
          featured ? "border-white/15" : "border-border/60",
        )}
      >
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white",
            featured
              ? "bg-gradient-to-br from-indigo-400 to-fuchsia-500 ring-2 ring-white/25"
              : cn("bg-gradient-to-br", avatarGradients[index % avatarGradients.length]),
          )}
        >
          {item.name[locale].charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold">
            {item.name[locale]}
          </span>
          <span
            className={cn(
              "block truncate text-xs",
              featured ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {item.role[locale]}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials({ locale }: { locale: Locale }) {
  const items = testimonials.slice(0, 8);
  const [featured, ...rest] = items;
  if (!featured) return null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-5">
      <TestimonialCard
        item={featured}
        index={0}
        locale={locale}
        featured
        className="md:col-span-2 lg:col-span-2"
      />
      {rest.map((item, i) => {
        const isLast = i === rest.length - 1;
        return (
          <TestimonialCard
            key={item.id}
            item={item}
            index={i + 1}
            locale={locale}
            className={isLast ? "md:col-span-2 lg:col-span-1" : undefined}
          />
        );
      })}
    </div>
  );
}

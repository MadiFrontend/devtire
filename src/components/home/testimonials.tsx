import { Quote } from "lucide-react";
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
}: {
  item: Testimonial;
  index: number;
  locale: Locale;
  featured?: boolean;
}) {
  const track = tracks.find((t) => t.id === item.track);

  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-3xl p-7 transition-all duration-300",
        featured
          ? "bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-2xl shadow-violet-500/25"
          : "border border-border/70 bg-card hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5",
      )}
    >
      <Quote
        aria-hidden
        className={cn(
          "absolute -top-2 end-4 -z-10 size-28 rtl:-scale-x-100",
          featured ? "text-white/10" : "text-foreground/[0.04]",
        )}
      />
      {featured && (
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-15 [mask-image:radial-gradient(ellipse_at_bottom,black,transparent_70%)]" />
      )}

      <blockquote
        className={cn(
          featured ? "text-xl leading-9 font-medium sm:text-2xl sm:leading-10" : "text-[15px] leading-7 text-foreground/85",
        )}
      >
        {item.quote[locale]}
      </blockquote>

      <figcaption
        className={cn(
          "mt-7 flex items-center gap-3 border-t pt-5",
          featured ? "border-white/20" : "border-border/60",
        )}
      >
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white",
            featured
              ? "bg-white/20 ring-2 ring-white/40"
              : cn("bg-gradient-to-br", avatarGradients[index % avatarGradients.length]),
          )}
        >
          {item.name[locale].charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">{item.name[locale]}</span>
          <span className={cn("block text-sm", featured ? "text-white/75" : "text-muted-foreground")}>
            {item.role[locale]}
          </span>
        </span>
        {track && (
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
              featured && "bg-white/15 text-white",
            )}
            style={
              featured
                ? undefined
                : {
                    color: track.color,
                    background: `color-mix(in srgb, ${track.color} 14%, transparent)`,
                  }
            }
          >
            {track.name[locale]}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export function Testimonials({ locale }: { locale: Locale }) {
  const [featured, ...rest] = testimonials.slice(0, 7);
  if (!featured) return null;

  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
      <TestimonialCard item={featured} index={0} locale={locale} featured />
      {rest.map((item, i) => (
        <TestimonialCard key={item.id} item={item} index={i + 1} locale={locale} />
      ))}
    </div>
  );
}

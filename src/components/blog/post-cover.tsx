import { LogoMark } from "@/components/brand/logo";
import { getCategoryIcon } from "@/components/home/category-icon";
import { coverColor, type PostTheme } from "@/lib/blog-theme";
import { cn } from "@/lib/utils";

/**
 * Decorative article cover drawn with HTML/CSS so Persian text shapes correctly.
 * Sizes use container query units, so the cover scales with its width.
 */
export function PostCover({
  theme,
  label,
  className,
}: {
  theme: PostTheme;
  label: string;
  className?: string;
}) {
  const tiles = theme.categories.slice(0, 6);
  const columns = Math.min(3, Math.max(1, Math.ceil(tiles.length / 2)));

  return (
    <div
      aria-hidden
      className={cn("relative aspect-[1200/630] overflow-hidden rounded-2xl", className)}
      style={{
        containerType: "inline-size",
        background: "#0b0f19",
        backgroundImage: `radial-gradient(circle at 80% 20%, color-mix(in srgb, ${theme.accent} 30%, transparent), transparent 55%), radial-gradient(rgba(129,140,248,0.16) 1.5px, transparent 1.5px)`,
        backgroundSize: "100% 100%, 22px 22px",
      }}
    >
      <div className="absolute inset-x-0 top-0" style={{ height: "0.8cqw", background: theme.accent }} />

      <div
        className="absolute inset-y-0 start-0 flex w-1/2 flex-col justify-between text-[#e6e9f2]"
        style={{ padding: "6cqw" }}
      >
        <div className="flex items-center" style={{ gap: "1.6cqw" }}>
          <LogoMark className="size-[6cqw]" />
          <span dir="ltr" className="font-semibold tracking-tight" style={{ fontSize: "3.6cqw" }}>
            Dev<span className="text-[#818cf8]">Tier</span>
          </span>
        </div>
        <div className="space-y-[1.5cqw]">
          <div className="rounded-full" style={{ width: "8cqw", height: "0.7cqw", background: theme.accent }} />
          <p className="font-display font-bold leading-tight" style={{ fontSize: "4.6cqw" }}>
            {label}
          </p>
        </div>
      </div>

      <div
        className="absolute end-[6cqw] top-1/2 grid -translate-y-1/2 -rotate-6 rtl:rotate-6"
        style={{ gridTemplateColumns: `repeat(${columns}, 12cqw)`, gap: "2cqw" }}
      >
        {tiles.map((category, i) => {
          const Icon = getCategoryIcon(category.icon);
          const color = coverColor(category.color);
          return (
            <span
              key={category.id}
              className="flex aspect-square items-center justify-center"
              style={{
                borderRadius: "2.6cqw",
                border: `0.25cqw solid color-mix(in srgb, ${color} 45%, transparent)`,
                background: `color-mix(in srgb, ${color} 16%, #0b0f19)`,
                color,
                transform: i % columns === 1 ? "translateY(3cqw)" : undefined,
              }}
            >
              <Icon className="size-[6cqw]" strokeWidth={1.75} />
            </span>
          );
        })}
      </div>
    </div>
  );
}

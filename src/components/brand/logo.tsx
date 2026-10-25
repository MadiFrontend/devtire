import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="devtier-mark" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#4338ca" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#devtier-mark)" />
      <rect x="13" y="38" width="10" height="13" rx="2.5" fill="#fff" fillOpacity="0.55" />
      <rect x="27" y="28" width="10" height="23" rx="2.5" fill="#fff" fillOpacity="0.78" />
      <rect x="41" y="16" width="10" height="35" rx="2.5" fill="#fff" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="size-9" />
      <span className="font-display text-lg font-semibold tracking-tight">
        Dev<span className="text-accent">Tier</span>
      </span>
    </span>
  );
}

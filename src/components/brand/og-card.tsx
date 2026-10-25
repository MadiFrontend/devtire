import { OgMark } from "./og-mark";

export const ogSize = { width: 1200, height: 630 };

type OgCardProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  chips: string[];
  stripe?: string;
};

/** Text stays Latin-only: ImageResponse's bundled font has no Persian glyphs. */
export function OgCard({ eyebrow, title, subtitle, chips, stripe = "#6366f1" }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#0b0f19",
        backgroundImage:
          "radial-gradient(circle at 85% 15%, rgba(99,102,241,0.28), transparent 45%), radial-gradient(rgba(129,140,248,0.16) 1.5px, transparent 1.5px)",
        backgroundSize: "100% 100%, 26px 26px",
        color: "#e6e9f2",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          background: stripe,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <OgMark size={72} />
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>
          <span>Dev</span>
          <span style={{ color: "#818cf8" }}>Tier</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#818cf8",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#9aa3b8", maxWidth: 980 }}>
          {subtitle}
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        {chips.map((chip) => (
          <div
            key={chip}
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              border: "2px solid #263044",
              background: "rgba(18,24,39,0.85)",
              fontSize: 24,
              color: "#c7cce0",
            }}
          >
            {chip}
          </div>
        ))}
      </div>
    </div>
  );
}

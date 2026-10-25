/** Logo mark built from plain divs so it renders inside `next/og` ImageResponse. */
export function OgMark({ size }: { size: number }) {
  const unit = size / 64;
  const bar = (left: number, top: number, height: number, opacity: number) => (
    <div
      style={{
        position: "absolute",
        left: left * unit,
        top: top * unit,
        width: 10 * unit,
        height: height * unit,
        borderRadius: 2.5 * unit,
        background: `rgba(255,255,255,${opacity})`,
      }}
    />
  );

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: size,
        height: size,
        borderRadius: 14 * unit,
        background: "linear-gradient(135deg, #6366f1, #4338ca)",
      }}
    >
      {bar(13, 38, 13, 0.55)}
      {bar(27, 28, 23, 0.78)}
      {bar(41, 16, 35, 1)}
    </div>
  );
}

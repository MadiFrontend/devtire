import {
  Atom,
  Binary,
  Boxes,
  Braces,
  Container,
  FileCode2,
  Layers,
  Layout,
  MessagesSquare,
  Monitor,
  Network,
  Puzzle,
  Server,
  Triangle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  Layout,
  FileCode2,
  Braces,
  Atom,
  Boxes,
  Triangle,
  Puzzle,
  Network,
  Monitor,
  Server,
  Binary,
  Layers,
  Container,
  MessagesSquare,
};

export function CategoryIcon({
  name,
  color,
  className,
}: {
  name: string;
  color: string;
  className?: string;
}) {
  const Icon = icons[name] ?? FileCode2;
  return (
    <span
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-xl",
        className,
      )}
      style={{
        background: `color-mix(in srgb, ${color} 18%, transparent)`,
        color,
      }}
    >
      <Icon className="size-6" strokeWidth={1.75} />
    </span>
  );
}

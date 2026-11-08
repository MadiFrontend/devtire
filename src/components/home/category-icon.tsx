import {
  Atom,
  Binary,
  Blocks,
  Boxes,
  Braces,
  Container,
  Database,
  DatabaseZap,
  FileCode2,
  Gauge,
  Globe,
  Hexagon,
  Landmark,
  Layers,
  Layout,
  Leaf,
  LifeBuoy,
  MessagesSquare,
  Monitor,
  Network,
  Puzzle,
  RadioTower,
  Scale,
  Server,
  ShieldCheck,
  Split,
  Triangle,
  Webhook,
  Workflow,
  Zap,
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
  Hexagon,
  Webhook,
  Database,
  Leaf,
  Zap,
  ShieldCheck,
  Workflow,
  Blocks,
  Gauge,
  Split,
  Globe,
  DatabaseZap,
  Scale,
  LifeBuoy,
  RadioTower,
  Landmark,
};

export function getCategoryIcon(name: string): LucideIcon {
  return icons[name] ?? FileCode2;
}

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

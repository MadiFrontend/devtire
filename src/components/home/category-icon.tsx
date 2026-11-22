import {
  ArrowUpDown,
  Atom,
  Binary,
  Blocks,
  Boxes,
  Braces,
  BrainCircuit,
  Container,
  Database,
  DatabaseZap,
  FileCode2,
  Gauge,
  GitFork,
  Globe,
  Hash,
  Hexagon,
  Landmark,
  Layers,
  Layout,
  Leaf,
  LifeBuoy,
  Link2,
  ListOrdered,
  MessagesSquare,
  Monitor,
  Network,
  Puzzle,
  RadioTower,
  Scale,
  Server,
  Share2,
  ShieldCheck,
  Split,
  Timer,
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
  Timer,
  ListOrdered,
  Hash,
  Link2,
  GitFork,
  Share2,
  ArrowUpDown,
  BrainCircuit,
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
  const resolved = color === "#000000" ? "var(--foreground)" : color;
  return (
    <span
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-xl",
        className,
      )}
      style={{
        background: `color-mix(in srgb, ${resolved} 16%, transparent)`,
        color: resolved,
      }}
    >
      <Icon className="size-6" strokeWidth={1.75} />
    </span>
  );
}

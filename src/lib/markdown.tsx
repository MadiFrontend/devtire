import { cn } from "@/lib/utils";

/** Lightweight markdown-ish renderer for answers (bold, code, lists, tables-as-pre). */
export function RichText({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const blocks = splitBlocks(content);

  return (
    <div
      className={cn(
        "space-y-3 text-[15px] leading-7 text-foreground/90",
        className,
      )}
    >
      {blocks.map((block, i) => {
        if (block.type === "code") {
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded-xl border border-border/70 bg-muted/60 p-4 text-[13px] leading-6 font-mono"
              dir="ltr"
            >
              <code>{block.value}</code>
            </pre>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="list-disc space-y-1 ps-5">
              {block.items.map((item, j) => (
                <li key={j}>{inline(item)}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "ordered") {
          return (
            <ol key={i} className="list-decimal space-y-1 ps-5">
              {block.items.map((item, j) => (
                <li key={j}>{inline(item)}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={i} className="whitespace-pre-wrap">
            {inline(block.value)}
          </p>
        );
      })}
    </div>
  );
}

function inline(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em]"
          dir="ltr"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

type Block =
  | { type: "text"; value: string }
  | { type: "code"; value: string }
  | { type: "list"; items: string[] }
  | { type: "ordered"; items: string[] };

function splitBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  const parts = content.split(/```[\w]*\n?([\s\S]*?)```/g);

  for (let i = 0; i < parts.length; i++) {
    const chunk = parts[i]?.trim();
    if (!chunk) continue;
    if (i % 2 === 1) {
      blocks.push({ type: "code", value: chunk });
      continue;
    }

    const lines = chunk.split("\n");
    let buf: string[] = [];
    let list: string[] | null = null;
    let ordered: string[] | null = null;

    const flushText = () => {
      if (buf.length) {
        blocks.push({ type: "text", value: buf.join("\n").trim() });
        buf = [];
      }
    };
    const flushList = () => {
      if (list?.length) {
        blocks.push({ type: "list", items: list });
        list = null;
      }
      if (ordered?.length) {
        blocks.push({ type: "ordered", items: ordered });
        ordered = null;
      }
    };

    for (const line of lines) {
      const bullet = line.match(/^\s*[-*]\s+(.+)$/);
      const num = line.match(/^\s*\d+\.\s+(.+)$/);
      if (bullet) {
        flushText();
        ordered = null;
        list = list ?? [];
        list.push(bullet[1]);
      } else if (num) {
        flushText();
        list = null;
        ordered = ordered ?? [];
        ordered.push(num[1]);
      } else {
        flushList();
        buf.push(line);
      }
    }
    flushList();
    flushText();
  }

  return blocks;
}

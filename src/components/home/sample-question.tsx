import { CheckCircle2, Sparkles } from "lucide-react";
import { getCategory, getQuestionById } from "@/data";
import { CategoryIcon } from "./category-icon";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const SAMPLE_ID = "js-var-let-const-01";

function inlineCode(text: string) {
  return text.split("`").map((part, i) =>
    i % 2 ? (
      <code key={i} dir="ltr" className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">
        {part}
      </code>
    ) : (
      part
    ),
  );
}

/** Static preview of the quiz UI for the home hero. */
export function SampleQuestion({
  locale,
  label,
  correctLabel,
  levelLabel,
}: {
  locale: Locale;
  label: string;
  correctLabel: string;
  levelLabel: string;
}) {
  const question = getQuestionById(SAMPLE_ID);
  if (!question) return null;
  const category = getCategory(question.category);

  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/30 via-fuchsia-500/20 to-transparent blur-2xl" />
      <div className="animate-float relative rounded-2xl border border-border/70 bg-card/90 p-5 shadow-2xl shadow-accent/10 backdrop-blur sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2.5">
            {category && <CategoryIcon name={category.icon} color={category.color} className="size-9" />}
            <span className="text-sm font-semibold">{category?.name[locale]}</span>
          </span>
          <span className="flex items-center gap-2 text-xs">
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 font-medium text-emerald-600 dark:text-emerald-400">
              {levelLabel}
            </span>
            <span className="hidden text-muted-foreground sm:inline">{label}</span>
          </span>
        </div>

        <p className="mt-5 font-medium leading-7">{inlineCode(question.question[locale])}</p>

        <ul className="mt-4 space-y-2">
          {question.options.map((option) => {
            const correct = option.id === question.correctOptionId;
            return (
              <li
                key={option.id}
                className={cn(
                  "flex items-start gap-3 rounded-xl border px-3.5 py-2.5 text-sm leading-6",
                  correct
                    ? "border-emerald-500/50 bg-emerald-500/10"
                    : "border-border/70 text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-semibold uppercase",
                    correct ? "bg-emerald-500 text-white" : "bg-muted",
                  )}
                >
                  {option.id}
                </span>
                <span className="flex-1">{inlineCode(option.text[locale])}</span>
                {correct && <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />}
              </li>
            );
          })}
        </ul>

        <p className="mt-4 flex items-center gap-2 rounded-xl bg-accent/10 px-3.5 py-2.5 text-sm font-medium text-accent">
          <Sparkles className="size-4 shrink-0" />
          {correctLabel}
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CategoryIcon } from "./category-icon";
import { cn } from "@/lib/utils";
import type { Level } from "@/data/types";
import type { Locale } from "@/i18n/routing";

export type SampleQuizItem = {
  id: string;
  trackName: string;
  trackColor: string;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  level: Level;
  levelLabel: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  practiceHref: string;
};

function renderFormattedText(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          dir="ltr"
          className="rounded-md border border-border/60 bg-muted/80 px-1.5 py-0.5 font-mono text-[0.84em] text-foreground"
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

const levelPillStyles: Record<Level, string> = {
  junior:
    "border-emerald-500/30 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
  middle:
    "border-sky-500/30 bg-sky-500/12 text-sky-700 dark:text-sky-300",
  senior:
    "border-amber-500/30 bg-amber-500/12 text-amber-700 dark:text-amber-300",
};

export function SampleQuestionClient({
  items,
  locale,
  label,
  tryHint,
  correctLabel,
  incorrectLabel,
  practiceTopicLabel,
  nextLabel,
}: {
  items: SampleQuizItem[];
  locale: Locale;
  label: string;
  tryHint: string;
  correctLabel: string;
  incorrectLabel: string;
  practiceTopicLabel: string;
  nextLabel: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const current = items[activeIndex];
  if (!current) return null;

  const selectedOptionId = answers[current.id] ?? null;
  const answered = selectedOptionId !== null;
  const isCorrect = answered && selectedOptionId === current.correctOptionId;
  const Arrow = locale === "fa" ? ArrowLeft : ArrowRight;

  const handleSelect = (optionId: string) => {
    if (answered) return;
    setAnswers((prev) => ({ ...prev, [current.id]: optionId }));
  };

  const handleResetCurrent = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[current.id];
      return next;
    });
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="relative min-w-0">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-[2rem] opacity-60 blur-2xl transition-colors duration-500 sm:-inset-4"
        style={{
          background: `radial-gradient(circle at 50% 30%, color-mix(in srgb, ${current.trackColor} 32%, transparent), transparent 70%)`,
        }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-2xl shadow-foreground/[0.04] backdrop-blur-xl dark:border-white/10 dark:bg-card/90 dark:shadow-black/40">
        {/* Top Interactive Chrome & Track Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 bg-muted/40 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-rose-400/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
            </span>
            <span className="ms-1 text-xs font-medium text-muted-foreground">
              {label}
            </span>
          </div>

          <div
            role="tablist"
            aria-label={label}
            className="flex flex-wrap items-center gap-1"
          >
            {items.map((item, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all",
                    active
                      ? "bg-background text-foreground shadow-sm ring-1 ring-border/80"
                      : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
                  )}
                >
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: item.trackColor }}
                  />
                  <span>{item.trackName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Content */}
        <div key={current.id} className="animate-fade-in p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <CategoryIcon
                name={current.categoryIcon}
                color={current.categoryColor}
                className="size-9 shrink-0 rounded-xl"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {current.categoryName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {current.trackName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {answered && (
                <button
                  type="button"
                  onClick={handleResetCurrent}
                  className="inline-flex cursor-pointer items-center justify-center rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Reset"
                  title="Reset"
                >
                  <RotateCcw className="size-3.5" />
                </button>
              )}
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                  levelPillStyles[current.level],
                )}
              >
                {current.levelLabel}
              </span>
            </div>
          </div>

          <p className="mt-4 text-[15px] font-semibold leading-7 sm:text-base">
            {renderFormattedText(current.question)}
          </p>

          <div className="mt-4 space-y-2" role="radiogroup" aria-label={current.question}>
            {current.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOptionId === option.id;
              const isRight = option.id === current.correctOptionId;

              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={answered}
                  onClick={() => handleSelect(option.id)}
                  className={cn(
                    "group/opt flex w-full items-start gap-3 rounded-xl border px-3.5 py-2.5 text-start text-sm leading-6 transition-all duration-150",
                    !answered &&
                      "cursor-pointer border-border/75 bg-background/60 hover:border-accent/50 hover:bg-accent/[0.04]",
                    answered &&
                      isRight &&
                      "border-emerald-500/50 bg-emerald-500/10 text-foreground",
                    answered &&
                      isSelected &&
                      !isRight &&
                      "border-rose-500/50 bg-rose-500/10 text-foreground",
                    answered &&
                      !isSelected &&
                      !isRight &&
                      "border-border/50 opacity-55",
                  )}
                >
                  <span
                    dir="ltr"
                    className={cn(
                      "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold transition-colors",
                      !answered &&
                        "border border-border/80 bg-muted/70 text-muted-foreground group-hover/opt:border-accent/40 group-hover/opt:bg-accent/15 group-hover/opt:text-accent",
                      answered && isRight && "bg-emerald-500 text-white",
                      answered && isSelected && !isRight && "bg-rose-500 text-white",
                      answered && !isSelected && !isRight && "bg-muted text-muted-foreground",
                    )}
                  >
                    {letter}
                  </span>
                  <span className="min-w-0 flex-1">
                    {renderFormattedText(option.text)}
                  </span>
                  {answered && isRight && (
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-500" />
                  )}
                  {answered && isSelected && !isRight && (
                    <XCircle className="mt-1 size-4 shrink-0 text-rose-500" />
                  )}
                </button>
              );
            })}
          </div>

          {!answered ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-dashed border-border/80 bg-muted/30 px-3.5 py-2.5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Sparkles className="size-3.5 shrink-0 text-accent" />
                {tryHint}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex cursor-pointer items-center gap-1 font-semibold text-accent transition-opacity hover:opacity-80"
              >
                {nextLabel}
                <Arrow className="size-3.5" />
              </button>
            </div>
          ) : (
            <div
              className={cn(
                "animate-fade-in mt-4 rounded-xl border p-3.5 text-xs leading-6 sm:text-[13px]",
                isCorrect
                  ? "border-emerald-500/35 bg-emerald-500/[0.08]"
                  : "border-rose-500/35 bg-rose-500/[0.08]",
              )}
            >
              <p
                className={cn(
                  "flex items-center gap-1.5 font-semibold",
                  isCorrect
                    ? "text-emerald-700 dark:text-emerald-300"
                    : "text-rose-700 dark:text-rose-300",
                )}
              >
                {isCorrect ? (
                  <CheckCircle2 className="size-4 shrink-0" />
                ) : (
                  <XCircle className="size-4 shrink-0" />
                )}
                {isCorrect ? correctLabel : incorrectLabel}
              </p>
              <p className="mt-1.5 text-foreground/85">
                {renderFormattedText(current.explanation)}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2.5">
                <Link
                  href={current.practiceHref as "/"}
                  className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                >
                  {practiceTopicLabel}
                  <Arrow className="size-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex cursor-pointer items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {nextLabel}
                  <Arrow className="size-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

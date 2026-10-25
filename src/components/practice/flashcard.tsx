"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  Bookmark,
  BookmarkCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RichText } from "@/lib/markdown";
import {
  getBookmarks,
  getProgress,
  markSeen,
  resetProgress,
  toggleBookmark,
} from "@/lib/storage";
import type { Level, Question } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Flashcard({
  questions,
  category,
  level,
}: {
  questions: Question[];
  category: string;
  level: Level;
}) {
  const t = useTranslations("practice");
  const locale = useLocale() as Locale;
  const [order, setOrder] = useState(questions.map((_, i) => i));
  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    setOrder(questions.map((_, i) => i));
    setIndex(0);
    setSelectedId(null);
    setSeen(getProgress(category, level));
    setBookmarks(getBookmarks());
  }, [category, level, questions]);

  const current = questions[order[index]];
  const progressPct = questions.length
    ? Math.round((seen.length / questions.length) * 100)
    : 0;

  const bookmarked = useMemo(
    () => (current ? bookmarks.includes(current.id) : false),
    [bookmarks, current],
  );

  const answered = selectedId !== null;
  const isCorrect = answered && selectedId === current?.correctOptionId;

  useEffect(() => {
    if (!current || !answered) return;
    const next = markSeen(category, level, current.id);
    setSeen(next);
  }, [current, category, level, answered]);

  if (!questions.length || !current) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
        {t("empty")}
      </div>
    );
  }

  const go = (dir: -1 | 1) => {
    setSelectedId(null);
    setIndex((i) => (i + dir + questions.length) % questions.length);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("progress")}</span>
            <span className="font-medium tabular-nums">
              {t("of", { current: index + 1, total: questions.length })} ·{" "}
              {progressPct}%
            </span>
          </div>
          <Progress value={progressPct} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setOrder(shuffle(order));
              setIndex(0);
              setSelectedId(null);
            }}
          >
            <Shuffle />
            {t("shuffle")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              resetProgress(category, level);
              setSeen([]);
            }}
          >
            {t("resetProgress")}
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm sm:p-7"
        >
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant={level}>{level}</Badge>
            {current.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="font-mono text-[11px]">
                {tag}
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className={cn("ms-auto", bookmarked && "text-accent")}
              onClick={() => setBookmarks(toggleBookmark(current.id))}
            >
              {bookmarked ? <BookmarkCheck /> : <Bookmark />}
              {bookmarked ? t("bookmarked") : t("bookmark")}
            </Button>
          </div>

          <h2 className="font-display text-xl font-semibold leading-relaxed sm:text-2xl">
            {current.question[locale]}
          </h2>

          {!answered && (
            <p className="mt-2 text-sm text-muted-foreground">{t("pickOption")}</p>
          )}

          <div className="mt-5 space-y-2.5" role="radiogroup" aria-label={t("pickOption")}>
            {current.options.map((option, i) => {
              const letter = String.fromCharCode(65 + i);
              const isSelected = selectedId === option.id;
              const isRight = option.id === current.correctOptionId;
              const showState = answered;

              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={answered}
                  onClick={() => setSelectedId(option.id)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-start text-sm transition sm:text-[15px]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    !showState &&
                      "border-border/80 bg-background hover:border-accent/50 hover:bg-muted/40",
                    !showState && isSelected && "border-accent bg-accent/5",
                    showState &&
                      isRight &&
                      "border-emerald-500/50 bg-emerald-500/10 text-foreground",
                    showState &&
                      isSelected &&
                      !isRight &&
                      "border-rose-500/50 bg-rose-500/10",
                    showState &&
                      !isSelected &&
                      !isRight &&
                      "border-border/50 opacity-60",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold",
                      showState && isRight && "border-emerald-500/40 bg-emerald-500/20",
                      showState &&
                        isSelected &&
                        !isRight &&
                        "border-rose-500/40 bg-rose-500/20",
                      !showState && "border-border bg-muted/50",
                    )}
                  >
                    {showState && isRight ? (
                      <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
                    ) : showState && isSelected && !isRight ? (
                      <X className="size-4 text-rose-600 dark:text-rose-400" />
                    ) : (
                      letter
                    )}
                  </span>
                  <span className="flex-1 leading-6">{option.text[locale]}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div
                  className={cn(
                    "mt-5 rounded-xl border p-4 sm:p-5",
                    isCorrect
                      ? "border-emerald-500/30 bg-emerald-500/10"
                      : "border-rose-500/30 bg-rose-500/10",
                  )}
                >
                  <p
                    className={cn(
                      "mb-3 flex items-center gap-2 text-sm font-semibold",
                      isCorrect
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-rose-700 dark:text-rose-300",
                    )}
                  >
                    {isCorrect ? <Check className="size-4" /> : <X className="size-4" />}
                    {isCorrect ? t("correct") : t("incorrect")}
                    <span className="font-normal text-muted-foreground">
                      · {t("explanation")}
                    </span>
                  </p>
                  <RichText content={current.answer[locale]} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.article>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={() => go(-1)}
          disabled={questions.length < 2}
        >
          <ChevronLeft className="rtl:rotate-180" />
          {t("prev")}
        </Button>
        <Button onClick={() => go(1)} disabled={questions.length < 2}>
          {t("next")}
          <ChevronRight className="rtl:rotate-180" />
        </Button>
      </div>
    </div>
  );
}

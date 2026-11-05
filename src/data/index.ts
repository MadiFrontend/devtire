import type { Level, Question } from "./types";
import { categories, getCategory } from "./categories";
import { tracks } from "./tracks";
import { javascriptQuestions } from "./javascript";
import { htmlCssQuestions } from "./html-css";
import { reactQuestions } from "./react";
import { typescriptQuestions } from "./typescript";
import { nextjsQuestions } from "./nextjs";
import { stateManagementQuestions } from "./state-management";
import { designPatternsQuestions } from "./design-patterns";
import { systemDesignQuestions } from "./system-design";
import { javascriptMore } from "./more/javascript";
import { htmlCssMore } from "./more/html-css";
import { reactMore } from "./more/react";
import { typescriptMore } from "./more/typescript";
import { nextjsMore } from "./more/nextjs";
import { stateManagementMore } from "./more/state-management";
import { designPatternsMore } from "./more/design-patterns";
import { systemDesignMore } from "./more/system-design";
import { extraQuestions } from "./extra";
import { backendQuestions } from "./backend";

export * from "./types";
export * from "./categories";
export * from "./tracks";

export const allQuestions: Question[] = [
  ...htmlCssQuestions,
  ...htmlCssMore,
  ...javascriptQuestions,
  ...javascriptMore,
  ...typescriptQuestions,
  ...typescriptMore,
  ...reactQuestions,
  ...reactMore,
  ...stateManagementQuestions,
  ...stateManagementMore,
  ...nextjsQuestions,
  ...nextjsMore,
  ...designPatternsQuestions,
  ...designPatternsMore,
  ...systemDesignQuestions,
  ...systemDesignMore,
  ...extraQuestions,
  ...backendQuestions,
];

export function getQuestionsByCategory(categoryId: string): Question[] {
  return allQuestions.filter((q) => q.category === categoryId);
}

export function getQuestions(categoryId: string, level: Level): Question[] {
  return allQuestions.filter(
    (q) => q.category === categoryId && q.level === level,
  );
}

export function getQuestionById(id: string): Question | undefined {
  return allQuestions.find((q) => q.id === id);
}

export function getLevelCounts(categoryId: string) {
  const questions = getQuestionsByCategory(categoryId);
  return {
    junior: questions.filter((q) => q.level === "junior").length,
    middle: questions.filter((q) => q.level === "middle").length,
    senior: questions.filter((q) => q.level === "senior").length,
    total: questions.length,
  };
}

export function searchQuestions(query: string, locale: "fa" | "en"): Question[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allQuestions.filter((item) => {
    const text = [
      item.question[locale],
      item.answer[locale],
      ...item.tags,
      item.id,
      item.category,
    ]
      .join(" ")
      .toLowerCase();
    return text.includes(q);
  });
}

export function getTrackCategories(trackId: string) {
  return categories.filter((c) => c.track === trackId);
}

export function getCategoryInTrack(trackId: string, categoryId: string) {
  const category = getCategory(categoryId);
  return category?.track === trackId ? category : undefined;
}

export function getCategoryStats(trackId: string) {
  return getTrackCategories(trackId).map((c) => ({
    ...c,
    counts: getLevelCounts(c.id),
  }));
}

export function getTrackStats() {
  return tracks.map((t) => {
    const trackCategories = getTrackCategories(t.id);
    const ids = new Set(trackCategories.map((c) => c.id));
    return {
      ...t,
      categoryCount: trackCategories.length,
      questionCount: allQuestions.filter((q) => ids.has(q.category)).length,
    };
  });
}

export function categoryPath(categoryId: string) {
  const category = getCategory(categoryId);
  return `/${category?.track ?? "frontend"}/${categoryId}`;
}

export function practicePath(categoryId: string, level: Level) {
  return `${categoryPath(categoryId)}/${level}`;
}

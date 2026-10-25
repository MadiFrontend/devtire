import type { Level, Question } from "./types";
import { categories } from "./categories";
import { javascriptQuestions } from "./javascript";
import { htmlCssQuestions } from "./html-css";
import { reactQuestions } from "./react";
import { typescriptQuestions } from "./typescript";
import { nextjsQuestions } from "./nextjs";
import { stateManagementQuestions } from "./state-management";
import { designPatternsQuestions } from "./design-patterns";
import { systemDesignQuestions } from "./system-design";

export * from "./types";
export * from "./categories";

export const allQuestions: Question[] = [
  ...htmlCssQuestions,
  ...javascriptQuestions,
  ...typescriptQuestions,
  ...reactQuestions,
  ...stateManagementQuestions,
  ...nextjsQuestions,
  ...designPatternsQuestions,
  ...systemDesignQuestions,
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

export function getCategoryStats() {
  return categories.map((c) => ({
    ...c,
    counts: getLevelCounts(c.id),
  }));
}

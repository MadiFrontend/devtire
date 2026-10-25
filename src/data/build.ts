import type { Level, Question } from "./types";

type L = [fa: string, en: string];

export type QuizItem = {
  id: string;
  level: Level;
  tags: string[];
  q: L;
  /** The first option is the correct one; display order is shuffled in the UI. */
  options: L[];
  a: L;
};

const loc = ([fa, en]: L) => ({ fa, en });

export function build(category: string, items: QuizItem[]): Question[] {
  return items.map((item) => ({
    id: item.id,
    category,
    level: item.level,
    tags: item.tags,
    question: loc(item.q),
    options: item.options.map((o, i) => ({
      id: String.fromCharCode(97 + i),
      text: loc(o),
    })),
    correctOptionId: "a",
    answer: loc(item.a),
  }));
}

export type Level = "junior" | "middle" | "senior";

export type LocalizedString = {
  fa: string;
  en: string;
};

export type QuestionOption = {
  id: string;
  text: LocalizedString;
};

export type Question = {
  id: string;
  category: string;
  level: Level;
  tags: string[];
  question: LocalizedString;
  options: QuestionOption[];
  correctOptionId: string;
  /** Explanation shown after the user picks an option */
  answer: LocalizedString;
};

export type CategoryMeta = {
  id: string;
  icon: string;
  color: string;
  name: LocalizedString;
  description: LocalizedString;
  tags: string[];
};

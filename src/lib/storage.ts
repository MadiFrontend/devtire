"use client";

import type { Level } from "@/data/types";

const PROGRESS_KEY = "fe-interview:progress";
const BOOKMARKS_KEY = "fe-interview:bookmarks";

export type ProgressMap = Record<string, string[]>;

function levelKey(category: string, level: Level) {
  return `${category}:${level}`;
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getProgress(category: string, level: Level): string[] {
  const all = readJson<ProgressMap>(PROGRESS_KEY, {});
  return all[levelKey(category, level)] ?? [];
}

export function markSeen(category: string, level: Level, questionId: string) {
  const all = readJson<ProgressMap>(PROGRESS_KEY, {});
  const key = levelKey(category, level);
  const set = new Set(all[key] ?? []);
  set.add(questionId);
  all[key] = [...set];
  writeJson(PROGRESS_KEY, all);
  return all[key];
}

export function resetProgress(category: string, level: Level) {
  const all = readJson<ProgressMap>(PROGRESS_KEY, {});
  delete all[levelKey(category, level)];
  writeJson(PROGRESS_KEY, all);
}

export function getBookmarks(): string[] {
  return readJson<string[]>(BOOKMARKS_KEY, []);
}

export function toggleBookmark(questionId: string): string[] {
  const current = new Set(getBookmarks());
  if (current.has(questionId)) current.delete(questionId);
  else current.add(questionId);
  const next = [...current];
  writeJson(BOOKMARKS_KEY, next);
  return next;
}

export function isBookmarked(questionId: string): boolean {
  return getBookmarks().includes(questionId);
}

export type FeedbackEntry = {
  name: string;
  email: string;
  message: string;
  at: string;
};

const FEEDBACK_KEY = "fe-interview:feedback";

export function saveFeedback(entry: Omit<FeedbackEntry, "at">) {
  const list = readJson<FeedbackEntry[]>(FEEDBACK_KEY, []);
  list.push({ ...entry, at: new Date().toISOString() });
  writeJson(FEEDBACK_KEY, list);
}

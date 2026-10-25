import type { CategoryMeta } from "./types";

export const categories: CategoryMeta[] = [
  {
    id: "html-css",
    icon: "Layout",
    color: "#e34c26",
    name: { fa: "HTML و CSS", en: "HTML & CSS" },
    description: {
      fa: "ساختار سند، معناشناسی، لی‌اوت، ریسپانسیو و جزئیات مرورگر",
      en: "Document structure, semantics, layout, responsive design & browser quirks",
    },
    tags: ["semantic", "flexbox", "grid", "a11y"],
  },
  {
    id: "javascript",
    icon: "FileCode2",
    color: "#f7df1e",
    name: { fa: "جاوااسکریپت", en: "JavaScript" },
    description: {
      fa: "زبان، runtime، async، closures و مفاهیم عمیق JS",
      en: "Language fundamentals, runtime, async, closures & deep JS concepts",
    },
    tags: ["closures", "promises", "event-loop", "this"],
  },
  {
    id: "typescript",
    icon: "Braces",
    color: "#3178c6",
    name: { fa: "تایپ‌اسکریپت", en: "TypeScript" },
    description: {
      fa: "سیستم تایپ، utility types، generics و الگوهای امن",
      en: "Type system, utility types, generics & type-safe patterns",
    },
    tags: ["generics", "utility-types", "narrowing"],
  },
  {
    id: "react",
    icon: "Atom",
    color: "#61dafb",
    name: { fa: "ری‌اکت", en: "React" },
    description: {
      fa: "کامپوننت‌ها، hooks، رندرینگ، performance و الگوهای رایج",
      en: "Components, hooks, rendering, performance & common patterns",
    },
    tags: ["hooks", "virtual-dom", "effects"],
  },
  {
    id: "state-management",
    icon: "Boxes",
    color: "#764abc",
    name: { fa: "مدیریت State", en: "State Management" },
    description: {
      fa: "Context، Redux، Zustand و استراتژی‌های اشتراک state",
      en: "Context, Redux, Zustand & shared-state strategies",
    },
    tags: ["redux", "zustand", "context"],
  },
  {
    id: "nextjs",
    icon: "Triangle",
    color: "#000000",
    name: { fa: "نکست‌جی‌اس", en: "Next.js" },
    description: {
      fa: "App Router، SSR/SSG، caching، routing و بهینه‌سازی",
      en: "App Router, SSR/SSG, caching, routing & optimization",
    },
    tags: ["app-router", "ssr", "caching"],
  },
  {
    id: "design-patterns",
    icon: "Puzzle",
    color: "#0d9488",
    name: { fa: "الگوهای طراحی", en: "Design Patterns" },
    description: {
      fa: "الگوهای فرانت‌اند، ترکیب‌پذیری و معماری قابل نگهداری",
      en: "Frontend patterns, composition & maintainable architecture",
    },
    tags: ["hoc", "compound", "observer"],
  },
  {
    id: "system-design",
    icon: "Network",
    color: "#f59e0b",
    name: { fa: "طراحی سیستم", en: "System Design" },
    description: {
      fa: "معماری فرانت، مقیاس‌پذیری، عملکرد و تصمیم‌های تجاری",
      en: "Frontend architecture, scalability, performance & trade-offs",
    },
    tags: ["architecture", "performance", "cdn"],
  },
];

export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}

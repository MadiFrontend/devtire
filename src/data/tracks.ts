import type { TrackMeta } from "./types";

export const tracks: TrackMeta[] = [
  {
    id: "frontend",
    icon: "Monitor",
    color: "#6366f1",
    status: "live",
    name: { fa: "فرانت‌اند", en: "Frontend" },
    description: {
      fa: "HTML و CSS، جاوااسکریپت، تایپ‌اسکریپت، ری‌اکت، Next.js و معماری فرانت",
      en: "HTML & CSS, JavaScript, TypeScript, React, Next.js and frontend architecture",
    },
    topics: ["HTML & CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    id: "backend",
    icon: "Server",
    color: "#10b981",
    status: "live",
    name: { fa: "بک‌اند", en: "Backend" },
    description: {
      fa: "Node.js، طراحی API، دیتابیس، احراز هویت، کش، صف پیام و معماری بک‌اند",
      en: "Node.js, API design, databases, auth, caching, message queues and backend architecture",
    },
    topics: ["Node.js", "REST & GraphQL", "SQL", "Redis", "Auth"],
  },
  {
    id: "system-design",
    icon: "Network",
    color: "#f59e0b",
    status: "live",
    name: { fa: "طراحی سیستم", en: "System Design" },
    description: {
      fa: "مقیاس‌پذیری، load balancing، replication، sharding و سیستم‌های توزیع‌شده",
      en: "Scalability, load balancing, replication, sharding and distributed systems",
    },
    topics: ["Scalability", "Caching", "Sharding", "CAP", "Case studies"],
  },
  {
    id: "algorithms",
    icon: "Binary",
    color: "#ec4899",
    status: "soon",
    name: { fa: "الگوریتم و ساختار داده", en: "Algorithms & Data Structures" },
    description: {
      fa: "پیچیدگی زمانی، آرایه، hash map، درخت، گراف و برنامه‌نویسی پویا",
      en: "Big O, arrays, hash maps, trees, graphs and dynamic programming",
    },
    topics: ["Big O", "Arrays", "Trees", "Graphs", "DP"],
  },
  {
    id: "software-engineering",
    icon: "Layers",
    color: "#0ea5e9",
    status: "soon",
    name: { fa: "مبانی مهندسی نرم‌افزار", en: "Software Engineering" },
    description: {
      fa: "OOP، اصول SOLID، الگوهای طراحی، Clean Code، تست و Git",
      en: "OOP, SOLID, design patterns, clean code, testing and Git",
    },
    topics: ["OOP", "SOLID", "Patterns", "Testing", "Git"],
  },
  {
    id: "devops",
    icon: "Container",
    color: "#14b8a6",
    status: "soon",
    name: { fa: "DevOps و Cloud", en: "DevOps & Cloud" },
    description: {
      fa: "Docker، CI/CD، لینوکس، Nginx، Kubernetes و مانیتورینگ",
      en: "Docker, CI/CD, Linux, Nginx, Kubernetes and monitoring",
    },
    topics: ["Docker", "CI/CD", "Linux", "Kubernetes", "Monitoring"],
  },
  {
    id: "behavioral",
    icon: "MessagesSquare",
    color: "#a855f7",
    status: "soon",
    name: { fa: "مصاحبه رفتاری", en: "Behavioral" },
    description: {
      fa: "کار تیمی، حل تعارض، مالکیت پروژه و روش STAR برای پاسخ دادن",
      en: "Teamwork, conflict, ownership and the STAR method for answering",
    },
    topics: ["STAR", "Teamwork", "Conflict", "Leadership"],
  },
];

export function getTrack(id: string) {
  return tracks.find((t) => t.id === id);
}

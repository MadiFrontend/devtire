import type { LocalizedString } from "./types";

export type Testimonial = {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  /** Track id, used for the accent color. */
  track: string;
  quote: LocalizedString;
};

/**
 * SAMPLE CONTENT: replace with real, permissioned quotes from users before launch.
 * Publishing invented testimonials misleads visitors.
 */
export const testimonials: Testimonial[] = [
  {
    id: "sara",
    name: { fa: "سارا م.", en: "Sara M." },
    role: { fa: "فرانت‌اند دولوپر", en: "Frontend developer" },
    track: "frontend",
    quote: {
      fa: "توضیح هر جواب برام از خود سوال مهم‌تر بود. سوال‌های event loop و closure رو که اینجا تمرین کرده بودم، تقریباً عیناً توی مصاحبه پرسیدن.",
      en: "The explanation behind each answer mattered more to me than the question itself. The event loop and closure questions I practiced here came up almost word for word.",
    },
  },
  {
    id: "amir",
    name: { fa: "امیر ر.", en: "Amir R." },
    role: { fa: "بک‌اند دولوپر", en: "Backend developer" },
    track: "backend",
    quote: {
      fa: "سطح‌بندی جونیور، میدل و سینیور کمک کرد بفهمم دقیقاً کجام. سوال‌های سینیور دیتابیس و کش نقطه ضعف‌هام رو نشونم داد.",
      en: "The Junior, Middle and Senior split showed me exactly where I stood. The senior database and caching questions exposed my weak spots.",
    },
  },
  {
    id: "neda",
    name: { fa: "ندا ک.", en: "Neda K." },
    role: { fa: "مهندس نرم‌افزار", en: "Software engineer" },
    track: "system-design",
    quote: {
      fa: "برای System Design همیشه نمی‌دونستم از کجا شروع کنم. راهنمای قدم‌به‌قدم و سوال‌های trade-off ذهنم رو مرتب کرد.",
      en: "I never knew where to start with system design. The step-by-step guide and the trade-off questions finally gave me a structure.",
    },
  },
  {
    id: "reza",
    name: { fa: "رضا ت.", en: "Reza T." },
    role: { fa: "ری‌اکت دولوپر", en: "React developer" },
    track: "frontend",
    quote: {
      fa: "هر شب قبل خواب ده تا سوال ری‌اکت جواب می‌دادم. بعد از دو هفته توی مصاحبه خیلی راحت‌تر درباره re-render و memo حرف زدم.",
      en: "I answered ten React questions every night. Two weeks later I could talk about re-renders and memoization with real confidence.",
    },
  },
  {
    id: "mina",
    name: { fa: "مینا ش.", en: "Mina S." },
    role: { fa: "جونیور دولوپر", en: "Junior developer" },
    track: "frontend",
    quote: {
      fa: "برای اولین مصاحبه‌ام خیلی استرس داشتم. اینکه سوال‌ها فارسی هم هستن ولی اصطلاحات انگلیسی موندن، دقیقاً همون چیزی بود که لازم داشتم.",
      en: "I was nervous about my first interview. Having questions in Persian while keeping the English terms was exactly what I needed.",
    },
  },
  {
    id: "hamed",
    name: { fa: "حامد ج.", en: "Hamed J." },
    role: { fa: "Node.js دولوپر", en: "Node.js developer" },
    track: "backend",
    quote: {
      fa: "بدون ثبت‌نام و رایگان، و پیشرفتم هم ذخیره می‌شه. از بین منابعی که امتحان کردم، این تنها جایی بود که واقعاً تا آخر رفتم.",
      en: "Free, no sign-up, and it remembers my progress. Of everything I tried, this was the only resource I actually finished.",
    },
  },
  {
    id: "parisa",
    name: { fa: "پریسا ع.", en: "Parisa A." },
    role: { fa: "تک لید", en: "Tech lead" },
    track: "system-design",
    quote: {
      fa: "الان از DevTier برای آماده کردن سوال‌های مصاحبه تیم خودمون هم استفاده می‌کنم. سوال‌ها واقع‌بینانه و به‌روز هستن.",
      en: "I now use DevTier to prepare interview questions for my own team. They are realistic and up to date.",
    },
  },
  {
    id: "ali",
    name: { fa: "علی ن.", en: "Ali N." },
    role: { fa: "فول‌استک دولوپر", en: "Full-stack developer" },
    track: "backend",
    quote: {
      fa: "سوال‌های امنیت و احراز هویت چیزهایی رو یادم داد که سال‌ها توی کار ازشون استفاده می‌کردم ولی دلیلشون رو نمی‌دونستم.",
      en: "The auth and security questions taught me the why behind things I had been doing at work for years.",
    },
  },
];

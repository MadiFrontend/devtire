import type { Question } from "./types";

export const systemDesignQuestions: Question[] = [
  {
    id: "sd-perf-01",
    category: "system-design",
    level: "junior",
    tags: ["performance"],
    question: {
      fa: "Core Web Vitals شامل کدام‌هاست؟",
      en: "Which metrics are Core Web Vitals?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "LCP، INP، CLS",
          en: "LCP, INP, CLS",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط FPS بازی",
          en: "Only game FPS",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط تعداد خطوط کد",
          en: "Only lines of code",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط دمای CPU سرور",
          en: "Only server CPU temperature",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `LCP حس لود، INP پاسخ‌گویی تعامل، CLS پایداری بصری — روی SEO و UX اثر دارند.`,
      en: `LCP = loading feel, INP = interaction responsiveness, CLS = visual stability — they affect SEO and UX.`,
    },
  },
  {
    id: "sd-cdn-01",
    category: "system-design",
    level: "junior",
    tags: ["cdn"],
    question: {
      fa: "نقش اصلی CDN برای فرانت چیست؟",
      en: "What is the main frontend role of a CDN?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "cache کردن asset نزدیک کاربر برای latency کمتر",
          en: "Caching assets near users for lower latency",
        },
      },
      {
        id: "b",
        text: {
          fa: "نوشتن منطق business روی کلاینت",
          en: "Writing business logic on the client",
        },
      },
      {
        id: "c",
        text: {
          fa: "جایگزین کامل دیتابیس",
          en: "Fully replacing the database",
        },
      },
      {
        id: "d",
        text: {
          fa: "حذف HTTPS",
          en: "Removing HTTPS",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `JS/CSS/image (و گاهی HTML) روی edge → ترافیک بیشتر با بار کمتر روی origin.`,
      en: `JS/CSS/images (and sometimes HTML) at the edge → more traffic with less origin load.`,
    },
  },
  {
    id: "sd-bundle-01",
    category: "system-design",
    level: "junior",
    tags: ["performance"],
    question: {
      fa: "کدام روش bundle را کوچک‌تر می‌کند؟",
      en: "Which approach reduces bundle size?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "code splitting و tree-shaking",
          en: "Code splitting and tree-shaking",
        },
      },
      {
        id: "b",
        text: {
          fa: "اضافه کردن همه polyfillها بدون نیاز",
          en: "Adding every polyfill whether needed or not",
        },
      },
      {
        id: "c",
        text: {
          fa: "import کل lodash همیشه",
          en: "Always importing all of lodash",
        },
      },
      {
        id: "d",
        text: {
          fa: "غیرفعال کردن فشرده‌سازی",
          en: "Disabling compression",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `lazy routes، اجتناب از lib سنگین، analyzer، gzip/brotli هم کمک می‌کنند.`,
      en: `Lazy routes, avoid heavy libs, analyzers, and gzip/brotli also help.`,
    },
  },
  {
    id: "sd-spa-mpa-01",
    category: "system-design",
    level: "middle",
    tags: ["architecture"],
    question: {
      fa: "نقطه قوت رایج SPA چیست؟",
      en: "What is a common SPA strength?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "نویگیشن سریع client-side بدون full reload",
          en: "Fast client-side navigation without full reloads",
        },
      },
      {
        id: "b",
        text: {
          fa: "SEO همیشه بهتر از MPA بدون هیچ کاری",
          en: "Always better SEO than MPA with zero work",
        },
      },
      {
        id: "c",
        text: {
          fa: "صفر بودن JS",
          en: "Zero JavaScript",
        },
      },
      {
        id: "d",
        text: {
          fa: "عدم نیاز به routing",
          en: "No need for routing",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `MPA برای SEO ساده‌تر است؛ بسیاری از اپ‌های مدرن hybrid (مثل Next) هستند.`,
      en: `MPA is simpler for SEO; many modern apps are hybrid (e.g. Next).`,
    },
  },
  {
    id: "sd-auth-01",
    category: "system-design",
    level: "middle",
    tags: ["auth"],
    question: {
      fa: "برای access token حساس، کدام رویکرد امن‌تر است؟",
      en: "For sensitive access tokens, which approach is safer?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "HttpOnly Secure cookie (و/یا memory + refresh)",
          en: "HttpOnly Secure cookies (and/or memory + refresh)",
        },
      },
      {
        id: "b",
        text: {
          fa: "ذخیره در localStorage بدون محافظت",
          en: "Storing in localStorage with no protection",
        },
      },
      {
        id: "c",
        text: {
          fa: "گذاشتن token در URL همیشه",
          en: "Always putting the token in the URL",
        },
      },
      {
        id: "d",
        text: {
          fa: "لاگ کردن token در console",
          en: "Logging the token to the console",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `HttpOnly در برابر XSS برای خواندن JS مقاوم‌تر است؛ CSRF را با SameSite/token در نظر بگیرید.`,
      en: `HttpOnly resists JS readout under XSS; consider CSRF via SameSite/tokens.`,
    },
  },
  {
    id: "sd-microfront-01",
    category: "system-design",
    level: "middle",
    tags: ["architecture"],
    question: {
      fa: "Micro-frontends چه زمانی بیشتر توجیه دارند؟",
      en: "When are micro-frontends more justified?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "تیم‌های مستقل و codebase خیلی بزرگ",
          en: "Independent teams and a very large codebase",
        },
      },
      {
        id: "b",
        text: {
          fa: "همیشه برای لندینگ تک‌صفحه‌ای کوچک",
          en: "Always for a tiny one-page landing",
        },
      },
      {
        id: "c",
        text: {
          fa: "وقتی فقط یک توسعه‌دهنده دارید و می‌خواهید پیچیدگی اضافه کنید",
          en: "When you have one developer and want extra complexity",
        },
      },
      {
        id: "d",
        text: {
          fa: "هرگز در هیچ مقیاسی",
          en: "Never at any scale",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `هزینه: integration، consistency UI، deps تکراری، ops — برای تیم کوچک اغلب overkill.`,
      en: `Cost: integration, UI consistency, duplicate deps, ops — often overkill for a small team.`,
    },
  },
  {
    id: "sd-feed-01",
    category: "system-design",
    level: "senior",
    tags: ["architecture"],
    question: {
      fa: "برای infinite scroll مقیاس‌پذیر کدام مهم است؟",
      en: "For a scalable infinite scroll, what matters?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "cursor pagination + virtualization + abort درخواست قدیمی",
          en: "Cursor pagination + virtualization + aborting stale requests",
        },
      },
      {
        id: "b",
        text: {
          fa: "لود همزمان همهٔ میلیون‌ها ردیف در DOM",
          en: "Loading millions of rows into the DOM at once",
        },
      },
      {
        id: "c",
        text: {
          fa: "غیرفعال کردن cache همیشه",
          en: "Always disabling cache",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط `alert` برای هر آیتم",
          en: "Only `alert` for every item",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `اندازه‌گیری TTI، حافظه و تعداد DOM nodeها را فراموش نکنید.`,
      en: `Don't forget to measure TTI, memory, and DOM node count.`,
    },
  },
  {
    id: "sd-offline-01",
    category: "system-design",
    level: "senior",
    tags: ["pwa"],
    question: {
      fa: "برای offline-first یادداشت‌ها معمولاً چه ترکیبی لازم است؟",
      en: "For offline-first notes, what combination is typical?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "Service Worker + IndexedDB + صف sync",
          en: "Service Worker + IndexedDB + a sync queue",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط sessionStorage بدون sync",
          en: "Only sessionStorage with no sync",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط رنگ تم",
          en: "Theme color only",
        },
      },
      {
        id: "d",
        text: {
          fa: "حذف کامل persistence",
          en: "Removing persistence entirely",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `conflict resolution (CRDT یا versioned LWW) و UI وضعیت sync هم مهم‌اند.`,
      en: `Conflict resolution (CRDT or versioned LWW) and sync-status UI also matter.`,
    },
  },
  {
    id: "sd-multi-tenant-01",
    category: "system-design",
    level: "senior",
    tags: ["architecture"],
    question: {
      fa: "در داشبورد multi-tenant کدام حیاتی است؟",
      en: "In a multi-tenant dashboard, what is critical?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "جداسازی داده و جلوگیری از نشت cache بین tenantها",
          en: "Data isolation and preventing cross-tenant cache leaks",
        },
      },
      {
        id: "b",
        text: {
          fa: "اشتراک بی‌قید همه داده بین tenantها",
          en: "Unrestricted sharing of all data across tenants",
        },
      },
      {
        id: "c",
        text: {
          fa: "حذف احراز هویت",
          en: "Removing authentication",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط فونت یکسان",
          en: "Only matching fonts",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `tenant id در context، theming/feature flags، routing واضح و تست isolation.`,
      en: `Tenant id in context, theming/feature flags, clear routing, and isolation tests.`,
    },
  },
];

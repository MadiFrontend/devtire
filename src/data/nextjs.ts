import type { Question } from "./types";

export const nextjsQuestions: Question[] = [
  {
    id: "next-app-router-01",
    category: "nextjs",
    level: "junior",
    tags: ["app-router"],
    question: {
      fa: "App Router بیشتر بر پایهٔ چیست؟",
      en: "App Router is largely based on what?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "React Server Components و layout تودرتو",
          en: "React Server Components and nested layouts",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط jQuery",
          en: "jQuery only",
        },
      },
      {
        id: "c",
        text: {
          fa: "حذف کامل routing",
          en: "Removing routing entirely",
        },
      },
      {
        id: "d",
        text: {
          fa: "الزام به Pages Router",
          en: "Requiring the Pages Router",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `\`app/\` با RSC، \`loading.tsx\`/\`error.tsx\` و routing پوشه‌ای کار می‌کند.`,
      en: `\`app/\` uses RSC, \`loading.tsx\`/\`error.tsx\`, and folder-based routing.`,
    },
  },
  {
    id: "next-ssr-ssg-01",
    category: "nextjs",
    level: "junior",
    tags: ["ssr", "ssg"],
    question: {
      fa: "SSG یعنی چه؟",
      en: "What does SSG mean?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "ساخت HTML در زمان build",
          en: "Generating HTML at build time",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط رندر در مرورگر",
          en: "Render only in the browser",
        },
      },
      {
        id: "c",
        text: {
          fa: "حذف HTML",
          en: "Removing HTML",
        },
      },
      {
        id: "d",
        text: {
          fa: "اجرای SQL روی کلاینت",
          en: "Running SQL on the client",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `CSR در مرورگر، SSR در هر request، SSG در build: اغلب hybrid در App Router.`,
      en: `CSR in browser, SSR per request, SSG at build: often hybrid in App Router.`,
    },
  },
  {
    id: "next-link-01",
    category: "nextjs",
    level: "junior",
    tags: ["routing"],
    question: {
      fa: "مزیت اصلی `next/link` نسبت به `<a>` داخلی؟",
      en: "Main advantage of `next/link` over internal `<a>`?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "client-side navigation و prefetch",
          en: "Client-side navigation and prefetch",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط استایل بهتر",
          en: "Only better styling",
        },
      },
      {
        id: "c",
        text: {
          fa: "اجباری برای لینک خارجی",
          en: "Required for external links",
        },
      },
      {
        id: "d",
        text: {
          fa: "غیرفعال کردن SEO",
          en: "Disabling SEO",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: "بدون full reload نویگیت می‌کند و routeها را prefetch می‌کند. برای لینک خارجی تگ a کافی است.",
      en: "Navigates without full reload and prefetches routes. A raw anchor tag is fine for external links.",
    },
  },
  {
    id: "next-cache-01",
    category: "nextjs",
    level: "middle",
    tags: ["caching"],
    question: {
      fa: "برای تازه نگه‌داشتن دادهٔ fetch در App Router کدام رایج است؟",
      en: "What is common for keeping fetch data fresh in App Router?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "`revalidate` / `revalidatePath` / `revalidateTag`",
          en: "`revalidate` / `revalidatePath` / `revalidateTag`",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط `alert()`",
          en: "Only `alert()`",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط `localStorage.clear()`",
          en: "Only `localStorage.clear()`",
        },
      },
      {
        id: "d",
        text: {
          fa: "`document.write`",
          en: "`document.write`",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `لایه‌های cache: Request Memoization، Data Cache، Full Route Cache، Router Cache.`,
      en: `Cache layers: Request Memoization, Data Cache, Full Route Cache, Router Cache.`,
    },
  },
  {
    id: "next-middleware-01",
    category: "nextjs",
    level: "middle",
    tags: ["middleware"],
    question: {
      fa: "Middleware معمولاً کجا اجرا می‌شود؟",
      en: "Where does Middleware typically run?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "روی Edge قبل از تکمیل request",
          en: "On the Edge before the request completes",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط داخل CSS",
          en: "Only inside CSS",
        },
      },
      {
        id: "c",
        text: {
          fa: "بعد از unmount همه کامپوننت‌ها",
          en: "After every component unmounts",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط در IE11",
          en: "Only in IE11",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `کاربرد: auth redirect، A/B، locale، rewrite. باید سبک بماند.`,
      en: `Uses: auth redirects, A/B, locale, rewrites. Keep it light.`,
    },
  },
  {
    id: "next-image-01",
    category: "nextjs",
    level: "middle",
    tags: ["performance"],
    question: {
      fa: "`next/image` کدام کار را می‌کند؟",
      en: "What does `next/image` do?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "ریسایز، فرمت مدرن، lazy-load و کاهش CLS",
          en: "Resize, modern formats, lazy-load, reduce CLS",
        },
      },
      {
        id: "b",
        text: {
          fa: "جایگزین کامل دیتابیس",
          en: "Fully replaces a database",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط SVG را حذف می‌کند",
          en: "Only removes SVGs",
        },
      },
      {
        id: "d",
        text: {
          fa: "انیمیشن‌های 3D",
          en: "3D animations",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `برای LCP بالای صفحه از \`priority\` استفاده کنید.`,
      en: `Use \`priority\` for above-the-fold LCP images.`,
    },
  },
  {
    id: "next-streaming-01",
    category: "nextjs",
    level: "senior",
    tags: ["streaming", "suspense"],
    question: {
      fa: "Suspense + streaming چه کمکی به UX می‌کند؟",
      en: "How do Suspense + streaming help UX?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "بخش‌های آماده زودتر می‌آیند؛ بخش کند fallback نشان می‌دهد",
          en: "Ready parts arrive early; slow parts show a fallback",
        },
      },
      {
        id: "b",
        text: {
          fa: "کل صفحه را تا ابد مسدود می‌کند",
          en: "Blocks the whole page forever",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط رنگ‌ها را عوض می‌کند",
          en: "Only changes colors",
        },
      },
      {
        id: "d",
        text: {
          fa: "SEO را غیرممکن می‌کند",
          en: "Makes SEO impossible",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `HTML تدریجی ارسال می‌شود → TTFB و perceived performance بهتر.`,
      en: `HTML streams progressively → better TTFB and perceived performance.`,
    },
  },
  {
    id: "next-route-handlers-01",
    category: "nextjs",
    level: "senior",
    tags: ["api"],
    question: {
      fa: "Route Handler برای چه مناسب است؟",
      en: "When are Route Handlers a good fit?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "webhook، auth callback، proxy و HTTP خام",
          en: "Webhooks, auth callbacks, proxies, raw HTTP",
        },
      },
      {
        id: "b",
        text: {
          fa: "جایگزین اجباری همه Server Componentها",
          en: "A mandatory replacement for all Server Components",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط برای استایل",
          en: "Styling only",
        },
      },
      {
        id: "d",
        text: {
          fa: "ذخیره فایل در `public` از کلاینت بدون سرور",
          en: "Saving files into `public` from the client with no server",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `برای data داخل اپ، اغلب Server Component مستقیم بهتر از دور زدن API خودتان است.`,
      en: `For in-app data, a Server Component calling data directly often beats proxying your own API.`,
    },
  },
  {
    id: "next-partial-prerender-01",
    category: "nextjs",
    level: "senior",
    tags: ["ppr"],
    question: {
      fa: "ایدهٔ Partial Prerendering چیست؟",
      en: "What is the idea of Partial Prerendering?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "shell استاتیک + حفره‌های دینامیک استریم‌شده",
          en: "Static shell + streamed dynamic holes",
        },
      },
      {
        id: "b",
        text: {
          fa: "حذف کامل بخش استاتیک",
          en: "Removing all static parts",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط CSR",
          en: "CSR only",
        },
      },
      {
        id: "d",
        text: {
          fa: "غیرفعال کردن caching",
          en: "Disabling caching",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `ترکیب سرعت استاتیک با تازگی بخش‌های دینامیک.`,
      en: `Combines static speed with freshness for dynamic parts.`,
    },
  },
];
